const express = require("express");
const ConversationService = require("../Service/ConversationService");
const router = express.Router();
const auth = require("../middleware/auth");

//new conversation


router.route("/createConversation").post(auth, async (request, response) => {
    console.log("newConversation");
    // const newConversation = {members:[request.body.sender_id, request.body.receiver_id]};
    const newConversation=request.body;
    console.log(newConversation);
    if (!newConversation) {
      return response.status(400).send("All input is required");
    }
    var result = await ConversationService.insertConversation(newConversation);
    console.log(result);
    if (result != null) {
      return response.status(201).json(newConversation);
    }
    return response.status(403).send({});
  });


//get conversation of a user
router.route("/getConversationsByUserId").get(async (request, response) => {
  const id = request.query;
  if (!id) {
    return response.status(403).send({});
  }

  const conversation = await ConversationService.getConversationByid(id);
  if (conversation) {
    return response.status(200).json(conversation);
  }
  return response.status(204).send(null);
});

//get conversation by user id
router.route("/getConversationsByUserId").get(async (request, response) => {
  const id = request.query;
  if (!id) {
    return response.status(403).send({});
  }

  const conversations = await ConversationService.findConversationsByUserEmail(id);
  if (conversations) {
    return response.status(200).json(conversations);
  }
  return response.status(204).send(null);
});


module.exports = router;
