import { Avatar, Typography, Stack, Box } from "@mui/material";
import {format} from "timeago.js";
import {getUserProfileByEmail} from "../../controller/userProfileController";

function Message(props){
    const message=props.message;
    const own=props.own;
    const currentChat=props.currentChat;
    const userEmail=props.userEmail;
    return(
        <>
        <Box sx={{mt:"20px"}}>
        <Stack direction="row" spacing={2}>
        
       {own? ( 
       <Box sx={{display:"flex", flexDirection:"row-reverse"}}>
        <Typography 
            sx={{  
            padding:"10px",
            marginTop:3,
            borderRadius:"18px",
            backgroundColor:"lightGrey",
            color:"black",
            maxWidth:"500px", 
            alignItems:"end",
            alignContent:"end", 
            justifyContent:"right",
            justifyItems:"flex-end"
        }}>
            {message? message.text : ""}
        </Typography>
       </Box>
        ) : ( 
            <>
        <Avatar sx={{mt:1}}/>
        <Box sx={{display:"flex"}}>
        <Typography 
        sx={{
            padding:"10px",
            marginTop:3,
            borderRadius:"18px",
            backgroundColor:"#1877f2",
            color:"white",
            maxWidth:"300px"
        }}>
             {message? message.text : ""}
        </Typography>
        </Box>
        </>) }
       
        </Stack>
        <Typography 
        sx={{
        fontSize:"12px", 
        mt:"10px"
    }}>
            {format(message? message.createdAt:"")}
        </Typography>
        </Box>
        </>
    
    
    )
};

export default Message;