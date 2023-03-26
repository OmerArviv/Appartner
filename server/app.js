// Env variables
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./Model/User");
const bodyParser = require("body-parser");
const cors = require("cors");

const auth = require("./middleware/auth");
require("./config/database").connect();

// Express Server
const express = require("express");
const app = express();
// pasrser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfig));

app.post("/authentication/login_test", auth, (req, res) => {
  // .......
  console.log("asds");
  res.status(200).send("Welcome 🙌 ");
});

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  // res.header( "Access-Control-Allow-Origin" );

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

module.exports = app;
