const Appartment = require("../Model/appartment");
const UserProfileService = require("../Service/UserProfileService");

module.exports = class AppartmentService {
  static async insertAppartment(AppartmentDetails) {
    return Appartment.create(AppartmentDetails)
      .then((value) => {
        return value;
      })
      .catch((error) => {
        return null;
      });
  }

  static async updateAppartment(AppartmentDetails) {
    return Appartment.findOneAndUpdate(
      { _id: AppartmentDetails.id },
      AppartmentDetails
    )
      .then((value) => {
        return value;
      })
      .catch((error) => {
        return null;
      });
  }

  static async findAppartmentByid(id) {
    const res = await Appartment.findOne(id);
    return res;
  }

  static async findAppartmentByUserEmail(userId) {
    const res = await Appartment.find(userId);
    return res;
  }

  static async getAllAppartments() {
    return Appartment.find({})
      .then((value) => {
        return value;
      })
      .catch((error) => {
        return null;
      });
  }

  static async getAllAppartmentsAndRoomateDetails() {
    var allAppartments = await this.getAllAppartments();
    if (allAppartments) {
      for (var i = 0; i < allAppartments.length; i++) {
        var roomates = allAppartments[i].roomates;
        var roomatesDataArray = [];
        for (var j = 0; j < roomates.length; j++) {
          var res = await UserProfileService.findUserProfileByEmail(
            roomates[j]
          );
          roomatesDataArray.push(res);
        }
        allAppartments[i].roomates = roomatesDataArray;
      }
      return allAppartments;
    } else {
      return null;
    }
  }
};
