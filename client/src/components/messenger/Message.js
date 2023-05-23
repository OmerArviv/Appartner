import { Avatar, Typography, Stack, Box } from "@mui/material";


function Message(props){
    const message=props.message;
    const own=props.own;
    return(
        <>
        <Box sx={{mt:"20px", display:"flex"}}>
        <Stack direction="row" spacing={2}>
        
       {own? ( <Typography 
        sx={{
            padding:"10px",
            marginTop:3,
            borderRadius:"18px",
            backgroundColor:"#1877f2",
            color:"white",
            maxWidth:"300px"
        }}>
            {message? message.text : ""}
        </Typography>) : ( 
            <>
        <Avatar sx={{mt:1}} />
        <Typography 
        sx={{
            padding:"10px",
            marginTop:3,
            borderRadius:"18px",
            backgroundColor:"lightGrey",
            color:"black",
            maxWidth:"300px", 
            alignItems:"flex-end"
        }}>
             {message? message.text : ""}
        </Typography></>) }
       
        </Stack>
        <Typography 
        sx={{
        fontSize:"12px", 
        mt:"10px"
    }}>
            1 hour ago
        </Typography>
        </Box>
        </>
    
    
    )
};

export default Message;