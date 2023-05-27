const Conversation = require("../Model/conversation");


module.exports = class ConversationService{

    static async insertConversation(conversationDetails) {
        return Conversation.create(conversationDetails)
          .then((value) => {
            console.log(value);
            return value;
          })
          .catch((error) => {
            return null;
          });
      }

      //get conversations by its id
      static async getConversationByid(id) {
        const res = await Conversation.find(id);
        return res;
      }

      //get all the conversations of the user
      static async getConversationsByUserEmail(emailId) {
        const res = await Conversation.find({$or:[{welcomer_email:emailId.user_email},{looker_email:emailId.user_email}]});
        return res;
      }









}