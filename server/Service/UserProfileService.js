const usersProfile = require("../Model/userProfile");
const axios = require("axios");

module.exports = class UserProfileService {
  static async insertUserProfile(userProfile) {
    console.log(userProfile);
    try {
      const value = await usersProfile.create(userProfile);
      return value;
    } catch (error) {
      console.error("Error inserting user profile:", error);
      return null;
    }
  }

  static async findUserProfileByEmail(email) {
    try {
      const res = await usersProfile.findOne({ email });
      return res;
    } catch (error) {
      console.error("Error finding user profile:", error);
      return null;
    }
  }

  static async getAllUsersEmails() {
    try {
      const res = await usersProfile.find({}).select("email");
      return res;
    } catch (error) {
      console.error("Error finding user profile:", error);
      return null;
    }
  }

  //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

  static async createVideoApi(input, res) {
    try {
      const { image, text } = req.body;

      // Prepare the request payload
      const requestBody = {
        script: {
          type: "text",
          input: "I love this video",
        },
        source_url:
          "https://images1.ynet.co.il//PicServer5/2019/09/15/9484703/94846920990100980754no.jpg",
      };

      console.log(requestBody);

      // Make a request to the D-ID API
      const response = await fetch("https://api.d-id.com/talks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic b21lcm5hZGFtQGdtYWlsLmNvbQ:Dd1Ek0J26qcTyC6o2LWTV`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const videoUrl = await response.json();
        // Do something with the generated video URL

        // Send the video URL back to the front-end
        res.send(videoUrl);
      } else {
        // Handle the error from the D-ID API
        res.status(response.status).send("Error creating video");
      }
    } catch (error) {
      // Handle network or other errors
      res.status(500).send("Internal Server Error");
    }
  }
};
