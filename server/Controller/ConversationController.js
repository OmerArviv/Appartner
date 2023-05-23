const express = require("express");
const ConversationService = require("../Service/ConversationService");
const router = express.Router();
const auth = require("../middleware/auth");

//new conversation

router.route("/createConversation").post(auth, async (request, response) => {
    const newConversation=request.body;
    if (!newConversation) {
      return response.status(400).send("Something went wrong");
    }
    var result = await ConversationService.insertConversation(newConversation);
    if (result != null) {
      return response.status(201).json(newConversation);
    }
    return response.status(403).send({});
  });


//get conversation by Id
router.route("/getConversationById").get(async (request, response) => {
  const id = request.query;
  console.log("server controller");

  console.log(id);
  if (!id) {
    return response.status(403).send({});
  }
  const conversation = await ConversationService.getConversationByid(id);
  if (conversation) {
    return response.status(200).json(conversation);
  }
  return response.status(204).send(null);
});

//get conversation by user email
router.route("/getConversationsByUserEmail").get(async (request, response) => {
  const email = request.query;
  if (!email) {
    return response.status(403).send({});
  }

  const conversations = await ConversationService.getConversationsByUserEmail(email);
  if (conversations) {
    return response.status(200).json(conversations);
  }
  return response.status(204).send(null);
});


module.exports = router;
