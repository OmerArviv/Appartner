const usersProfile = require("../Model/userProfile");

module.exports = class UserProfileService {
  static async insertUserProfile(userProfile) {
    console.log(userProfile);
    return usersProfile
      .create(userProfile)
      .then((value) => {
        console.log(value);
        return value;
      })
      .catch((error) => {
        // console.log(error);
        return null;
      });
  }
};
