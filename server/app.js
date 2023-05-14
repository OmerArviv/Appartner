// Env variables
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./Model/User");
const bodyParser = require("body-parser");
// const cors = require("cors");

const auth = require("./middleware/auth");
require("./config/database").connect();

// Express Server
const express = require("express");
const userProfile = require("./Model/userProfile");
const app = express();
// pasrser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors');
app.options('*', cors());
app.use(cors({ origin: 'http://localhost:3000' }));


app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});



// const corsConfig = {
//   credentials: true,
//   origin: true,
// };
// app.use(cors(corsConfig));

app.post("/authentication/login_test", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

app.post("/email-userprofile", async (req, res) => {
  const email = req.body.email;
  try {
    const uProfile = await userProfile.findOne({ email: email });
    if (uProfile) {
      console.log(uProfile);
      res.status(200).json({ message: uProfile });
    } else {
      console.log("No matching user found");
      res.status(404).json({ message: "No matching user found" });
    }
  } catch (error) {
    console.error("Error while querying database:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// app.use(function(req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   next();
// });



app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
  });


const { spawn } = require('child_process');
const path = require('path');

app.post("/run-script", (req, res) => {
  const scriptPath = "c:/Users/Omer/Desktop/omer/College/Final Project/Code/Appartner/server/model/python.py";
  const py = spawn("python", [scriptPath, req.body.text]); // pass the text input as an argument

  let result = "";

  py.stdout.on("data", (data) => {
    result += data;
    console.log(data.toString());
  });

  py.stderr.on("data", (data) => {
    console.error(`Error: ${data}`);
  });

  py.stdout.on('data', (data) => {
    const output = data;
    //console.log(`Output from Python script: ${output}`);
    res.send(output);
  });
});
















module.exports = app;
