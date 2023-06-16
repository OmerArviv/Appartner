const express = require("express");
const app = express();
const UserProfileService = require("../Service/UserProfileService");
const router = express.Router();
const auth = require("../middleware/auth");
const axios = require("axios");

router.route("/createProfile").post(auth, async (request, response) => {
  // Get user input
  const userProfile = request.body;
  if (!userProfile) {
    return response.status(400).send("All input is required");
  }

  const user = await UserProfileService.findUserProfileByEmail(
    userProfile.email
  );
  //if user profile exist update the profile
  if (user) {
    result = await UserProfileService.updateUserProfile(userProfile);
    if (result != null) {
      return response.status(201).json(userProfile);
    }
    return response.status(403).send({});
  }
  //if user profile not exist insert new profile
  else {
    var result = await UserProfileService.insertUserProfile(userProfile);
    if (result != null) {
      return response.status(201).json(userProfile);
    }
    return response.status(403).send({});
  }
});

router.route("/getAllUsersEmails").get(async (request, response) => {
  const usersEmails = await UserProfileService.getAllUsersEmails();
  if (usersEmails) {
    return response.status(200).json(usersEmails);
  }
  return response.status(200).send(null);
});

router.route("/updateProfile").post(auth, async (request, response) => {
  // Get user input
  const userProfile = request.body;
  if (!userProfile) {
    return response.status(400).send("Something went wrong");
  }
  var result = await UserProfileService.updateUserProfile(userProfile);
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

//b21lcm5hZGFtQGdtYWlsLmNvbQ:YvOraHztgCHIXpKOVp9QI

router.route("/dalle").post(async (req, res) => {
  const apiKey = "b21lcm5hZGFtQGdtYWlsLmNvbQ:YvOraHztgCHIXpKOVp9QI";
  const json = JSON.stringify(req.body);
  const obj = JSON.parse(json);

  const requestBody = {
    script: {
      type: "text",
      input: obj.text,
    },
    source_url: obj.imageUrl,
  };

  try {
    const response = await axios.post(
      "https://api.d-id.com/talks",
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic b21lcm5hZGFtQGdtYWlsLmNvbQ:dNxtZ9ricjCtMpiIrXHxq`,
        },
      }
    );
    if (response.status === 201) {
      const videoUrl = response.data.id;
      res.send(videoUrl);
    } else {
      res.status(response.status).send("Error creating video");
    }
  } catch (error) {
    console.error("Error creating video", error);
    res.status(500).send("Internal Server Error");
  }
});

router.route("/getVideo").get(async (req, res) => {
  const videoId = res.body;
  try {
    const response = await axios.get(`https://api.d-id.com/talks/${videoId}`);
    if (response.status === 200) {
      const videoData = response.data;
      // Handle the video data as needed
      res.json(videoData);
    } else {
      res.status(response.status).send("Error retrieving video");
    }
  } catch (error) {
    console.error("Error retrieving video", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
