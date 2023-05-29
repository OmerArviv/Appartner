const express = require("express");
const UserService = require("../Service/UserService");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { now } = require("mongoose");

router.route("/register").post(async (request, response) => {
  // Get user input
  const { full_name, email, password, phone_number, salt } = request.body;
  // Validate user input
  if (!(email && password && full_name && phone_number)) {
    return response.status(400).send("All input is required");
  }
  //check if salt is defined
  if (!salt) {
    return response.status(403).send({});
  }
  // check if user already exist
  var oldUser = await UserService.findUserByEmail(email);
  if (oldUser) {
    return response.status(409).send("User Already Exist. Please Login");
  }
  //Encrypt user password
  encryptedPassword = await bcrypt.hash(password, 10);

  const user = {
    full_name,
    email: email.toLowerCase(), // sanitize: convert email to lowercase
    password: encryptedPassword,
    salt: salt,
    phone_number,
  };
  // Create user in database
  var result = await UserService.insertUser(user);

  // Create token
  if (result != null) {
    const token = jwt.sign(
      { user_id: result._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;
    user.id = result._id;
    return response.status(201).json(user);
  } else {
    return response.status(403).send({});
  }
});

router.route("/login").post(async (request, response) => {
  // Get user input
  const { email, password } = request.body;

  // Validate user input
  if (!(email && password)) {
    return response.status(400).send("All input is required");
  }

  // Validate if user exist in our database
  const user = await UserService.findUserByEmail(email);

  if (user && (await bcrypt.compare(password, user.password))) {
    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    // save user token
    user.token = token;

    // user
    return response.status(200).json(user);
    // const temp = await UserService.updateUserByEmail(user);
    // if (temp) {
    // }
  }
  return response.status(400).send("Invalid Credentials");
});

router.route("/getUserSalt").get(async (request, response) => {
  const { email } = request.query;
  if (!email) {
    return response.status(403).send(null);
  }

  const salt = await UserService.getSaltByEmail(email);
  if (salt) {
    return response.status(200).json(salt);
  }
  return response.status(204).send(null);
});

router.route("/updateUserDetails").post(async (request, response) => {
  // Get user input
  const { user } = request.body;

  // Validate user input
  if (!(user && user.email)) {
    return response.status(400).send("Something went wrong");
  }

  // Update user
  const res = await UserService.updateUserByEmail(user);

  if (res) {
    return response.status(200).json(user);
  }
  return response.status(400).send("Invalid Credentials");
});

router.route("/getUserByEmail").get(async (request, response) => {
  const { email } = request.query;
  if (!email) {
    return response.status(403).send({});
  }

  const user = await UserService.findUserByEmail(email);
  if (user) {
    return response.status(200).json(user);
  }
  return response.status(403).send({});
});

router.route("/getUserLastLogin").get(async (request, response) => {
  const { email } = request.query;
  if (!email) {
    return response.status(403).send({});
  }

  const user = await UserService.findUserByEmail(email);
  const updateUserLastLogin = await UserService.updateUserByEmail({
    email: email,
    last_login: Math.floor(Date.now() / 1000),
  });
  if (user) {
    return response.status(200).json(user.last_login);
  }
  return response.status(403).send({});
});

module.exports = router;
