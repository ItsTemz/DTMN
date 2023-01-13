const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  dbid: {type: String},
  movieDetails: {
    title: {
      type: String,
    },
    year: {
      type: String,
    },
    description: {
      type: String,
    },
    released: {
      type: String,
    },
    runtime: {
      type: String,
    },
    actors: {
      type: String,
    },
    director: {
      type: String,
    },
    genre: {
      type: String,
    },
    language: {
      type: String,
    },
    score: {
      type: String,
    },
    poster: {
      type: String,
    },
    imdbID: {
      type: String,
    },
    trailer: {
      type: String,
    },
    backdrop: {
      type: String,
    },
  },
  otherDetails: {
    submittedby: {
      type: String,
    },
    dateAdded: {
      type: String,
    },
    dateWatched: {
      type: String,
    },
    duckTalkRating: {
      type: Number,
    },
    watched: {
      type: Boolean,
    },
    link:{
      type: String,
    },
    tags: {
      type: Array,
    }
  },
});

module.exports = movieSchema;
