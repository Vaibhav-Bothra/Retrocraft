require("dotenv").config();

const express = require("express");
const passport = require("passport");
const passportLocal = require("./config/passportLocalStrategy");
const session = require("express-session");
const cors = require("cors");

const app = express();

app.use(express.urlencoded());
app.use(
  cors({
    origin: "https://localhost:3000",
    method: "GET,POST",
  })
);

app.use(
  session({
    name: "RetroCraft",
    secret: "retrocraftimg",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// app.use(passport.setAuthenticatedUser);

app.use("/api", require("./routes/index"));

app.listen(process.env.PORT, (err) => {
  if (err) console.log(`Error in setting up server: ${err}`);
  else console.log(`Server listening on port: ${process.env.PORT}`);
});
