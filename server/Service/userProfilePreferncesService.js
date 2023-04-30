const UserProfilePrefernces = require("../Model/UserProfilePrefernce");

module.exports = class UserProfilePrefernceService {
  static async insertUserProfilePrefernces(UserProfilePrefernce) {
    return UserProfilePrefernces.create(UserProfilePrefernce)
      .then((value) => {
        return value;
      })
      .catch((error) => {
        return null;
      });
  }

  static async updateUserProfilePrefernces(UserProfilePrefernce) {
    return UserProfilePrefernces.findOneAndUpdate(
      { email: UserProfilePrefernce.email },
      UserProfilePrefernce
    )
      .then((value) => {
        return value;
      })
      .catch((error) => {
        return null;
      });
  }

  static async findUserProfilePreferncesByEmail(email) {
    const res = await UserProfilePrefernces.findOne({ email });
    return res;
  }
};
