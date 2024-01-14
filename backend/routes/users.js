const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/userController");

router.get(
  "/profile/:id",
  passport.checkAuthentication,
  userController.getProfile
);
router.get("/all", userController.getAll);
router.get(
  "/fetchjobs",
  passport.checkAuthentication,
  userController.fetchJobs
);
router.get("/logout", userController.logout);

router.post("/signup", userController.signUp);
router.post(
  "/signin",
  passport.authenticate("local", {
    failureRedirect: "http://localhost:3000/login",
  }),
  userController.signIn
);
router.post(
  "/dashboard/addExp",
  passport.checkAuthentication,
  userController.addDashboardExp
);
router.post(
  "/dashboard/addSkill",
  passport.checkAuthentication,
  userController.addDashboardSkill
);

module.exports = router;
