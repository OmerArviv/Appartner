const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    user_type:{ type: String, require},
    Birthday_date: { type: String, default: null },
    user_employment: { type: String, default: null },
    smoking: { type: String, default: null },
    pets: { type: String, default: null },
    gender: { type: String, default: null },
    alcohol: { type: String, default: null },
    kosher: { type: String, default: null },
    other: { type: String, default: null },
    user_additonal_information: {type:String, default: null},
    user_facebook_link:{type:String, default: null},
    user_instagram_link:{type:String, default: null},
    user_profile_image: {type: String, default:null},
});

module.exports = mongoose.model("userProfile", userProfileSchema);
