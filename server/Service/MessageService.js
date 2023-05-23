const Message = require("../Model/message");

module.exports = class MessageService {

  static async insertMessage(messageDetails) {
    return Message.create(messageDetails)
      .then((value) => {
        return value;
      })
      .catch((error) => {
        return null;
      });
  }

};
