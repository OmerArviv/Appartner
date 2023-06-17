import {
  Button,
  Avatar,
  Typography,
  Dialog,
  Grid,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { getUserProfileByEmail } from "../controller/userProfileController";
import UserProfile from "../pages/UserProfile";
import { updateRoomateRequest } from "../controller/RoomateRequestController";
import { getUserByEmail } from "../controller/authenticationController";
import ContactPhoneOutlinedIcon from "@mui/icons-material/ContactPhoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { createConversation } from "../controller/conversationController";
import { authContext } from "../APP/Utils";

const RequestItem = (props) => {
  const { request } = props;
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState("");
  const [userName, setUserName] = useState("");
  // const [lookerRequestEmail, setLookerRequestId] = useState("");
  const [status, setStatus] = useState(request.status); // New state variable
  const [phoneNumber, setPhoneNumber] = useState(""); // New state variable for phone
  const [showChatButton, setShowChatButton] = useState(false);
  const { userEmail, setNavBarStatus, navBarStatus } = useContext(authContext);

  const handleCloseProfile = () => {
    setModal(false);
  };

  const getUser = async () => {
    const res = await getUserProfileByEmail(request.user_email);
    if (res) {
      setUser(res);
      const user_auth = await getUserByEmail(res.email);
      setPhoneNumber(user_auth.phone_number);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const onAcceptHandler = async () => {
    const updatedRequest = { ...request, status: "accepted" };
    try {
      const res = await updateRoomateRequest(updatedRequest);
      if (res) {
        setStatus("accepted"); // Update the status
        setShowChatButton(true); // Show the chat button
        createNewConversation();
        setNavBarStatus(navBarStatus + 1);
      } else {
        console.error("Failed to accept roommate request");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onIgnoreHandler = async () => {
    const updatedRequest = { ...request, status: "ignored" };
    try {
      const res = await updateRoomateRequest(updatedRequest);
      if (res) {
        console.log("Roommate request ignored successfully");
        setStatus("ignored"); // Update the status
        setNavBarStatus(navBarStatus + 1);
      } else {
        console.error("Failed to ignore roommate request");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const createNewConversation = async () => {
    const user_email = userEmail;
    const newConversation = {
      welcomer_email: user_email,
      looker_email: request.user_email,
    };
    const res = await createConversation(newConversation);
    if (res.status == 201) {
      console.log("add new conversation");
      console.log(res);
    } else if (res.status == 403) {
      console.log("Error occured!");
    } else {
      console.log("can't add new conversation");
    }
  };

  return (
    <Grid
      container
      sx={{ marginTop: "30px" }}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={1}>
        <Avatar
          alt="image1"
          src={user.user_profile_image}
          sx={{ width: 100, height: 100 }}
          onClick={() => {
            setModal(true);
          }}
        />
      </Grid>
      <Dialog maxWidth="lg" open={modal} onClose={handleCloseProfile}>
        <DialogTitle textAlign="center">Roommate Details</DialogTitle>
        <UserProfile email={user.email}></UserProfile>
      </Dialog>
      <Grid item xs={2} sx={{ textAlign: "left" }}>
        <Typography sx={{ fontSize: "25px" }}>{user.full_name}</Typography>
      </Grid>
      <Grid item xs={2} sx={{ marginLeft: "70px" }}>
        {status === "accepted" ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "100px",
                height: "50px",
                background: "#B9E3A4",
                color: "black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "5px",
              }}
              disabled
            >
              ACCEPTED
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <ContactPhoneOutlinedIcon
                sx={{ fontSize: 30, paddingLeft: "5px" }}
              />
              <Typography sx={{ paddingLeft: "5px", fontSize: "20px" }}>
                {phoneNumber}
              </Typography>
            </div>
          </div>
        ) : status === "ignored" ? (
          <div
            style={{
              width: "100px",
              height: "50px",
              background: "#EA8E8D",
              color: "black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
            }}
          >
            IGNORED
          </div>
        ) : (
          <>
            <Button
              sx={{
                width: "100px",
                background: "#B9E3A4",
                height: "50px",
                color: "black",
                marginRight: "10px",
              }}
              onClick={onAcceptHandler}
            >
              ACCEPT
            </Button>
            <Button
              sx={{
                width: "100px",
                background: "#EA8E8D",
                height: "50px",
                color: "black",
              }}
              onClick={onIgnoreHandler}
            >
              IGNORE
            </Button>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default RequestItem;
