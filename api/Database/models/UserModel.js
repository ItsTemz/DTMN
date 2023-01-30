const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  username: { type: String },
  addedMovies: { type: Array },
  rating: { type: Number },
  userTitle: { type: String },
  userImage: { type: String },
  userScores: { type: Array },
  avgUserScore: { type: Number },
});

module.exports = UsersSchema;
