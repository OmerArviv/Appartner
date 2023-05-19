const RoomateRequest = require("../Model/RoomateRequest");
const minifyJSON = require("../app");

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

  static async deleteRoomateRequest(roomateRequestId) {
    const res = RoomateRequest.findByIdAndRemove(roomateRequestId);

    if (res) {
      return res;
    } else {
      return null;
    }
    // .then((value) => {
    //     return value;
    //   })
    //   .catch((error) => {
    //     return null;
    //   });
  }

  static async findRoomateRequestByAppartmentId(id) {
    const res = await RoomateRequest.find({
      appartment_id: id.id,
    });
    return res;
  }

  static async findRoomateRequestByUserEmail(userEmail) {
    const res = await RoomateRequest.find(userEmail);
    return res;
  }

  
};
