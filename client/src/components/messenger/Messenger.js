import "./messenger.css";
import { Box, TextField, Button, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Conversation from "./Conversation";
import Message from "./Message";
import ChatOnline from "./ChatOnline";
import { authContext } from "../../APP/Utils";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import {getUserByEmail} from "../../controller/authenticationController";
import {getConversationsByUserEmail} from "../../controller/conversationController";
import {getMessagesConversationById} from "../../controller/messageController";

function Messenger(){
  const { userEmail } = useContext(authContext);
  const [user, setUser]=useState(null);
  const [conversations, setConversations]=useState([]);
  const [currentChat, setCurrentChat]=useState(null);
  const [chatMessages, setChatMessages]=useState(null);

  useEffect(()=>{
    getUser();
  },[]);

  useEffect(()=>{
    getUserConversations();
  },[userEmail]);

  useEffect(()=>{
    getMessagesConversation();
  },[currentChat]);


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
        console.log(res.data);
      }
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
                    <div  key={index} onClick={()=>{setCurrentChat(con);console.log(currentChat)}}>
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
                  sx={{height:"100%", overflowY:"auto", scrollbarGutter:"stable && both-edges", paddingRight:"10px"}}
                  >
                    {chatMessages? 
                    (chatMessages.map((mes,index)=>{
                      return(
                        <Message key={index} message={mes} own={mes.sender_email===userEmail}/>
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
                    />
                    <Button>
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
            <ChatOnline/>
        </Box>


        </Box>
        </>
    )
};

export default Messenger;