import "./messenger.css";
import { Box, TextField, Button, Typography, Autocomplete, Divider, IconButton, Stack } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
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
  const [onlineUsers, setonlineUsers]=useState([]);
  const [membersEmail, setMembersEmail]=useState([]);
  const [searchMembers, setSearchMembers] = useState("");
const [options, setOptions] = useState([]);

  const socket=useRef(null);
  const scrollRef=useRef(); // to show the last message that sent
  
   const reciverId= ()=>{
    var reciver_email=null;
    if(user.role==="Welcomer"){
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
    getAllMembers();
  },[conversations,user]);

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
    });
  },[]);
  
  
  useEffect(()=>{
    arrivalMessage && (currentChat?.looker_email ===arrivalMessage.sender_email || currentChat?.welcomer_email ===arrivalMessage.sender_email) && 
    setChatMessages(prev=>[...prev, arrivalMessage]);
  },
  [arrivalMessage,currentChat]);

  useEffect(()=>{
    handleSearch();
    },[searchMembers,options,user,conversations]);

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
      console.log(res);
      setChatMessages([...chatMessages, res.data]);
      setNewMessage("");
    }
   
  }catch(err){
    console.log(err);
  }
}

const getAllMembers= ()=>{
  var tmpMembers=[];
  if(user && conversations){
    if(user.role==="Welcomer"){
      conversations.forEach(item => {
        tmpMembers.push(item.looker_email);
      }); 
    }
    else{
      conversations.forEach(item => {
        tmpMembers.push(item.welcomer_email);
      }); 
    }
      setMembersEmail(tmpMembers);
    }
}

const handleSearchChange = (event, value) => {
  setSearchMembers(value);
  if(value==""){
    setOptions([]);
  }
};

const handleSearch = (event, value) => {
  if(searchMembers){
    var filteredOptions=[];
      if(user.role==="Welcomer"){
        filteredOptions= conversations.filter(c=> 
          c.looker_email.startsWith(searchMembers));
      }
      else{
        filteredOptions= conversations.filter(c=> 
          c.welcomer_email.startsWith(searchMembers));
      }
    
    setOptions(filteredOptions);
  }
  else{
    setOptions(conversations);
  }
  
};

    return(
        <>

        {/*MUI */}
        <Box
        container="true"
        // spacing={50}
        xs={12}
        sx={{ display: "flex", flexWrap: "wrap", margin: "10px", marginTop:3,justifyContent:"center", }}
        >
        <Box
          item="true"
          component="div"
          xs={4}
          sx={{ width: 1/3, marginLeft: "auto", marginRight: "auto" }}
        >
           <Typography align="center"
            sx={{backgroundColor:"#d2f7d8",fontWeight:"bold",marginRight:1}}>
              MEMBERS
              </Typography>
              <Box item="true"
                    sx={{display:"flex", flexWarp:"warp", alignItems:"center", justifyContent:"space-between"}}>
                  <Autocomplete
                  fullWidth
                    freeSolo
                    options={membersEmail? membersEmail :""}
                    inputValue={searchMembers}
                    onInputChange={handleSearchChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Search for rommates.."
                        variant="standard"
                        size="small"
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: <SearchIcon />,
                        }}
                      />
                    )}
                  />
                  {/* <IconButton onClick={handleSearch}>
                  <SearchIcon />

                  </IconButton> */}
                    </Box>
                 
            
            {/* <TextField id="search" label="Search" variant="standard"
             InputProps={{
                startAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              // renderInput={membersEmail}
              size="small"
              placeholder="serch for rommates..."
              /> */}

              
          {options  ? 
                        (
                          options.map((con,index)=>{
                            return(
                              <div  key={index} onClick={()=>{setCurrentChat(con);}}>
                              <Conversation key={index} conversation={con} user={user} currentChat={currentChat}/>
                              </div>

                      ) })): ("" )}
                        



          {/* 
              {options  ? 
              (
                options.map((con,index)=>{
                  return(
                    <div  key={index} onClick={()=>{setCurrentChat(con);}}>
                      {console.log("in options")}
                     <Conversation key={index} conversation={con} user={user}/>
                     </div>

             ) })): (
              conversations?.map((con,index)=>{
                return(
                  <div  key={index} onClick={()=>{setCurrentChat(con);}}>
                                          {console.log("in conversation")}

                   <Conversation key={index} conversation={con} user={user}/>
                   </div>

           ) })

             )} */}

{/* {conversations? 
              (
                conversations.map((con,index)=>{
                  return(
                    <div  key={index} onClick={()=>{setCurrentChat(con);}}>
                     <Conversation key={index} conversation={con} user={user}/>
                     </div>

             ) })): ""} */}
              
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

            <Typography align="center"
            sx={{backgroundColor:"#d2f7d8",fontWeight:"bold"}}>
              CHAT
              </Typography>

                  <Box item="true"
                  sx={{height:"450px", 
                  overflowY:"scroll",
                  scrollbarWidth: "thin",
                  "&::-webkit-scrollbar": {
                    width: "6px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    borderRadius: "3px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  },
                 }}/*scrollbarGutter:"stable && both-edges", paddingRight:"10px"} */
                  ref={scrollRef}
                  >
                    {chatMessages? 
                    (chatMessages.map((mes,index)=>{
                      return(
                        // <div key={index} ref={scrollRef} 
                        // style={{maxHeight: "300px", overflowY:"auto"}}
                        // >
                            <div key={index}
                        // style={{maxHeight: "300px", overflowY:"auto"}}
                        >
                           <Message key={index} message={mes} own={mes? mes.sender_email===userEmail : ""}
                           currentChat={currentChat}
                           userEmail={userEmail}
                           chatPerson={reciverId()}
                           />
                        </div>
                       
                      )
                    })):""}
                  </Box>
                  {/*Bottom area- sending message */}
                    <Box item="true"
                    sx={{mt:"20px", display:"flex", flexWarp:"warp", alignItems:"center", justifyContent:"space-between"}}>
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