const express = require("express");
const MessageService = require("../Service/MessageService");
const router = express.Router();
const auth = require("../middleware/auth");

// add message

router.route("/addMessege").post(auth, async (request, response) => {
    const message = request.body;
    if (!message) {
      return response.status(400).send("something went wrong");
    }
    var result = await MessageService.insertMessage(message);
    console.log(result);
    if (result != null) {
      return response.status(201).json(message);
    }
    return response.status(403).send({});
  });

  //get message

  



module.exports = router;
