const http = require("http");
const app = require("./app");
const server = http.createServer(app);


// Listen to PORT
app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}`);
});
