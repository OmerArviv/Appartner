const users = require("../Model/User");

module.exports = class UserService {
  static async insertUser(user) {
    console.log(user);
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
    return res.salt;
  }
};
