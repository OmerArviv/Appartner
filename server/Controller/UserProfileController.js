const express = require("express");
const app = express();
const UserProfileService = require("../Service/UserProfileService");
const router = express.Router();
const auth = require("../middleware/auth");
const openai = require('openai');
const axios = require('axios');



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

router.route("/parse").post(async (request, response) => {
  const { data } = request.body;
  if (!data) {
    return response.status(403).send({});
  }

  const dataJson = await UserProfileService.parseUserInfo(data);

  if (dataJson) {
    return response.status(200).json(dataJson);
  }
  return response.status(200).send(null);
});


//b21lcm5hZGFtQGdtYWlsLmNvbQ:YvOraHztgCHIXpKOVp9QI

router.route('/dalle').post(async (req, res) => {
  const apiKey = 'b21lcm5hZGFtQGdtYWlsLmNvbQ:YvOraHztgCHIXpKOVp9QI';
  const json = JSON.stringify(req.body);
  const obj = JSON.parse(json);

  const requestBody = {
    script: {
      type: 'text',
      input: obj.text,
    },
    source_url: obj.imageUrl,
  };

  try {
    const response = await axios.post('https://api.d-id.com/talks', requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic b21lcm5hZGFtQGdtYWlsLmNvbQ:dNxtZ9ricjCtMpiIrXHxq`
      }
    });
    if (response.status === 201) {
      const videoUrl = response.data.id;
      res.send(videoUrl);
    } else {
      res.status(response.status).send('Error creating video');
    }
  } catch (error) {
    console.error('Error creating video', error);
    res.status(500).send('Internal Server Error');
  }
});

router.route('/getVideo').get(async (req, res) => {
  const videoId = res.body;
  try {
    const response = await axios.get(`https://api.d-id.com/talks/${videoId}`);
    if (response.status === 200) {
      const videoData = response.data;
      // Handle the video data as needed
      res.json(videoData);
    } else {
      res.status(response.status).send('Error retrieving video');
    }
  } catch (error) {
    console.error('Error retrieving video', error);
    res.status(500).send('Internal Server Error');
  }
 
});



module.exports = router;
