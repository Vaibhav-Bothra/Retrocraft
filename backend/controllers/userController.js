const User = require("../models/User");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const passport = require("passport");

module.exports.signUp = function (req, res) {
  console.log(req.body);
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      const encryptedPassword = bcrypt.hashSync(req.body.password, salt);
      console.log(encryptedPassword);
      User.create({
        email: req.body.email,
        password: encryptedPassword,
        name: req.body.name,
        gender: req.body.gender,
        number: req.body.number,
        profilePicture: req.body.file,
        profession: req.body.profession,
      }).then((user) => {
        console.log(user);
        return res.json({ success: true, user });
      });
    } else {
      return res.json({
        error: true,
        errorMessage: "Already having an account!!",
      });
    }
  });
};

module.exports.signIn = function (req, res) {
  console.log(req.user);
  // passport.authenticate("local", function (err, user, info) {
  //   if (err) {
  //     return res.json({ errorMessage: err.message });
  //   }
  //   return res.json({ success: true, user: user });
  // });
  return res.json({ success: true, user: req.user });
};
