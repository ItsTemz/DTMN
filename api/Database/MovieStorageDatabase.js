const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb+srv://itsTemz:Muw_c7EtGCmvhBV@cluster0.gcspn.mongodb.net/dtmn?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
