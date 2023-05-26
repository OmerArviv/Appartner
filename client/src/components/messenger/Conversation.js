import { Avatar, Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState, useContext } from "react";
import {getUserByEmail} from "../../controller/authenticationController";
import { authContext } from "../../APP/Utils";
import {getUserProfileByEmail} from "../../controller/userProfileController";

function Conversation(props){
    const conversation=props.conversation;
    const { userEmail } = useContext(authContext);
    const [chatPerson, setChatPerson]=useState(null);
    // const [user, setUser]=useState(null);
    const [chatPersonUserProfile, setChatPersonUserProfile] = useState("");


    useEffect(()=>{
        // getUser();
        getChatPerson();
        // getChatPersonUserProfile();
    },[conversation,userEmail]);

    const getChatPerson= async ()=>{
        if(userEmail){
            if(userEmail==conversation.welcomer_email){
                setChatPerson(conversation.looker_email);
                const res= await getUserProfileByEmail(conversation.looker_email);
                if(res){
                  setChatPersonUserProfile(res); 
                }
                // const res=await getUserByEmail(conversation.looker_email)
                // if(res){
                //     setChatPerson(conversation.looker_email);
                // }
            }else{
                setChatPerson(conversation.welcomer_email);
                const res1= await getUserProfileByEmail(conversation.welcomer_email);
                if(res1){
                    setChatPersonUserProfile(res1); 
                }
                // const res=await getUserByEmail(conversation.welcomer_email)
                // if(res){
                //     setChatPerson(conversation.looker_email);
                // }
            }
         
            
        }
    }

    //   const getUser= async ()=>{
    //     const res= await getUserByEmail(userEmail);
    //     if(res){
    //       setUser(res); 
    //     }
    //   }


return(
    <Stack direction="row" sx={{cursor:"pointer"}}>
        {chatPerson && chatPersonUserProfile? (
        <>
        <Avatar sx={{mt:1}} alt="profile image" src={chatPersonUserProfile.user_profile_image}/>
        <Typography sx={{mt:2, ml:1, fontWeight:"500"}}>
            {chatPerson}
        </Typography>
        </>) :("")}
        
    </Stack>
)

};

export default Conversation;