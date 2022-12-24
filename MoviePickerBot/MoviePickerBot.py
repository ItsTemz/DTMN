import requests
import asyncio
import nextcord
import socketio
from nextcord.ext import commands
from nextcord import Interaction
from datetime import date
from urllib.parse import urlencode
from typing import Optional
from nextcord import SlashOption
intents = nextcord.Intents.all()
intents.message_content = True
intents.members = True
bot = commands.Bot(command_prefix="!", help_command=None, intents=intents)

guild_ids = [1004514855736328252, 722529712077013082]
sio = socketio.AsyncClient()


@bot.event
async def on_ready():
    print(f"logged in as: {bot.user.name}")
    await main()

# Variables
surl = "https://mdblist.p.rapidapi.com/"

sheaders = {
    "X-RapidAPI-Key": "e727007857mshc26c548468a87f4p1952bejsnab5b0a0f6358",
    "X-RapidAPI-Host": "mdblist.p.rapidapi.com"
}

numbers = ["1️⃣", "2️⃣", "3️⃣", "4️⃣",
           "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"]

MovieStorageDB = "http://Localhost:3001/movies"

headersList = {
    "Accept": "*/*",
    "User-Agent": "MoviePickerBot",
    "Content-Type": "application/x-www-form-urlencoded"
}


class ConfirmationButtons(nextcord.ui.View):
    def __init__(self):
        super().__init__(timeout=None)
        self.value = None

    @nextcord.ui.button(label="Yep!", style=nextcord.ButtonStyle.green)
    async def Correct(self, button: nextcord.ui.Button, interaction: Interaction):
        self.value = True
        self.stop()

    @nextcord.ui.button(label="Nope!", style=nextcord.ButtonStyle.red)
    async def Incorrect(self, button: nextcord.ui.Button, interaction: Interaction):
        self.value = False
        self.stop()


async def BuildSingleMovieEmbed(interaction: Interaction, moviedata):
    await interaction.response.defer()

    embed = nextcord.Embed(title=f"{moviedata['title']}", url=f"https://www.imdb.com/title/{moviedata['imdbid']}/",
                           description=f"{moviedata['description'][0:250]}...", color=0xffebeb)
    embed.set_author(name="Is this the movie you want to add ?")
    embed.add_field(name="Release Year",
                    value=f"{moviedata['year']}", inline=True)
    embed.add_field(
        name="Runtime", value=f"{moviedata['runtime']}m", inline=True)
    embed.add_field(name="Rating", value=f"{moviedata['score']}", inline=True)
    embed.add_field(name="Submitted By",
                    value=f"{interaction.user.mention}", inline=True)
    embed.add_field(name="Submitted On", value=f"{date.today()}", inline=True)
    embed.add_field(name="Viewed", value=f"No", inline=True)
    embed.set_image(url=f"{moviedata['poster']}")
    view = ConfirmationButtons()

    await asyncio.sleep(3)
    await interaction.followup.send(embed=embed, view=view, ephemeral=True)

    # wait for a button to be clicked
    await view.wait()
    if(view.value == None):
        return
    elif(view.value == True):
        await AttemptAddMovie(moviedata, interaction)
    else:
        await interaction.response.send_message("Please try again", ephemeral=True)


