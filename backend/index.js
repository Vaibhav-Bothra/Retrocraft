require("dotenv").config();

const express = require("express");
const passport = require("passport");
const passportLocal = require("./config/passportLocalStrategy");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());
app.use(express.urlencoded());
app.use(
  cors({
    origin: "http://127.0.0.1:3000",
    method: "GET,POST",
    credentials: true,
    "Access-Control-Allow-Credentials": true,
  })
);

app.use(
  session({
    name: "RetroCraft",
    secret: "retrocraftimg",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 24 * 60 * 60,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use("/", require("./routes/index"));

app.listen(process.env.PORT, (err) => {
  if (err) console.log(`Error in setting up server: ${err}`);
  else console.log(`Server listening on port: ${process.env.PORT}`);
});
