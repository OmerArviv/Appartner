const users = require("../Model/User");

module.exports = class UserService {
  static async insertUser(user) {
    return users
      .create(user)
      .then((value) => {
        return value;
      })
      .catch((error) => {
        return null;
      });
  }

  static async findUserByEmail(email) {
    const res = await users.findOne({ email });
    return res;
  }

  static async getSaltByEmail(email) {
    const res = await users.findOne({ email });
    if (res) {
      return res.salt;
    }
    return null;
  }

  static async updateUserByEmail(user) {
    return users
      .findOneAndUpdate({ email: user.email }, user)
      .then((value) => {
        return value;
      })
      .catch((error) => {
        return null;
      });
  }
};
