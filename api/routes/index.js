var express = require("express");
var router = express.Router();
const axios = require("axios");
const movieSchema = require("../Database/models/MoviesModel");
const userSchema = require("../Database/models/UserModel");
const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
//Connect to Database
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://itsTemz:${MONGODB_PASSWORD}@cluster0.gcspn.mongodb.net/dtmn?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to MongoDB successfully");
    return mongoose.connection;
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
connectDB();

let ActiveCollection = mongoose.model("Movie", movieSchema);
const User = mongoose.model("User", userSchema);

const setActiveCollection = (collectionName) => {
  ActiveCollection = mongoose.model(collectionName, movieSchema);
};

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Duck Talk Movie API" });
});

router.get("/movie", async function (req, res) {
  const _id = req.query.id;
  await getMovie(_id)
    .then((movie) => {
      res.send(movie);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.get("/movies", async function (req, res) {
  const collection = req.query.collectionName;
  if (collection) setActiveCollection(collection);
  const movieList = await ActiveCollection.find();
  initializeUser();
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

router.get("/collections", async function (req, res) {
  const db = mongoose.connection.db;
  // Get a list of all the collections on the database
  db.listCollections().toArray((err, collections) => {
    if (err) {
      console.log(err);
      return;
    }
    const outCollections = collections.filter(
      (collection) => collection.name !== "users"
    );
    res.send(outCollections);
  });
});

router.get("/users", async function (req, res) {
  const users = await getUsers();
  initializeUser();
  res.send(users);
});

router.get("/user", async function (req, res) {
  const username = req.query.username;
  const user = await getUser(username);
  if (user) {
    console.log(user);
    res.send(user);
  }
});

router.post("/rateuser", async function (req, res) {
  const user = req.body.user;
  const rating = req.body.rating;

  setUserScore(user.username, rating);
});

router.post("/createCollection", async function (req, res) {
  const collectionName = req.body.collectionName;
  setActiveCollection(collectionName);
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
  const updatedMovie = await updateMovie(content.dbid);
  if (updatedMovie === true) {
    res.send(true);
  } else {
    res.send(updatedMovie);
  }
});

router.put("/item/rating", async function (req, res) {
  const content = req.body;
  const ratedItem = await rateItem(content);
  if (ratedItem === true) {
    res.send(true);
  } else {
    res.send(false);
  }
});

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

router.delete("/collection/:collection", async function (req, res) {
  const collection = req.params.collection.toLowerCase();
  console.log(collection);
  const db = mongoose.connection;
  db.dropCollection(collection, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(result);
  });
});

const initializeUser = async () => {
  populateUserMovies();
};

const rateItem = async (content) => {
  try {
    await ActiveCollection.findOneAndUpdate(
      { dbid: content.imdbID },
      {
        $set: {
          "otherDetails.duckTalkRating": content.rating,
        },
      }
    );
    updateMovie(content.imdbID);
    populateUserMovies();
    return true;
  } catch (err) {
    console.log(err);
  }
};

const deleteMovie = async (id) => {
  console.log(id);
  try {
    await ActiveCollection.findOneAndDelete({ _id: id });
    return true;
  } catch (err) {
    console.log(err);
  }
};

const handleAddingMovie = async (content) => {
  const imdbID = content.imdbid;
  const date = new Date().toString();
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
        await addMovieToUser(movie.otherDetails.submittedby, movie);
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
    const foundMovie = await ActiveCollection.findOne({
      "movieDetails.title": entry.title,
    });
    return foundMovie;
  } catch (error) {
    console.log(error);
  }
};

const getUsers = async () => {
  const userlist = await User.find();
  return userlist;
};

const getUser = async (username) => {
  return await User.findOne({ username: username }).then((user) => {
    return user;
  });
};

const addUser = async (username) => {
  const defaultUser = {
    username: username,
    addedMovies: [],
    rating: 0,
    userTitle: "",
    userImage: "https://placeimg.com/192/192/people",
    userScores: [],
    avgUserScore: 0,
  };

  if (username !== "") {
    try {
      await User.findOneAndUpdate(
        { username },
        { $setOnInsert: defaultUser },
        { upsert: true, new: true }
      );
      return true;
    } catch (error) {
      console.log(error);
    }
  }
};

const setUserScore = async (username, score) => {
  if (username !== "" || username !== undefined) {
    try {
      await User.findOneAndUpdate({username: username}, {
        $addToSet: { userScores: score },
      }).then((user) => {
        calculateUserScore(user._id);
      });
    } catch (err) {
      console.log(err);
    }
  }
};

const addMovieToUser = async (username, movie) => {
  await User.findOne({ username: username }).then(async (foundUser) => {
    if (!foundUser) {
      await addUser(username);
    }
    try {
      // Check if the movie already exists in the user's addedMovies array
      const user = await User.findOne({ username: username });
      const index = user.addedMovies.findIndex(
        (addedMovie) => addedMovie.dbid === movie.dbid
      );
      if (index !== -1) {
        //update the movie in the user's addedMovies array
        user.addedMovies[index] = movie;
        console.log("Movie updated in user addedMovies array");
      } else {
        // Add the movie to the user's addedMovies array
        user.addedMovies.push(movie);
        console.log("Movie added to user addedMovies array");
      }
      await user.save();

      calculateUserMovieRating(foundUser._id);
      calculateUserScore(foundUser._id);
      return true;
    } catch (err) {
      console.error(err);
    }
  });
};

const calculateUserMovieRating = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  const watchedMovies = user.addedMovies.filter(
    (movie) => movie.otherDetails.watched
  );
  const ratings = watchedMovies.map(
    (movie) => movie.otherDetails.duckTalkRating
  );
  if (ratings.length === 0) return 0;
  const totalRating = ratings.reduce((a, b) => a + b, 0);
  const averageRating = totalRating / ratings.length;
  await User.findByIdAndUpdate(userId, { rating: averageRating });
  return averageRating;
};

const calculateUserScore = async (userId) => {
  const user = await User.findById(userId);
  const userScores = user.userScores;

  if (userScores.length === 0) return 0;

  const totalScore = userScores.reduce((a, b) => a + b, 0);
  const averageScore = totalScore / userScores.length;
  await User.findByIdAndUpdate(userId, { avgUserScore: averageScore });
  return averageScore;
};

const populateUserMovies = async () => {
  await ActiveCollection.find().then((movieList) => {
    movieList.map((movie) => {
      return addMovieToUser(movie.otherDetails.submittedby, movie);
    });
  });
};

const addMovie = async (movie) => {
  try {
    await ActiveCollection.create(movie);
    return true;
  } catch (err) {
    console.error(err);
  }
};

const updateMovie = async (data) => {
  try {
    await ActiveCollection.updateOne(
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
    const foundMovie = await ActiveCollection.findOne({ _id: id });
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
        "X-RapidAPI-Key": process.env.MDA_KEY,
        "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
      },
    });

    const movieDatabaseAlternative = await mdba.get();

    const mdbList = axios.create({
      baseURL: "https://mdblist.p.rapidapi.com/",
      params: { i: `${id}` },
      headers: {
        "X-RapidAPI-Key": process.env.MDB_LIST_KEY,
        "X-RapidAPI-Host": "mdblist.p.rapidapi.com",
      },
    });

    const movieDatabaseList = await mdbList.get();
    const mdaData = movieDatabaseAlternative.data;
    const mdlData = movieDatabaseList.data;
    const date = new Date().toString();
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
        duckTalkRating: 0,
        tags: [],
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
  await ActiveCollection.deleteMany({});
};
