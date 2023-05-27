import { Box, Avatar, Badge, Stack, Typography } from "@mui/material";
import { getUserByEmail } from "../../controller/authenticationController";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { getUserProfileByEmail } from "../../controller/userProfileController";
import { getConversationsByUserEmail } from "../../controller/conversationController";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

function ChatOnline(props) {
  const allUsersConversations = props.allUsersConversations;
  const onlineUsers = props.onlineUsers;
  const userEmail = props.currentUserEmail;
  var membersEmail = [];
  const [user, setUser] = useState(null);
  const [members, setMembers] = useState(null);
  const [onlineMembers, setOnlineMembers] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getAllMembers();
  }, [user, allUsersConversations]);

  // useEffect(()=>{
  //   setOnlineMembers(members?.filter(m=>onlineMembers.includes(m.email)));
  // },[members, onlineMembers]);

  useEffect(() => {
    getOnlineMembers();
  }, [members, onlineUsers]);

  const getUser = async () => {
    const res = await getUserByEmail(userEmail);
    if (res) {
      setUser(res);
    }
  };

  const getAllMembers = async () => {
    if (user && allUsersConversations) {
      if (user.role === "Welcomer") {
        allUsersConversations.forEach((item) => {
          membersEmail.push(item.looker_email);
        });
      } else {
        allUsersConversations.forEach((item) => {
          membersEmail.push(item.welcomer_email);
        });
      }
      if (membersEmail) {
        var tmpMembers = [];
        for (let i = 0; i < membersEmail.length; i++) {
          var member = await getUserProfileByEmail(membersEmail[i]);
          if (member) {
            tmpMembers.push(member);
          }
        }
        setMembers(tmpMembers);
      }
    }
  };
  console.log();
  const getOnlineMembers = () => {
    if (members) {
      setOnlineMembers(
        members?.filter((m, i) =>
          onlineUsers?.some((onlineMember) => onlineMember.userId === m.email)
        )
      );
    }
  };

  const clickHandler = (user) => {
    allUsersConversations?.filter((c) => {
      if (c.looker_email === user.email && c.welcomer_email === userEmail) {
        props.setCurrentChat(c._id);
      } else if (
        c.welcomer_email === user.email &&
        c.looker_email === userEmail
      ) {
        props.setCurrentChat(c._id);
      }
    });
  };

  return (
    <>
      {/*ChatOnline rommates */}
      <Typography>ONLINE MEMBERS</Typography>

      <Box
        container="true"
        sx={{
          mt: "20px",
          display: "flex",
          alignItems: "center",
          fontWeight: "500",
          cursor: "pointer",
          ml: 4,
        }}
      >
        {onlineMembers
          ? onlineMembers.map((o, index) => {
              {
                /*Chat online image */
              }
              return (
                <Box
                  item="true"
                  sx={{ objectFit: "cover", position: "relative" }}
                  key={index}
                  component="div"
                  onClick={() => {
                    clickHandler(o, index);
                  }}
                >
                  <Stack key={index} direction="row" spacing={4}>
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      variant="dot"
                    >
                      <Avatar
                        key={index}
                        alt="user profile image"
                        src={o ? o.user_profile_image : ""}
                      />
                    </StyledBadge>
                    <Typography sx={{ marginTop: 5 }}>{o.email}</Typography>
                  </Stack>
                </Box>
              );
            })
          : ""}
      </Box>
    </>
  );
}

export default ChatOnline;
