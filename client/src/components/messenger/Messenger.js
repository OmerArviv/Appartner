import "./messenger.css";
import { Box, TextField, Button } from "@mui/material";
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


function Messenger(){
  const { userEmail } = useContext(authContext);
  const [user, setUser]=useState(null);
  const [conversations, setConversations]=useState([]);
  const [currentChat, setCurrentChat]=useState([]);

  useEffect(()=>{
    getUser();
  },[]);

  useEffect(()=>{
    getUserConversations();
  },[userEmail]);

  // useEffect(()=>{
  //   getUserConversations();
  // },[user._id]);


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
                  return(<Conversation key={index} conversation={con} user={user}/>)
              })): "You don't have activate conversation"}
        </Box>
        <Box
          item="true"
          component="form"
          xs={4}
          sx={{ width: 1/3, marginLeft: "auto", marginRight: "auto" }}
        >
           {/*Top area- the messages */}

          <Box item="true"
          sx={{height:"100%", overflowY:"auto", scrollbarGutter:"stable && both-edges", paddingRight:"10px"}}
          >
          <Message own={true}/>
            <Message own={false}/>
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
          </Box>

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