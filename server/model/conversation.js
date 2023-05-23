const mongoose = require("mongoose");

// const conversationSchema = new mongoose.Schema({
//     members:{type:Array}
// },{timestamps: true});

const conversationSchema = new mongoose.Schema({
    welcomer_email:{type:String},
    looker_email:{type:String}
},{timestamps: true});

module.exports = mongoose.model("conversation", conversationSchema);
