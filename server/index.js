const http = require("http");
const app = require("./app");
const server = http.createServer(app);

// Listen to PORT
app.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}`);
});

//Routes API
const userAPI = require("./Controller/UserController.js");
const userProfileAPI=require("./Controller/UserProfileController");//do with set

//Route use
app.use("/authentication", userAPI);
app.use("/userProfile", userProfileAPI);

