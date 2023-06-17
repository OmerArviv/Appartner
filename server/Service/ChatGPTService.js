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
      max_tokens: 1000,
      temperature: 1,
    });

    const jsonResponse = response.data.choices[0].text;

    return JSON.parse(jsonResponse);
  }

  //Hey my name is Omer, I drink alcohol once a month and like to walk with my dog "Barney" I'm 27 years old and im a boy, working as software developer and not eating kosher.

  static async parseUserInfo(input) {
    const prompt = `Parse the following user description into JSON format:\n\n"${input}"\n\nJSON format:\n{"gender": enum {"Male", "Female", "Other"}, "age": number,"user_employment": string, "alcohol": enum {"Yes", "No", "Sometimes"}, "pets": enum {"Yes", "No"}, "kosher": enum {"Yes", "No"}, "smoking": enum {"Yes", "No", "Sometimes"}}, "hobby": enum {"Yes", "No", "Sometimes"}}\n\nParsed JSON: `;
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

  // static async convWithChat(input) {
  //   const user = JSON.stringify(input.user);
  //   const apartments = JSON.stringify(input.apartments);
  //   const messages = [
  //     { role: 'system', content: 'You are a helpful assistant that finds relevant apartments based on user requests, Return only an array without additional texts, containing the IDs ("_id") of the matching apartments.' },
  //     { role: 'user', content: user },
  //     { role: 'assistant', content: apartments }
  //   ];

  //   console.log(messages);
  //     const response = await openai.createChatCompletion({
  //       model:"gpt-3.5-turbo",
  //       messages: messages,
  //       max_tokens: 100,
  //       temperature: 1,
  //     });

  //   const jsonResponse = response.data.choices[0].message.content;
  //   try {
  //     const parsed = JSON.parse(jsonResponse);
  //     console.log("success");
  //     return parsed;
  //   } catch {
  //     console.log(jsonResponse);
  //   }
  // }

  static async convWithChat(input) {
    const user = JSON.stringify(input.user);
    const apartments = JSON.stringify(input.apartments);
    const prompt = `Find relevant apartments from the following JSON: ${apartments}, based on the user's request: "${user}". Return only a array without additional texts, containing the IDs ("_id") of the matching apartments.`;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 1000,
      temperature: 1,
    });

    const jsonResponse = response.data.choices[0].text;
    try {
      const parsed = JSON.parse(jsonResponse);
      console.log("success", parsed);
      return parsed;
    } catch {
      console.log(jsonResponse);
    }
  }

  //

  static async shortcutWithChatGpt(input) {
    const apartments = JSON.stringify(input);
    const prompt = `Create compelling marketing descriptions to promote your apartment and attract potential buyers or tenants. Write captivating marketing summaries for each apartment in ${apartments}. Return an array in JSON format containing the apartment IDs ("_id") and their enticing marketing summaries as ("summary").`;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 1000,
      temperature: 1,
    });

    const jsonResponse = response.data.choices[0].text;

    return JSON.parse(jsonResponse);
  }

  static async summaryWithChatGpt(input) {
    const apartment = JSON.stringify(input);
    const prompt = `Create compelling marketing description to promote your apartment and attract potential roommates. Write captivating marketing summary with 30 words in maximum for: ${apartment}. Return the summary in text format`;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 1000,
      temperature: 1,
    });

    const jsonResponse = response.data.choices[0].text;

    return jsonResponse;
  }
};