async def AttemptAddMovie(moviedata, interaction: Interaction):
    try:
        payload = urlencode(moviedata)
        response = requests.request(
            "POST", MovieStorageDB, data=payload,  headers=headersList)
        print(response.text)
        if(response.text == "true"):
            description = moviedata['description']
            MovieAddedEmbed = nextcord.Embed(
                title=f"{moviedata['title']}", url=f"https://www.imdb.com/title/{moviedata['imdbid']}/", description=f"{description[0:250]}...", color=0xffebeb)
            MovieAddedEmbed.set_author(
                name=f"Everyone look! A new movie has been added! 🎞️")
            MovieAddedEmbed.add_field(
                name="Added By 🙋‍♂️", value=f"{interaction.user.mention}")
            MovieAddedEmbed.add_field(name="Release Year 🗓️ ",
                                      value=f"{moviedata['year']}", inline=True)
            MovieAddedEmbed.add_field(
                name="Runtime ⌚", value=f"{moviedata['runtime']}m", inline=True)
            MovieAddedEmbed.add_field(
                name="Trailer 🎥", value=f"{moviedata['trailer']}", inline=True)
            MovieAddedEmbed.set_thumbnail(url=f"{moviedata['poster']}")
            await interaction.send(embed=MovieAddedEmbed)
            moviedata = None
        else:
            ResponseData = response.json()
            print(ResponseData)
            MovieAddedEmbed = nextcord.Embed(
                title=f"{moviedata['title']}", url=f"https://www.imdb.com/title/{ResponseData['movieDetails']['imdbID']}/",
                description=f"🤔 Hmm, looks like **{moviedata['title']}** was already added by **{ResponseData['otherDetails']['submittedby']}**.",
                color=0xff0000)
            await interaction.send(embed=MovieAddedEmbed, ephemeral=True)

    except Exception:
        MovieAddedEmbed = nextcord.Embed(
            title=f"Error!", description=f"🤔 Hmm, looks like something went wrong adding the movie to the database.", color=0xff0000)
        await interaction.send(embed=MovieAddedEmbed, view=None, ephemeral=True)
        print('Failed to connect to the storage database')


async def SearchMovieimdbID(interaction: Interaction, imdbID):
    querystring = {"i": f"{imdbID}"}
    response = requests.request(
        "GET", surl, headers=sheaders, params=querystring)
    print(response.status_code)
    moviedata = response.json()
    moviedata['submittedby'] = interaction.user
    moviedata['viewed'] = 0

    return moviedata


async def SearchMovieString(interaction: Interaction, search, year):
    try:
        querystring = {"s": f"{search}", "y": f"{year}"}
        response = requests.request(
            "GET", surl, headers=sheaders, params=querystring)
        print(response.status_code)
        movieDataArr = response.json()['search']
        return movieDataArr
    except Exception:
        print(Exception)


