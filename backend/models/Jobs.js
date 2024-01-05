const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const db = require("../config/mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required"],
      maxlength: 70,
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Description is required"],
    },
    requirement: {
      type: String,
      trim: true,
      required: [true, "Requirement is required"],
    },
    salary: {
      type: String,
      trim: true,
      required: [true, "Salary is required"],
    },
    location: {
      type: String,
    },
    available: {
      type: Boolean,
      default: true,
    },
    user: [
      {
        type: ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

mongoose.pluralize(null);
const Jobs = db.model("Jobs", jobSchema);

module.exports = Jobs;
