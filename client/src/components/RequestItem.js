import {
  Button,
  Avatar,
  Typography,
  Dialog,
  Grid,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getUserProfileByEmail } from "../controller/userProfileController";
import UserProfile from "../pages/UserProfile";

const RequestItem = (props) => {
  const { request } = props;
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState("");
  const handleCloseProfile = () => {
    setModal(false);
  };

  const getUser = async () => {
    const res = await getUserProfileByEmail(request.user_email);
    if (res) {
      setUser(res);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

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
        <DialogTitle textAlign="center">Roomate Details</DialogTitle>
        <UserProfile email={user.email}></UserProfile>
      </Dialog>
      <Grid item xs={2} sx={{ textAlign: "left" }}>
        <Typography sx={{ fontSize: "25px" }}>{user.email}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Button
          sx={{
            width: "100px",
            background: "#B9E3A4",
            height: "50px",
            color: "black",
            marginRight: "15px",
          }}
          //   onClick={onAcceptHandler}
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
          //   onClick={onIgnoretHandler}
        >
          IGNORE
        </Button>
      </Grid>
    </Grid>
  );
};

export default RequestItem;
