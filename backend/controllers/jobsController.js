const Jobs = require("../models/Jobs");

module.exports.getJobs = async function (req, res) {
  let jobs = [];
  Jobs.find({}).then((job) => {
    return res.json({
      success: true,
      jobs: job,
    });
  });
};
