const io= require("socket.io")(8900,{
    cors:{
        origin:"http://localhost:3000", //to use in client 
    },
});

let users= [];

const addUser=(userId,socketId)=>{
    !users.some(user=>user.userId ===userId) && 
    users.push({userId,socketId});
}

const removeUser=(socketId)=>{
    users=users.filter(user=>user.socketId !==socketId);
}

io.on("connection",(socket)=>{//ani bedaka 01:36
    console.log("a user connected.");
    io.emit("welcome", "hello this is socket server!")
    //take users id and socketId from users
    socket.on("addUser", userId=>{
        addUser(userId,socket.id);
        io.emit("getUsers", users);
    });

    socket.on("disconnect", ()=>{
    console.log("a user disconnected!");
    removeUser(socket.id); 
    io.emit("getUsers", users);
});
});
