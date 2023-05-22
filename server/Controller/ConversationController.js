const express = require("express");
const ConversationService = require("../Service/ConversationService");
const router = express.Router();
const auth = require("../middleware/auth");

//new conversation


router.route("/createConversation").post(auth, async (request, response) => {
    console.log("newConversation");
    const newConversation = {members:[request.body.sender_id, request.body.receiver_id]};
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




module.exports = router;
