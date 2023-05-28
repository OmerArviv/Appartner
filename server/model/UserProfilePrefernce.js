const mongoose = require("mongoose");

const userProfilePreferncesSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  ageRange: { type: Array },
  location: {
    position: {
      lat: { type: Number, default: null },
      lng: { type: Number, default: null }
    },
    name: { type: String, default: null }
  },
  radius: { type: Number, default: null },
  priceRange: { type: Array, default: null },
  gender: { type: String, default: null },
  elevator: { type: String, default: null },
  parking: { type: String, default: null },
  smoking: { type: String, default: null },
  numberOfRoomates: { type: String, default: null },
});

module.exports = mongoose.model(
  "userProfilePreferncesSchema",
  userProfilePreferncesSchema
);
