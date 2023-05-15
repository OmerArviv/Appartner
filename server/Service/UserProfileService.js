const usersProfile = require("../Model/userProfile");
const axios = require('axios');

//const openai = require('openai');
const { Configuration, OpenAIApi } = require("openai")
const configuration = new Configuration({
  apiKey: "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"
})


// openai.apiKey = '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';

const openai = new OpenAIApi(configuration)


module.exports = class UserProfileService {
  static async insertUserProfile(userProfile) {
    console.log(userProfile);
    try {
      const value = await usersProfile.create(userProfile);
      return value;
    } catch (error) {
      console.error('Error inserting user profile:', error);
      return null;
    }
  }

  static async findUserProfileByEmail(email) {
    try {
      const res = await usersProfile.findOne({ email });
      return res;
    } catch (error) {
      console.error('Error finding user profile:', error);
      return null;
    }
  }

  //Hey my name is Omer, I drink alcohol once a month and like to walk with my dog "Barney" I'm 27 years old and im a boy, working as software developer and not eating kosher.

  static async parseUserInfo(input) {
    const prompt = `Parse the following user description into JSON format:\n\n"${input}"\n\nJSON format:\n{"gender": enum {"Male", "Female", "Other"}, "age": number,"user_employment": string, "alcohol": enum {"Yes", "No", "Sometimes"}, "pets": enum {"Yes", "No"}, "kosher": enum {"Yes", "No"}, "smoking": enum {"Yes", "No", "Sometimes"}}\n\nParsed JSON: `;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 100,
      temperature: 1,
    });
  
    const jsonResponse = response.data.choices[0].text;
    const json = JSON.parse(jsonResponse);
    //console.log(json);
  
    return json;
  }

  //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
  
  
  static async createVideoApi(input, res) {
    try {
      const { image, text } = req.body;
      
  
      // Prepare the request payload
      const requestBody = {
        script: {
          type: 'text',
          input: 'I love this video',
        },
        source_url: 'https://images1.ynet.co.il//PicServer5/2019/09/15/9484703/94846920990100980754no.jpg',
      };

      console.log(requestBody);
      
  
      // Make a request to the D-ID API
      const response = await fetch('https://api.d-id.com/talks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
        res.status(response.status).send('Error creating video');
      }
    } catch (error) {
      // Handle network or other errors
      res.status(500).send('Internal Server Error');
    }
  }
};
