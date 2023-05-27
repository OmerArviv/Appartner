const mongoose = require("mongoose");

const appartmentSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  age_range: { type: Array, default: null },
  location: {
    position: {
      lat: { type: Number, default: null },
      lng: { type: Number, default: null }
    },
    name: { type: String, default: null }
  }, price_range: { type: Array, default: null },
  gender: { type: String, default: null },
  elevator: { type: String, default: null },
  parking: { type: String, default: null },
  smoking: { type: String, default: null },
  roomates: { type: Array, default: null },
  images: { type: Array, default: null },
});

module.exports = mongoose.model("appartment", appartmentSchema);
