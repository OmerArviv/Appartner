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

  static async findAppartmentByEmail(email) {
    const res = await Appartment.findOne({ email });
    return res;
  }

  static async findAppartmentByid(id) {
    const res = await Appartment.findOne({ id });
    return res;
  }
};
