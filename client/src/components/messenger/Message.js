import { Avatar, Typography, Stack, Box } from "@mui/material";
import { format } from "timeago.js";
import { getUserProfileByEmail } from "../../controller/userProfileController";
import { useEffect, useState } from "react";

function Message(props) {
  const message = props.message;
  const own = props.own;
  const currentChat = props.currentChat;
  const userEmail = props.userEmail;
  const chatPerson = props.chatPerson;
  const [chatPersonUserProfile, setChatPersonUserProfile] = useState(null);

  useEffect(() => {
    getChatUserProfile();
  }, [chatPerson]);

  const getChatUserProfile = async () => {
    if (chatPerson) {
      const res = await getUserProfileByEmail(chatPerson);
      if (res) {
        setChatPersonUserProfile(res);
      }
    }
  };

  return (
    <>
      {/* <Box sx={{mt:"20px"}}> */}

      {own ? (
        <>
          {/* <Stack direction="column-reverse" spacing={2}> */}

          <Box
            sx={{
              display: "flex",
              flexWrap: "warp",
              justifyContent: "flex-end",
            }}
          >
            <Typography
              sx={{
                padding: "10px",
                marginTop: 3,
                borderRadius: "18px",
                backgroundColor: "lightGrey",
                color: "black",
                maxWidth: "100%",
                overflow: "hidden",
                wordWrap: "break-word",
              }}
            >
              {message ? message.text : ""}
            </Typography>
            <Typography
              sx={{
                padding: "10px",
                // marginTop:3,
                maxWidth: "500px",
                fontSize: "12px",
                mt: "30px",
              }}
            >
              {format(message ? message.createdAt : "")}
            </Typography>
          </Box>

          {/* </Stack> */}
        </>
      ) : (
        <>
          <Stack direction="row" spacing={2}>
            <Avatar
              sx={{ mt: 1 }}
              src={
                chatPersonUserProfile
                  ? chatPersonUserProfile.user_profile_image
                  : ""
              }
            />
            <Box sx={{ display: "flex", maxWidth: "400px" }}>
              <Typography
                sx={{
                  padding: "10px",
                  marginTop: 3,
                  borderRadius: "18px",
                  backgroundColor: "#1877f2",
                  color: "white",
                  maxWidth: "100%",
                  overflow: "hidden",
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                }}
              >
                {message ? message.text : ""}
              </Typography>
            </Box>
          </Stack>
          <Typography
            sx={{
              fontSize: "12px",
              mt: "10px",
            }}
          >
            {format(message ? message.createdAt : "")}
          </Typography>
        </>
      )}

      {/*        
        <Typography 
        sx={{
        fontSize:"12px", 
        mt:"10px"
    }}>
            {format(message? message.createdAt:"")}
        </Typography> */}
      {/* </Box> */}
    </>
  );
}

export default Message;
