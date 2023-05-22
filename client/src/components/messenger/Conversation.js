import { Avatar, Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";


function Conversation(props){


return(
    <Stack direction="row" sx={{cursor:"pointer"}}>
        <Avatar sx={{mt:1}} />
        <Typography sx={{mt:2, ml:1, fontWeight:"500"}}>
            user name
        </Typography>
    </Stack>
)

};

export default Conversation;