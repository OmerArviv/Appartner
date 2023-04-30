const express = require("express");
const UserProfilePreferncesService = require("../Service/userProfilePreferncesService");
const router = express.Router();
const auth = require("../middleware/auth");

router
  .route("/createProfilePrefernces")
  .post(auth, async (request, response) => {
    // Get user input
    const userProfilePrefernces = request.body;
    if (!userProfilePrefernces) {
      return response.status(400).send("All input is required");
    }
    var result = await UserProfilePreferncesService.insertUserProfilePrefernces(
      userProfilePrefernces
    );
    if (result != null) {
      return response.status(201).json(userProfilePrefernces);
    }
    return response.status(403).send({});
  });

router
  .route("/updateProfilePrefernces")
  .post(auth, async (request, response) => {
    // Get user input
    const userProfilePrefernces = request.body;
    if (!userProfilePrefernces) {
      return response.status(400).send("All input is required");
    }
    var result = await UserProfilePreferncesService.updateUserProfilePrefernces(
      userProfilePrefernces
    );
    if (result != null) {
      return response.status(201).json(userProfilePrefernces);
    }
    return response.status(403).send({});
  });

router.route("/getUserPreferncesByEmail").get(async (request, response) => {
  const { email } = request.query;
  if (!email) {
    return response.status(403).send({});
  }

  const userPrefernces =
    await UserProfilePreferncesService.findUserProfilePreferncesByEmail(email);
  if (userPrefernces) {
    return response.status(200).json(userPrefernces);
  }
  return response.status(200).send(null);
});

module.exports = router;
