const express = require("express");
const UserService = require("../Service/UserService");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.route("/register").post(async (request, response) => {
  // Get user input
  const { full_name, email, password, phone_number } = request.body;
  // Validate user input
  if (!(email && password && full_name && phone_number)) {
    return response.status(400).send("All input is required");
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
    phone_number,
  };
  // Create user in database
  var result = await UserService.insertUser(user);

  // Create token
  if (result != null) {
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;
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
  }
  return response.status(400).send("Invalid Credentials");
});

module.exports = router;
