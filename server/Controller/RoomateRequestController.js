const express = require("express");
const RoomateRequestService = require("../Service/RoomateRequestService");
const router = express.Router();
const auth = require("../middleware/auth");

router.route("/createRoomateRequest").post(auth, async (request, response) => {
  // Get user input
  const RoomateRequest = request.body;
  if (!RoomateRequest) {
    return response.status(400).send("Something went wrong");
  }
  var result = await RoomateRequestService.insertRoomateRequest(RoomateRequest);
  if (result == false) {
    return response.status(403).send("Request has alredy sent");
  }
  if (result != null) {
    return response.status(201).json(RoomateRequest);
  }
  return response.status(403).send("something went wrong");
});

router.route("/updateRoomateRequest").post(auth, async (request, response) => {
  // Get user input
  const RoomateRequest = request.body;
  if (!RoomateRequest) {
    return response.status(400).send("All input is required");
  }
  var result = await RoomateRequestService.updateRoomateRequest(RoomateRequest);
  if (result != null) {
    return response.status(201).json(RoomateRequest);
  }
  return response.status(403).send({});
});

router.route("/getRoomateRequestByUserEmail").get(async (request, response) => {
  const email = request.query;
  if (!email) {
    return response.status(403).send({});
  }

  const RoomateRequest =
    await RoomateRequestService.findRoomateRequestByUserEmail(email);
  if (RoomateRequest) {
    return response.status(200).json(RoomateRequest);
  }
  return response.status(204).send(null);
});

router
  .route("/getRoomateRequestByAppartmentId")
  .get(async (request, response) => {
    const id = request.query;
    if (!id) {
      return response.status(403).send({});
    }

    const roomateRequest =
      await RoomateRequestService.findRoomateRequestByAppartmentId(id);
    if (roomateRequest) {
      return response.status(200).json(roomateRequest);
    }
    return response.status(204).send(null);
  });

module.exports = router;
