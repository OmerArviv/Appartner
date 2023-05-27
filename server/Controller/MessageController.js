const express = require("express");
const MessageService = require("../Service/MessageService");
const router = express.Router();
const auth = require("../middleware/auth");

// add message

router.route("/createMessage").post(auth, async (request, response) => {
    const message = request.body;
    if (!message) {
      return response.status(400).send("something went wrong");
    }
    var result = await MessageService.insertMessage(message);
    if (result != null) {
      return response.status(201).json(message);
    }
    return response.status(403).send({});
  });

  //get messages of the conversation
  router.route("/getConversationMessages").get(async (request, response) => {
    const id = request.query;
    if (!id) {
      return response.status(403).send({});
    }
    const messages = await MessageService.getMessagesConversationById(id);
    if (messages) {
      return response.status(200).json(messages);
    }
    return response.status(204).send(null);
  });
  
  



module.exports = router;
