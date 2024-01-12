const jwt = require("jsonwebtoken");
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
        description: req.body.description,
      }).then((user) => {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        console.log(user);
        return res.json({ success: true, user, token });
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
  const user = req.user;
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  console.log(req.isAuthenticated());
  console.log(req.session);
  console.log(req.user);
  console.log(token);
  return res.json({ success: true, user: req.user, token });
};

module.exports.getProfile = function (req, res) {
  console.log(req.params.id);
  User.findById(req.params.id).then((user) => {
    return res.json({
      success: true,
      user: user,
    });
  });
};

module.exports.addDashboardExp = function (req, res) {
  console.log(req.body);
  User.findById(req.user._id).then(async (user) => {
    let experienceObj = {
      title: req.body.title,
      company: req.body.company,
      duration: req.body.duration,
      description: req.body.description,
    };
    user.experience.push(experienceObj);
    await user.save();
    return res.json({ success: true });
  });
};

module.exports.addDashboardSkill = function (req, res) {
  console.log(req.body);
  User.findById(req.user._id).then(async (user) => {
    if (!user.skill.includes(req.body.skill)) {
      user.skill.push(req.body.skill);
      await user.save();
      return res.json({ success: true });
    } else {
      return res.json({ error: "Already present..." });
    }
  });
};

module.exports.getAll = function (req, res) {
  let users = [];
  User.find({}).then((user) => {
    for (let i of user) {
      if (i.profession.toLowerCase() == "freelance") {
        users.push(i);
      }
    }
    return res.json({ success: true, users: users });
  });
};

module.exports.logout = function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log("Error in logging out of the page:", err);
      return res.json({ error: "Error in logging out..." });
    }
    return res.json({ success: true });
  });
};
