require("dotenv").config();

const express = require("express");
const passport = require("passport");
const session = require("express-session");

const app = express();

app.use(express.urlencoded());

// app.use(passport.initialize());
// app.use(passport.session());

app.get("/api", require("./routes/index"));

app.listen(process.env.PORT, (err) => {
  if (err) console.log(`Error in setting up server: ${err}`);
  else console.log(`Server listening on port: ${process.env.PORT}`);
});
