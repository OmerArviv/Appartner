import { Avatar, Button, Typography } from "@mui/material";
import { getUserProfileByEmail } from "../controller/userProfileController";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  IconButton,
  Grid,
} from "@mui/material";
import UserProfile from "../pages/UserProfile";

function RoomateAvatar(props) {
  const { email } = props;
  const [roomate, setRoomate] = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    getRoomatesDetails();
  }, []);

  const getRoomatesDetails = async () => {
    const res = await getUserProfileByEmail(email);
    if (res) {
      setRoomate(res);
    }
  };

  const handleCloseProfile = () => {
    setModal(false);
  };

  return (
    <div>
      {roomate ? (
        <div>
          <Button 
            onClick={() => {
              setModal(true);
            }}
          >
            <Avatar
              src={roomate.user_profile_image}
              sx={{ width: 75, height: 75 }}
            />
          </Button>
          <Typography>{roomate.email}</Typography>
          <Dialog maxWidth="lg" open={modal} onClose={handleCloseProfile}>
            <DialogTitle textAlign="center">Roomate Details</DialogTitle>
            <UserProfile email={roomate.email} />
          </Dialog>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default RoomateAvatar;
