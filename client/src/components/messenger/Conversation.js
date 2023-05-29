import { Avatar, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState, useContext } from "react";
import { authContext } from "../../APP/Utils";
import { getUserProfileByEmail } from "../../controller/userProfileController";
import { googleFonts } from "google-fonts";

function Conversation(props) {
  const conversation = props.conversation;
  const currentChat = props.currentChat;
  const nameFont =
    "https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap";
  const { userEmail } = useContext(authContext);
  const [chatPerson, setChatPerson] = useState(null);
  // const [user, setUser]=useState(null);
  const [chatPersonUserProfile, setChatPersonUserProfile] = useState("");

  useEffect(() => {
    // getUser();
    getChatPerson();
    // getChatPersonUserProfile();
  }, [conversation, userEmail]);

  const getChatPerson = async () => {
    if (userEmail) {
      if (userEmail == conversation.welcomer_email) {
        setChatPerson(conversation.looker_email);
        const res = await getUserProfileByEmail(conversation.looker_email);
        if (res) {
          setChatPersonUserProfile(res);
        }
      } else {
        setChatPerson(conversation.welcomer_email);
        const res1 = await getUserProfileByEmail(conversation.welcomer_email);
        if (res1) {
          setChatPersonUserProfile(res1);
        }
      }
    }
    // const res=await getUserByEmail(conversation.welcomer_email)
    // if(res){
    //     setChatPerson(conversation.looker_email);
    // }
  };

  //   const getUser= async ()=>{
  //     const res= await getUserByEmail(userEmail);
  //     if(res){
  //       setUser(res);
  //     }
  //   }

  return (
    <>
      {currentChat?._id === conversation?._id ? (
        <Stack direction="row" sx={{ cursor: "pointer", marginTop: 2 }}>
          {chatPerson && chatPersonUserProfile ? (
            <>
              <Avatar
                alt="profile image"
                src={chatPersonUserProfile.user_profile_image}
                sx={{ height: 45, width: 45 }}
              />
              <Stack
                direction="column"
                sx={{
                  width: "95%",
                  cursor: "pointer",
                  borderRadius: 2,
                  borderRadius: 2,
                  backgroundColor: "lightgray",
                  marginRight: 2,
                }}
              >
                <Typography
                  sx={{
                    marginLeft: 1,
                    fontSize: "20px",
                    marginTop: "auto",
                    marginBottom: "auto",
                  }}
                >
                  {chatPersonUserProfile.full_name}
                </Typography>
                <Typography
                  sx={{
                    marginLeft: 1,
                    fontSize: "12px",
                    borderRadius: 2,
                    marginTop: "auto",
                    marginBottom: "auto",
                  }}
                >
                  {chatPersonUserProfile.email}
                </Typography>
              </Stack>
            </>
          ) : (
            ""
          )}
        </Stack>
      ) : (
        <Stack direction="row" sx={{ cursor: "pointer", marginTop: 2 }}>
          {chatPerson && chatPersonUserProfile ? (
            <>
              <Avatar
                alt="profile image"
                src={chatPersonUserProfile.user_profile_image}
                sx={{ height: 45, width: 45 }}
              />
              <Stack
                direction="column"
                sx={{
                  width: "95%",
                  cursor: "pointer",
                  borderRadius: 2,
                  borderRadius: 2,
                  marginRight: 2,
                }}
              >
                <Typography
                  sx={{
                    marginLeft: 1,
                    fontSize: "20px",
                    marginTop: "auto",
                    marginBottom: "auto",
                  }}
                >
                  {chatPersonUserProfile.full_name}
                </Typography>
                <Typography
                  sx={{
                    marginLeft: 1,
                    fontSize: "12px",
                    borderRadius: 2,
                    marginTop: "auto",
                    marginBottom: "auto",
                  }}
                >
                  {chatPersonUserProfile.email}
                </Typography>
              </Stack>
            </>
          ) : (
            ""
          )}
        </Stack>
      )}
    </>
  );
}

export default Conversation;
