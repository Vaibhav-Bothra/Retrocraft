const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const db = require("../config/mongoose");

const hireSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    job: [
      {
        type: ObjectId,
        ref: "Jobs",
        // required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

mongoose.pluralize(null);
const Hire = db.model("Hire", hireSchema);

module.exports = Hire;
