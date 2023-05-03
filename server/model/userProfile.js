const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  Birthday_date: { type: String, default: null },
  user_employment: { type: String, default: null },
  smoking: { type: String, default: null },
  pets: { type: String, default: null },
  gender: { type: String, default: null },
  alcohol: { type: String, default: null },
  kosher: { type: String, default: null },
  other: { type: String, default: null },
  user_additonal_information: { type: String, default: null },
  user_facebook_link: { type: String, default: null },
  user_instagram_link: { type: String, default: null },
  user_images_array: { type: Array, default: null },
});

module.exports = mongoose.model("userProfile", userProfileSchema);
