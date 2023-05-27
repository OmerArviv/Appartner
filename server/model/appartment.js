const mongoose = require("mongoose");

const appartmentSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  age_range: { type: Array, default: null },
  location: { type: String, default: null },
  price_range: { type: Array, default: null },
  gender: { type: String, default: null },
  elevator: { type: String, default: null },
  parking: { type: String, default: null },
  smoking: { type: String, default: null },
  roomates: { type: Array, default: null },
  images: { type: Array, default: null },
  summary: {type: String, default: null},
});

module.exports = mongoose.model("appartment", appartmentSchema);
