const RoomateRequest = require("../Model/RoomateRequest");

module.exports = class AppartmentService {
  static async insertRoomateRequest(roomateRequestDetails) {
    return RoomateRequest.create(roomateRequestDetails)
      .then((value) => {
        return value;
      })
      .catch((error) => {
        return null;
      });
  }

  static async updateRoomateRequest(roomateRequestDetails) {
    return RoomateRequest.findOneAndUpdate(
      { _id: AppartmentDetails.id },
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
    const res = await RoomateRequest.find(id);
    return res;
  }

  static async findRoomateRequestByUserEmail(userEmail) {
    const res = await RoomateRequest.find({ user_email: userEmail });
    return res;
  }
};
