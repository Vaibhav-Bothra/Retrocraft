const mongoose = require("mongoose");

const db = mongoose.createConnection(process.env.MONGO_URI);

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to database :: MongoDB");
});

module.exports = db;
