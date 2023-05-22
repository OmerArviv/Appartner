import { Avatar, Typography, Stack, Box } from "@mui/material";


function Message({own}){
    return(
        <>
        <Box sx={{mt:"20px"}}>
        <Stack direction="row" spacing={2}>
        <Avatar sx={{mt:1}} />
       {own? ( <Typography 
        sx={{
            padding:"10px",
            marginTop:3,
            borderRadius:"18px",
            backgroundColor:"#1877f2",
            color:"white",
            maxWidth:"300px"
        }}>
            this is my message
        </Typography>) : ( <Typography 
        sx={{
            padding:"10px",
            marginTop:3,
            borderRadius:"18px",
            backgroundColor:"lightGrey",
            color:"black",
            maxWidth:"300px", 
            alignItems:"flex-end"
        }}>
            this is not my messeage
        </Typography>) }
       
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