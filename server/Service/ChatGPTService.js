const Appartment = require("../Model/appartment");
const UserProfileService = require("../Service/UserProfileService");

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);


module.exports = class ChatGPTService {

  static async getMatches(input) {
    const user = JSON.stringify(input.user);
    const apartments = JSON.stringify(input.apartments);

    // user = minifyJSON(user);
    // apartments = minifyJSON(apartments);

    const prompt = `Find the best apartment based on the "User Profile" and the "Apartments". Return an array in json format of the apartment IDs("_id"): User Profile: ${user} Apartments: ${apartments}`;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 100,
      temperature: 1,
    });

    const jsonResponse = response.data.choices[0].text;

    return JSON.parse(jsonResponse);
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
  
      return json;
    }
};
