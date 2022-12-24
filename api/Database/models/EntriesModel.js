const mongoose = require("mongoose");

const entriesSchema = new mongoose.Schema({
  title: { type: String },
  link: { type: String },
  user: { type: String },
});

module.exports = mongoose.model("Entry", entriesSchema);
