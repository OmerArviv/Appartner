const express = require("express");
const RoomateRequestService = require("../Service/RoomateRequestService");
const router = express.Router();
const auth = require("../middleware/auth");
const ChatGPTService = require("../Service/ChatGPTService");

router.route("/parse").post(async (request, response) => {
  const { data } = request.body;
  if (!data) {
    return response.status(403).send({});
  }

  const dataJson = await ChatGPTService.parseUserInfo(data);

  if (dataJson) {
    return response.status(200).json(dataJson);
  }
  return response.status(200).send(null);
});

router.route("/getBestMatches").post(async (request, response) => {
  const { data } = request.body;
  if (!data) {
    return response.status(403).send({});
  }

  const dataJson = await ChatGPTService.getMatches(data);

  if (dataJson) {
    return response.status(200).json(dataJson);
  }
  return response.status(200).send(null);
});



module.exports = router;
