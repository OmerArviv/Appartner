const usersProfile = require("../Model/userProfile");

module.exports = class UserProfileService {
  static async insertUserProfile(userProfile) {
    console.log(userProfile);
    return usersProfile
      .create(userProfile)
      .then((value) => {
        return value;
      })
      .catch((error) => {
        return null;
      });
  }
};
