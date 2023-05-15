const RoomateRequest = require("../Model/RoomateRequest");

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
    let user=input.user;
    let apartments=input.apartments;
    const prompt = `Find the best 10 apartments based on the user profile and preferences. Return an array of the apartment IDs:\n\nUser Profile:\n${user}\n\nApartments:\n${apartments}`;
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
};
