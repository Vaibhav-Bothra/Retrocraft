const passport = require("passport");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/User");

// authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      User.findOne({ email: email }).then((user) => {
        if (!user) {
          return done("No User Found", false);
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        // console.log(isPasswordValid);
        if (!isPasswordValid) {
          return done("Invalid Email or Password", false);
        }
        return done(null, user);
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id).then((user) => {
    return done(null, user);
  });
});

// check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  // if the user is signed in, then pass on the request to the next function(controller's action)
  if (req.isAuthenticated()) {
    return next();
  }

  // if the user is not signed in
  return res.json({ error: "Not signed in..." });
};

passport.alreadyAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return;
    // return res.redirect("/");
  }
  return next();
};

passport.setAuthenticatedUser = function (req, res, next) {
  console.log(req.url);
  if (req.isAuthenticated()) {
    // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
