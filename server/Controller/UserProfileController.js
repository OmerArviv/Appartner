const express = require("express");
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

module.exports = router;
