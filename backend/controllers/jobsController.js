const Jobs = require("../models/Jobs");
const User = require("../models/User");

module.exports.getJobs = async function (req, res) {
  let jobs = [];
  Jobs.find({}).then((job) => {
    return res.json({
      success: true,
      jobs: job,
    });
  });
};

module.exports.applyJob = async function (req, res) {
  const job = await Jobs.findOne({ _id: req.params.id });
  console.log(job);
  console.log(req.user);
  User.findOne({ _id: req.user._id }).then(async (user) => {
    console.log(user);
    if (!user || user.profession == "hire") {
      return res.json({ error: "Invalid user..." });
    }
    const jobHistory = {
      job: req.params.id,
    };
    user.jobsHistory.push(jobHistory);
    const userSchema = {
      user: req.user._id,
    };
    job.user.push(userSchema);
    await user.save();
    await job.save();
    return res.json({ success: true });
  });
  // return res.json({ error: "Invalid job..." });
};

module.exports.addJob = function (req, res) {
  Jobs.create({
    producer: req.user._id,
    title: req.body.title,
    description: req.body.description,
    requirement: req.body.req,
    salary: req.body.salary,
    location: req.body.location,
  }).then((job) => {
    User.findById(req.user._id).then(async (user) => {
      user.job.push(job._id);
      await user.save();
      return res.json({ success: true });
    });
  });
};
