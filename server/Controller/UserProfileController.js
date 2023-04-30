const express = require("express");
const app = express();
const UserProfileService = require("../Service/UserProfileService");
const router = express.Router();
const auth = require("../middleware/auth");

router.route("/createProfile").post(auth, async (request, response) => {
  // Get user input
  const userProfile = request.body;
  if (!userProfile) {
    return response.status(400).send("All input is required");
  }
  var result = await UserProfileService.insertUserProfile(userProfile);
  console.log(result);
  if (result != null) {
    return response.status(201).json(userProfile);
  }
  return response.status(403).send({});
});

router.route("/getUserProfileByEmail").get(async (request, response) => {
  const { email } = request.query;
  if (!email) {
    return response.status(403).send({});
  }

  const userProfile = await UserProfileService.findUserProfileByEmail(email);
  if (userProfile) {
    return response.status(200).json(userProfile);
  }
  return response.status(200).send(null);
});

module.exports = router;
