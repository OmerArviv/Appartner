const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    conversation_id:{type:String},
    sender_email:{type:String},
    text:{type:String}
},{timestamps: true});

module.exports = mongoose.model("message", messageSchema);
