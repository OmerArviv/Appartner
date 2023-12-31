const http = require("http");
const app = require("./app");
const socket = require("../server/socket/index");
const server = http.createServer(app);

// Listen to PORT
app.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}`);
});

//Upload socket

socket.start(server);

//Routes API
const userAPI = require("./Controller/UserController.js");
const userProfileAPI = require("./Controller/UserProfileController");
const userProfilePreferncesAPI = require("./Controller/UserProfilePreferncesController");
const AppartmentAPI = require("./Controller/AppartmentController");
const roomateRequestAPI = require("./Controller/RoomateRequestController");
const chatGptAPI = require("./Controller/ChatGPTController");
const ConversationAPI=require("./Controller/ConversationController");
const MessageAPI=require("./Controller/MessageController");


//Route use
app.use("/authentication", userAPI);
app.use("/userProfile", userProfileAPI);
app.use("/userProfilePrefernces", userProfilePreferncesAPI);
app.use("/appartment", AppartmentAPI);
app.use("/roomateRequest", roomateRequestAPI);
app.use("/chatGpt", chatGptAPI);
app.use("/conversation", ConversationAPI);
app.use("/message", MessageAPI);

