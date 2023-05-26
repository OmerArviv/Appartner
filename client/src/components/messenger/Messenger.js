import "./messenger.css";
import { Box, TextField, Button, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Conversation from "./Conversation";
import Message from "./Message";
import ChatOnline from "./ChatOnline";
import { authContext } from "../../APP/Utils";
import Cookies from "js-cookie";
import { useContext, useEffect, useRef, useState } from "react";
import {getUserByEmail} from "../../controller/authenticationController";
import {getConversationsByUserEmail} from "../../controller/conversationController";
import {createMessage, getMessagesConversationById} from "../../controller/messageController";
import {io} from "socket.io-client";
function Messenger(){
  const { userEmail } = useContext(authContext);
  const [user, setUser]=useState(null);
  const [conversations, setConversations]=useState([]);
  const [currentChat, setCurrentChat]=useState(null);
  const [chatMessages, setChatMessages]=useState(null);
  const [newMessage, setNewMessage]=useState("");
  const [arrivalMessage, setArrivalMessage]=useState("");
  const [onlineUsers, setonlineUsers]=useState(null);

  // const [socket, setSocket]=useState(null);
  const socket=useRef(null);
  const scrollRef=useRef(); // to show the last message that sent
  const reciverId= ()=>{
    var reciver_email=null;
    if(user.role==="Welcomer"){
      console.log(user.role);
      reciver_email=currentChat.looker_email; 
    }
    else{
      reciver_email=currentChat.welcomer_email; 
    }
    return reciver_email;
  }

  useEffect(()=>{
    getUser();
  },[]);

  useEffect(()=>{
    getUserConversations();
  },[userEmail]);

  useEffect(()=>{
    getMessagesConversation();
  },[currentChat]);

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior:"smooth"});
  },[chatMessages]);

   //send something to socket server
  useEffect(()=>{
    // socket.current.emit("addUser", user._id);
    // socket.current.on("getUsers", users=>{
    //   console.log(users);
    // });
    handleEmitEvent();
  },[user]);

    //connect to socket
  useEffect(()=>{
    socket.current= io(("ws://localhost:8900"));//ws:web socke
  },[]);

  useEffect(()=>{
    socket.current.on("getMessage", data=>{
      console.log(data);
      setArrivalMessage({
        sender_email:data.senderEmail,
        text:data.text,
        createdAt:Date.now(),
      });
    })
  },[]);
  
  
  useEffect(()=>{
    arrivalMessage && (currentChat?.looker_email ===arrivalMessage.sender_email || currentChat?.welcomer_email ===arrivalMessage.sender_email) && 
    setChatMessages(prev=>[...prev, arrivalMessage]);
  },
  [arrivalMessage,currentChat]);


  const handleEmitEvent = () => {
    if (socket.current) {
      socket.current.emit("addUser", user.email);//
      socket.current.on("getUsers", users=>{
        if(user.role==="Welcomer"){
          setonlineUsers(
            users.filter(u=>conversations?.some(c=> u.userId===c.looker_email))
          );
        }
        else{
          setonlineUsers(
            users.filter(u=>conversations?.some(c=> u.userId===c.welcomer_email))
          );
        }
        });
    
    }
  };

  //connect to socket
  // useEffect(()=>{
  //   setSocket(io("ws://localhost:8900"));//ws:web socket
  // },[]);


  
  /*message from server to all users */
  // useEffect(()=>{//if we want something from the server
  //   socket?.on("welcome", message=>{
  //     console.log(message);
  //   })
  // },[socket]);

  const getUser= async ()=>{
    const res= await getUserByEmail(userEmail);
    if(res){
      setUser(res); 
    }
  }

  const getUserConversations=async ()=>{
      const res= await getConversationsByUserEmail(userEmail);
      if(res){
        setConversations(res.data);
      }
  }

  const getMessagesConversation=async ()=>{
    if(currentChat){
      const res= await getMessagesConversationById(currentChat._id);
      if(res.data){
        setChatMessages(res.data);
      }
    } 
}

const submitHandler= async (event)=>{
  event.preventDefault();
  //should not refresh the page
  console.log(userEmail);
  const messageToSend={
    conversation_id:currentChat._id,
    sender_email:userEmail, 
    text: newMessage,
  };

socket.current.emit("sendMessage",{
  senderEmail:userEmail, 
  reciverEmail:reciverId(), 
  text:newMessage});
  try{
    const res= await createMessage(messageToSend);
    if(res){
      setChatMessages([...chatMessages, res.data]);
      setNewMessage("");
    }
   
  }catch(err){
    console.log(err);
  }
}


    return(
        <>
        {/* <div className="messenger">
            <div className="chatMenu">
            <div className="chatMwnuWrapper">
                menu
            </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">Box</div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">Online</div>
            </div>
        </div> */}


        {/*MUI */}
        <Box
        container="true"
        // spacing={50}
        xs={12}
        sx={{ display: "flex", flexWrap: "wrap", margin: "10px", marginTop: 5, justifyContent:"center" }}
        >
        <Box
          item="true"
          component="form"
          xs={4}
          sx={{ width: 1/3, marginLeft: "auto", marginRight: "auto" }}
        >
            <TextField id="search" label="Search" variant="standard"
             InputProps={{
                startAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              size="small"
              placeholder="serch for rommates..."
              />
              {conversations? 
              (
                conversations.map((con,index)=>{
                  return(
                    <div  key={index} onClick={()=>{setCurrentChat(con);}}>
                     <Conversation key={index} conversation={con} user={user}/>
                     </div>

             ) })): ""}
        </Box>
        
        {/*the chat with the message */}
        <Box
          item="true"
          component="form"
          xs={4}
          sx={{ width: 1/3, marginLeft: "auto", marginRight: "auto" }}
        >
          {currentChat? ( 
            <>
            {/*Top area- the messages */}

                  <Box item="true"
                  sx={{height:"100%", overflowY:"scroll"}}/*scrollbarGutter:"stable && both-edges", paddingRight:"10px"} */
                  >
                    {chatMessages? 
                    (chatMessages.map((mes,index)=>{
                      return(
                        <div key={index} ref={scrollRef}>
                           <Message key={index} message={mes} own={mes? mes.sender_email===userEmail : ""}/>
                        </div>
                       
                      )
                    })):""}
                  </Box>
                  {/*Bottom area- sending message */}
                    <Box item="true"
                    sx={{mt:"20px", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                    <TextField 
                    fullWidth={true}
                    placeholder="write your message"
                    sx={{height:"90px", padding:"10px"}}
                    onChange={(e)=>setNewMessage(e.target.value)}
                    value={newMessage}
                    />
                    <Button onClick={submitHandler}>
                      Send
                    </Button>
                  </Box></>) : 
                  (<Typography sx={{mt:"30%", fontSize:"40px", color:"darkgray", textAlign:"center", cursor:"default"}}>
                    Open a conversation to start a chat
                  </Typography>)}
          

        </Box>  
        <Box
          item="true"
          component="form"
          xs={4}
          sx={{ width: 1/3, marginLeft: "auto", marginRight: "auto" }}
        >
            <ChatOnline 
            allUsersConversations={conversations}
            onlineUsers={onlineUsers} 
            currentUserEmail={userEmail} 
            setCurrentChat={setCurrentChat}
            />
        </Box>


        </Box>
        </>
    )
};

export default Messenger;