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

      static async getConversationByid(id) {
        const res = await Conversation.findOne(id);
        return res;
      }

      static async findConversationsByUserEmail(userId) {
        const res = await Conversation.find(userId);
        return res;
      }









}