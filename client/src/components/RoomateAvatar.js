import { Avatar, Button, Typography } from "@mui/material";
import { getUserProfileByEmail } from "../controller/userProfileController";
import { useEffect, useState } from "react";
import { Dialog, DialogTitle } from "@mui/material";
import UserProfile from "../pages/UserProfile";

function RoomateAvatar(props) {
  const { email } = props;
  const [roomate, setRoomate] = useState(null);
  const [roomateImage, setRoomateImage] = useState(
    "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-0.jpg"
  );
  const [modal, setModal] = useState(false);

  useEffect(() => {
    getRoomatesDetails();
  }, [email]);

  const getRoomatesDetails = async () => {
    const res = await getUserProfileByEmail(email);
    if (res) {
      setRoomate(res);
      setRoomateImage(res.user_profile_image);
    }
  };

  const handleImageError = (event) => {
    setRoomateImage(
      "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-0.jpg"
    );
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
              src={roomateImage}
              sx={{ width: 65, height: 65 }}
              onError={handleImageError}
            />
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            {roomate.full_name}
          </Typography>
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
