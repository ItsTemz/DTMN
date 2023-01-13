const mongoose = require("mongoose");

const CollectionsSchema = new mongoose.Schema({
  title: { type: String },
});

module.exports = mongoose.model("Collection", CollectionsSchema);
