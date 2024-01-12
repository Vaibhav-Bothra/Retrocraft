const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const db = require("../config/mongoose");

const experienceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      maxlength: 70,
    },
    company: {
      type: String,
      trim: true,
    },
    duration: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const jobsHistorySchema = new mongoose.Schema(
  {
    job: {
      type: ObjectId,
      ref: "Jobs",
      // required: true,
    },
    interviewDate: {
      type: Date,
    },
    applicationStatus: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
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
    description: {
      type: String,
      // required: true,
    },
    job: [
      {
        type: ObjectId,
        ref: "Jobs",
        // required: true,
      },
    ],
    jobsHistory: [jobsHistorySchema],
    skill: [
      {
        type: String,
      },
    ],
    experience: [experienceSchema],
  },
  {
    timestamps: true,
  }
);

mongoose.pluralize(null);
const User = db.model("User", userSchema);

module.exports = User;
