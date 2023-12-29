const express = require("express");
const router = express.Router();
const passport = require("passport");

const jobsController = require("../controllers/jobsController");

router.get("/", jobsController.getJobs);

module.exports = router;
