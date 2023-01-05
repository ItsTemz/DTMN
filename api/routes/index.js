var express = require("express");
var router = express.Router();
const axios = require("axios");
const Movie = require("../Database/models/MoviesModel");
const connectDB = require("../Database/MovieStorageDatabase");

//Connect to Database
connectDB();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Duck Talk Movie API" });
});

router.get("/movie", async function (req, res) {
  const _id = req.query.id;
  console.log(_id);
  await getMovie(_id)
    .then((movie) => {
      res.send(movie);
      console.log(movie);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.get("/movies", async function (req, res) {
  const movieList = await Movie.find();
  res.send(movieList);
});

router.post("/movies", async function (req, res) {
  const content = req.body;
  const handledMovie = await handleAddingMovie(content);
  if (handledMovie === true) {
    res.send(true);
  } else {
    res.send(handledMovie);
  }
});

router.post("/entry", async function (req, res) {
  const content = req.body;
  console.log(content);
  const handledEntry = await handleAddingMovie(content);
  if (handledEntry === true) {
    res.send(true);
  } else {
    res.send(handledEntry);
  }
});

router.put("/movie", async function (req, res) {
  const content = req.body;
  console.log(content);
  const updatedMovie = await updateMovie(content.dbid);
  if (updatedMovie === true) {
    res.send(true);
  } else {
    res.send(updatedMovie);
  }
});

const deleteMovie = async (id) => {
  console.log(id);
  try {
    await Movie.findOneAndDelete({ _id: id });
    return true;
  } catch (err) {
    console.log(err);
  }
};

router.delete("/movie/:id", async function (req, res) {
  const id = req.params.id;
  const deletedMovie = await deleteMovie(id);
  if (deletedMovie === true) {
    res.send(true);
  } else {
    res.send(deletedMovie);
  }
});

router.delete("/movies/all", async function (req, res) {
  clearDB();
  res.send("Cleared all movies");
  console.log("Cleared DB");
});

const handleAddingMovie = async (content) => {
  const imdbID = content.imdbid;
  const date = new Date().toString();
  console.log(date);
  const movieContent = {
    movieDetails: {
      title: content.title,
    },
    otherDetails: {
      submittedby: content.submittedby || content.user,
      link: content.link,
      dateAdded: date,
      watched: false,
    },
  };
  if (imdbID) {
    try {
      const movie = await completeMovieData(imdbID, movieContent.otherDetails);
      // check if the movie exists on the database or not
      const foundMovie = await getMovie(imdbID);
      if (!foundMovie) {
        await addMovie(movie);
        return movie;
      } else {
        return foundMovie;
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const entry = movieContent;
      // check if the movie exists on the database or not
      const foundEntry = await getEntry(entry);
      if (!foundEntry) {
        await addMovie(entry);
        return entry;
      } else {
        return foundEntry;
      }
    } catch (error) {
      console.log(error);
    }
  }
};

const getEntry = async (entry) => {
  try {
    const foundMovie = await Movie.findOne({
      "movieDetails.title": entry.title,
    });
    return foundMovie;
  } catch (error) {
    console.log(error);
  }
};

const addMovie = async (movie) => {
  try {
    await Movie.create(movie);
    return true;
  } catch (err) {
    console.error(err);
  }
};

const updateMovie = async (data) => {
  try {
    await Movie.updateOne(
      { dbid: data },
      {
        $set: {
          "otherDetails.watched": true,
          "otherDetails.dateWatched": new Date().toString(),
        },
      }
    );
    return true;
  } catch (err) {
    console.log(err);
  }
};

const getMovie = async (id) => {
  try {
    const foundMovie = await Movie.findOne({ _id: id });
    return foundMovie;
  } catch (error) {
    console.log(error);
  }
};

const completeMovieData = async (id, otherDetails) => {
  try {
    const mdba = axios.create({
      baseURL: "https://movie-database-alternative.p.rapidapi.com/",
      params: {
        i: `${id}`,
        r: "json",
        page: "1",
      },
      headers: {
        "X-RapidAPI-Key": "e727007857mshc26c548468a87f4p1952bejsnab5b0a0f6358",
        "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
      },
    });

    const movieDatabaseAlternative = await mdba.get();

    const mdbList = axios.create({
      baseURL: "https://mdblist.p.rapidapi.com/",
      params: { i: `${id}` },
      headers: {
        "X-RapidAPI-Key": "e727007857mshc26c548468a87f4p1952bejsnab5b0a0f6358",
        "X-RapidAPI-Host": "mdblist.p.rapidapi.com",
      },
    });

    const movieDatabaseList = await mdbList.get();

    // console.log(movieDatabaseAlternative.data);
    // console.log(movieDatabaseList.data);

    const mdaData = movieDatabaseAlternative.data;
    const mdlData = movieDatabaseList.data;
    const date = new Date().toString();
    console.log(date);
    const movie = {
      dbid: id,
      movieDetails: {
        title: mdaData.Title,
        year: mdaData.Year,
        description: mdlData.description,
        released: mdaData.Released,
        runtime: mdaData.Runtime,
        actors: mdaData.Actors,
        genre: mdaData.Genre,
        writer: mdaData.Writer,
        director: mdaData.Director,
        language: mdaData.Language,
        score: mdaData.imdbRating,
        imdbID: mdaData.imdbID,
        trailer: mdlData.trailer,
        poster: mdlData.poster,
        backdrop: mdlData.backdrop,
      },
      otherDetails: {
        submittedby: otherDetails.submittedby || otherDetails.user,
        link: otherDetails.link,
        dateAdded: date,
        watched: false,
      },
    };
    return movie;
  } catch (error) {
    console.log(error);
  }
};

module.exports = router;

//Carefull with this
const clearDB = async () => {
  await Movie.deleteMany({});
};
