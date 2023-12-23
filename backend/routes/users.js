const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/userController");

router.post(
  "/signin",
  passport.authenticate("local", {
    failureRedirect: "http://localhost:3000/login",
  }),
  userController.signIn
);
router.post("/signup", userController.signUp);

module.exports = router;
