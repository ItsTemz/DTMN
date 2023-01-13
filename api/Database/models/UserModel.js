const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  username: { type: String },
  addedMovies: { type: Array },
  rating: { type: Number },
  userTitle: {type: String},
  userImage: {type: String},
});

module.exports = UsersSchema;
