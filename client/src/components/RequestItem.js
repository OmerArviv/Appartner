import {
  Button,
  Avatar,
  Typography,
  Dialog,
  Grid,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { getUserProfileByEmail } from "../controller/userProfileController";
import UserProfile from "../pages/UserProfile";

const RequestItem = () => {
  const [modal, setModal] = useState(false);
  const [name, setname] = useState("");
  const handleCloseProfile = () => {
    setModal(false);
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
          src="https://images.squarespace-cdn.com/content/v1/522b327ee4b0673919bbe57a/1551246048479-DN3TH6PYE3PKCPDGMVNH/%D7%A0%D7%95%D7%A2%D7%94-%D7%9C%D7%A4%D7%99%D7%93%D7%95%D7%AA_01_1500.jpg"
          sx={{ width: 100, height: 100 }}
          onClick={() => {
            setModal(true);
          }}
        />
      </Grid>
      <Dialog maxWidth="lg" open={modal} onClose={handleCloseProfile}>
        <DialogTitle textAlign="center">Roomate Details</DialogTitle>
        <UserProfile email={getUserProfileByEmail}></UserProfile>
      </Dialog>
      <Grid item xs={2} sx={{ textAlign: "left" }}>
        <Typography sx={{ fontSize: "25px" }}>Oriya Atar</Typography>
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
