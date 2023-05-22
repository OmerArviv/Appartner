const Conversation = require("../Model/conversation");


module.exports = class ConversationService{

    static async insertConversation(conversationDetails) {
        return Conversation.create(conversationDetails)
          .then((value) => {
            return value;
          })
          .catch((error) => {
            return null;
          });
      }










}