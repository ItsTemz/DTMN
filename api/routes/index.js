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

router.get("/movies", async function (req, res) {
  const movieList = await Movie.find();
  res.send(movieList);
});

router.get("/movie", async function (req, res) {
  const imdbID = req.query.imdbID;
  
  await getMovie(imdbID)
    .then((movie) => {
      res.send(movie);
      console.log(movie);
    })
    .catch((error) => {
      res.send(error);
    });
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

router.delete("/movies", async function (req, res) {
  const content = req.body;
  const deleted = await deleteMovie(content.dbid);
  if (deleted) {
    res.send("Deleted Successfully");
  }
});

const handleAddingMovie = async (content) => {
  const imdbID = content.imdbid;
  const date = new Date().getUTCDate();
  const movieContent = {
    dbid: imdbID,
    movieDetails: {
      title: content.title,
      year: content.year,
      description: content.description,
      released: content.released,
      runtime: content.runtime,
      actors: content.actors,
      genre: content.genre,
      director: content.director,
      language: content.language,
      score: content.score,
      imdbID: content.imdbid,
      trailer: content.trailer,
      backdrop: content.backdrop,
    },
    otherDetails: {
      submittedby: content.submittedby,
      dateAdded: date,
    },
  };
  
  try {
    const movie = await completeMovieData(imdbID, movieContent.otherDetails);
    // check if the movie exists on the database or not
    const foundMovie = await getMovie(imdbID);
    if (!foundMovie) {
      await addMovie(movie);
      return true;
    } else {
      return foundMovie;
    }
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

const deleteMovie = async (id) => {
  try {
    await Movie.findOneAndDelete({ _id: id });
    return true;
  } catch (err) {
    console.log(err);
  }
};

const getMovie = async (id) => {
  try {
    const foundMovie = await Movie.findOne({ dbid: id });
    return foundMovie;
  } catch (error) {
    console.log(error);
  }
};

const completeMovieData = async (id, otherDetails)=>{
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
        submittedby: otherDetails.submittedby,
        dateAdded: otherDetails.dateAdded,
      },
    };
    return movie;

  } catch (error) {
    console.log(error)
  }
  
}

module.exports = router;

//Carefull with this
// const clearDB = async ()=>{
//   await Movie.deleteMany({});
// }
// clearDB();
