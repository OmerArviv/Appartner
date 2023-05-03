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
  return response.status(200).send(null);
});

module.exports = router;
