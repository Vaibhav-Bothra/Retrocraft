const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const db = require("../config/mongoose");

const userApplySchema = new mongoose.Schema(
  {
    interviewDate: {
      type: Date,
    },
    applicationStatus: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    user: {
      type: ObjectId,
      ref: "Freelancer",
      // required: true,
    },
  },
  { timestamps: true }
);

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
      // required: [true, "Requirement is required"],
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
    user: [userApplySchema],
  },
  { timestamps: true }
);

mongoose.pluralize(null);
const Jobs = db.model("Jobs", jobSchema);

module.exports = Jobs;
