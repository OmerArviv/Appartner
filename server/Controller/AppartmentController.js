const express = require("express");
const AppartmentService = require("../Service/AppartmentService");
const router = express.Router();
const auth = require("../middleware/auth");

router.route("/createAppartment").post(auth, async (request, response) => {
  // Get user input
  const Appartment = request.body;
  console.log(Appartment);
  if (!Appartment) {
    return response.status(400).send("All input is required");
  }
  var result = await AppartmentService.insertAppartment(Appartment);
  if (result != null) {
    return response.status(201).json(Appartment);
  }
  return response.status(403).send({});
});

router.route("/updateAppartment").post(auth, async (request, response) => {
  // Get user input
  const Appartment = request.body;
  if (!Appartment) {
    return response.status(400).send("All input is required");
  }
  var result = await AppartmentService.updateAppartment(Appartment);
  if (result != null) {
    return response.status(201).json(Appartment);
  }
  return response.status(403).send({});
});

router.route("/getAppartmentByEmail").get(async (request, response) => {
  const { email } = request.query;
  if (!email) {
    return response.status(403).send({});
  }

  const Appartment = await AppartmentService.findAppartmentByEmail(email);
  if (Appartment) {
    return response.status(200).json(Appartment);
  }
  return response.status(204).send(null);
});

router.route("/getAppartmentById").get(async (request, response) => {
  const id = request.query;
  if (!id) {
    return response.status(403).send({});
  }

  const Appartment = await AppartmentService.findAppartmentByid(id);
  if (Appartment) {
    return response.status(200).json(Appartment);
  }
  return response.status(204).send(null);
});

router.route("/getAppartmentByUserEmail").get(async (request, response) => {
  const { userEmail } = request.query;
  if (!userEmail) {
    return response.status(403).send({});
  }

  const Appartment = await AppartmentService.findAppartmentByUserEmail(
    userEmail
  );
  if (Appartment) {
    return response.status(200).json(Appartment);
  }
  return response.status(204).send(null);
});

router.route("/getAllAppartments").get(async (request, response) => {
  const Appartments = await AppartmentService.getAllAppartments();
  if (Appartments) {
    return response.status(200).json(Appartments);
  }
  return response.status(204).send(null);
});

module.exports = router;
