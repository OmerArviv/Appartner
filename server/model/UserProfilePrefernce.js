const mongoose = require("mongoose");

const userProfilePreferncesSchema = new mongoose.Schema({
    ageRange: { type: Array },
    location: { type: String, default: null },
    priceRange: { type: Array, default: null },
    gender: { type: String, default: null },
    elevator: { type: String, default: null },
    parking: { type: String, default: null },
    smoking: { type: String, default: null },
    numberOfRoomates: { type: String, default: null },
});

module.exports = mongoose.model("userProfilePreferncesSchema", userProfilePreferncesSchema);
