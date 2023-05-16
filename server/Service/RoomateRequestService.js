const RoomateRequest = require("../Model/RoomateRequest");

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
});

// openai.apiKey = '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';

const openai = new OpenAIApi(configuration);

module.exports = class AppartmentService {
  static async findRoomateRequest(data) {
    const res = await RoomateRequest.find(data);
    return res;
  }

  static async insertRoomateRequest(roomateRequestDetails) {
    roomateRequestDetails.status = "pending";
    const res = await this.findRoomateRequest({
      appartment_id: roomateRequestDetails.appartment_id,
      user_email: roomateRequestDetails.user_email,
    });
    if (res.length != 0) {
      return false;
    }
    return RoomateRequest.create(roomateRequestDetails)
      .then((value) => {
        return value;
      })
      .catch((error) => {
        return null;
      });
  }

  static async updateRoomateRequest(roomateRequestDetails) {
    console.log(roomateRequestDetails);
    return RoomateRequest.findOneAndUpdate(
      { _id: roomateRequestDetails._id },
      roomateRequestDetails
    )
      .then((value) => {
        return value;
      })
      .catch((error) => {
        return null;
      });
  }

  static async findRoomateRequestByAppartmentId(id) {
    const res = await RoomateRequest.find({
      appartment_id: id.id,
      status: "pending",
    });
    return res;
  }

  static async findRoomateRequestByUserEmail(userEmail) {
    const res = await RoomateRequest.find(userEmail);
    return res;
  }

  static async getMatches(input) {

    const user=JSON.stringify(input.user);
    const apartments=JSON.stringify(input.apartments);


    const prompt = `Find the best apartment based on the "User Profile" and the "Apartments". Return an array of the apartment IDs("_id"): User Profile: ${user} Apartments: ${apartments}`;

    const headers = {
      'Content-Type': 'application/json',
    };

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 100,
      temperature: 1,
    });
    
  
    const jsonResponse = response.data.choices[0].text;

    console.log(typeof jsonResponse);
  
    return jsonResponse;
  }
};
