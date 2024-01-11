const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const db = require("../config/mongoose");

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

const freelancerSchema = new mongoose.Schema(
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
    jobsHistory: [jobsHistorySchema],
  },
  {
    timestamps: true,
  }
);

mongoose.pluralize(null);
const Freelancer = db.model("Freelancer", freelancerSchema);

module.exports = Freelancer;
