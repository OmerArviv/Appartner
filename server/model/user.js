const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  full_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  salt: { type: String },
  phone_number: { type: String },
  role: { type: String },
  token: { type: String },
  last_login: { type: Number, default: () => Math.floor(Date.now() / 1000) },
});

module.exports = mongoose.model("user", userSchema);
