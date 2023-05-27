const Message = require("../Model/message");

module.exports = class MessageService {

  static async insertMessage(messageDetails) {
    console.log("message service");
    console.log(messageDetails);
    return Message.create(messageDetails)
      .then((value) => {
        return value;
      })
      .catch((error) => {
        return null;
      });
  }

  
  static async getMessagesConversationById(id) {
    console.log(id);
    const res = await Message.find({conversation_id: id.con_id});
    return res;
  }

};