@commands.command()
async def fetchMovie(interaction: Interaction, search, year, id=None):
    # if is a URL search
    if(search[0:27] == "https://www.imdb.com/title/"):
        imdbID = search[27:36]
        movieData = await SearchMovieimdbID(interaction, imdbID)
        await BuildSingleMovieEmbed(interaction, movieData)

    # if is a String Search
    else:
        await interaction.response.defer(ephemeral=True)

        movieDataArr = await SearchMovieString(interaction, search, year)

        ListFoundMoviesEmbed = nextcord.Embed(
            title="Which Movie Are You Looking For ? ", color=0x3bff05)

        # list of movies for dropdown
        movieNames = []
        for number, movie in enumerate(movieDataArr[0:10]):
            movieNames.append(
                {"title": f"{movie['title']}", "description": f"Release Date: {movie['year']} | Rating: {movie['score']}"})
            # ListFoundMoviesEmbed.add_field(
            #     name=f"{numbers[number]}. **{movie['title']}**", value=f"**Release Date** {movie['year']} | **Rating** {movie['score']}", inline=False)

        # Adds the dropdown menu to the list of

        async def dropdown_callback(interaction: Interaction):
            selectedMovie = movieDataArr[int(dropdown.values[0])-1]
            foundMovie = await SearchMovieimdbID(interaction, selectedMovie['id'])
            await BuildSingleMovieEmbed(interaction, foundMovie)

        options = [
            nextcord.SelectOption(
                label=f"{movieNames[0].get('title')}", description=f"{movieNames[0].get('description')}", emoji="1️⃣", value=1),
            nextcord.SelectOption(
                label=f"{movieNames[1].get('title')}", description=f"{movieNames[1].get('description')}", emoji="2️⃣", value=2),
            nextcord.SelectOption(
                label=f"{movieNames[2].get('title')}", description=f"{movieNames[2].get('description')}", emoji="3️⃣", value=3),
            nextcord.SelectOption(
                label=f"{movieNames[3].get('title')}", description=f"{movieNames[3].get('description')}", emoji="4️⃣", value=4),
            nextcord.SelectOption(
                label=f"{movieNames[4].get('title')}", description=f"{movieNames[4].get('description')}", emoji="5️⃣", value=5),
            nextcord.SelectOption(
                label=f"{movieNames[5].get('title')}", description=f"{movieNames[5].get('description')}", emoji="6️⃣", value=6),
            nextcord.SelectOption(
                label=f"{movieNames[6].get('title')}", description=f"{movieNames[6].get('description')}", emoji="7️⃣", value=7),
            nextcord.SelectOption(
                label=f"{movieNames[7].get('title')}", description=f"{movieNames[7].get('description')}", emoji="8️⃣", value=8),
            nextcord.SelectOption(
                label=f"{movieNames[8].get('title')}", description=f"{movieNames[8].get('description')}", emoji="9️⃣", value=9),
            nextcord.SelectOption(
                label=f"{movieNames[9].get('title')}", description=f"{movieNames[9].get('description')}", emoji="🔟", value=10),
        ]
        dropdown = nextcord.ui.Select(placeholder="Select the movie you're looking for.", min_values=1,
                                      max_values=1, options=options)
        dropdown.callback = dropdown_callback
        view = nextcord.ui.View(timeout=60)
        view.add_item(dropdown)

        await asyncio.sleep(5)
        await interaction.followup.send(view=view, embed=ListFoundMoviesEmbed, ephemeral=True)


@bot.slash_command(guild_ids=guild_ids, description="Adds a movie to the watch list")
async def addmovie(interaction, *, search, year: int = SlashOption(required=False, default=0)):
    await fetchMovie(interaction, search, year)


@sio.event
async def connect():
    print("Socket IO link established")


@sio.on('notify_next_watch')
async def NotifyNextWatch(data):
    channel = bot.get_channel(1022484228409139282)
    moviedata = data['movieDetails']
    otherData = data['otherDetails']
    description = moviedata['description']
    userNameParts = otherData['submittedby'].split('#')

    member = nextcord.utils.find(lambda m: m.name ==
                                 userNameParts[0] and m.discriminator == userNameParts[1], channel.members)

    MovieAddedEmbed = nextcord.Embed(
        title=f"{moviedata['title']}", url=f"https://www.imdb.com/title/{moviedata['imdbID']}/", description=f"{description[0:250]}...", color=0xffebeb)
    MovieAddedEmbed.set_author(
        name="Tomorrows Movie!🎞️")

    if member:
        MovieAddedEmbed.add_field(
            name="Added By 🙋‍♂️", value=f"{member.mention}")
    else:
        MovieAddedEmbed.add_field(
            name="Added By 🙋‍♂️", value=f"{otherData['submittedby']}")

    MovieAddedEmbed.add_field(name="Release Year 🗓️ ",
                              value=f"{moviedata['year']}", inline=True)
    MovieAddedEmbed.add_field(
        name="Runtime ⌚", value=f"{moviedata['runtime']}", inline=True)
    MovieAddedEmbed.add_field(
        name="Trailer 🎥", value=f"{moviedata['trailer']}", inline=True)
    MovieAddedEmbed.set_thumbnail(url=f"{moviedata['poster']}")

    await channel.send(embed=MovieAddedEmbed)


async def main():
    await sio.connect('http://localhost:3001')
    await sio.wait()

bot.run("MTAwNTk1MzA2MTgyODcxMDQwMA.GeNMDT.4bCbFR5mkOU6GhrfLvYk9tUf_FudH8s-waWICs")
