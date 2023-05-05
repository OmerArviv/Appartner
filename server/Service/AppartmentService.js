const Appartment = require("../Model/appartment");

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
    const res = await Appartment.findOne({ id });
    return res;
  }

  static async findAppartmentByUserEmail(userId) {
    const res = await Appartment.findOne({ userId });
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
};
