const mongoose = require("mongoose");

const roomateRequestsSchema = new mongoose.Schema({
  appartment_id: { type: String, require },
  user_email: { type: String, require },
  status: { type: String, default: null },
});

module.exports = mongoose.model("roomateRequests", roomateRequestsSchema);
