const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const session = require("express-session");

const app = express();

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const secret = crypto.randomBytes(256).toString("hex");

// Session
app.use(cookieParser());
app.use(
  session({
    key: "user_id",
    secret: process.env.SECRET || secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Max age one day
    },
  })
);

module.exports = app;
