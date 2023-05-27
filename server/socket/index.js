
function start(server){

    const io= require("socket.io")(8900,{
        cors:{
            origin:"http://localhost:3000", //to use in client 
        },
    });
    
    let users= [];
    
    const addUser=(userId,socketId)=>{
        !users.some(user=>user.userId ===userId) && 
        users.push({userId,socketId});
        // console.log(users);
    }
    
    const removeUser=(socketId)=>{
        users=users.filter(user=>user.socketId !==socketId);
    }
    
    // const getUser=(userId)=>{
    //     return users.find((user)=>{ user.userId === userId});
    // }
    
    const getUser = (userId) => {
        return users.find((user) => {
          return user.userId === userId;
        });
      };
    
    io.on("connection",(socket)=>{//ani bedaka 01:36
        //when connect
        console.log("a user connected.");
        io.emit("welcome", "hello this is socket server!")
        //take users id and socketId from users
        socket.on("addUser", userId=>{
            addUser(userId,socket.id);
            io.emit("getUsers", users);
        });
    
        //send and get message
        socket.on("sendMessage", (({senderEmail,reciverEmail, text})=>{
            const user= getUser(reciverEmail);
            io.to(user.socketId).emit("getMessage",{senderEmail, text});
        }))
    
    
        //when disconnect
        socket.on("disconnect", ()=>{
        console.log("a user disconnected!");
        removeUser(socket.id); 
        io.emit("getUsers", users);
    });
    });
    
}

module.exports={
    start
};


