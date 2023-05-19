import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  Stack,
  Grid,
  CardActionArea,
  Divider,
  Button,
  Tooltip,
  Dialog,
  DialogTitle,
} from "@mui/material";
import ApartmentListItem from "./ApartmentListItem";
import {
  getAllAppartments,
  getAllAppartmentsAndRoomateDetails,
  getAppartmentById,
} from "../controller/appartmentController";
import FindMatchesButton from "./FindMatchesButton";
import { getBestMatchesCgptApi } from "../controller/RoomateRequestController";
import UserProfile from "../pages/UserProfile";
import { authContext } from "../APP/Utils";

const btnstyle = {
  background: "#4F4E51",
  color: "#D0D2D8",
};

function ApartmentList() {
  const [appartments, setAppartments] = useState(null);
  const [matchedApartments, setMatchedApartments] = useState([]);
  const [modalPref, setModalPref] = useState(false);
  const { userEmail } =
    useContext(authContext);

  useEffect(() => {
    setAllAppartments();
  }, []);

  const setAllAppartments = async () => {
    const res = await getAllAppartments();
    if (res) {
      setAppartments(res);
    }
  };

  const handleCloseProfile = () => {
    setModalPref(false);
  };

  const handleMatchedApartments = (apartments) => {
    setMatchedApartments(apartments);
  };

  const handleFindMatches = async () => {
    const getAllAppartments = await getAllAppartmentsAndRoomateDetails();
    console.log(getAllAppartments);
    const user = {
      email: "omer123@gmail.com",
      Birthday_date: "22",
      user_employment: "teswt",
      smoking: "No",
      pets: "Yes",
      gender: "Female",
      alcohol: "Yes",
      kosher: "Yes",
      hobby: "sdfdsfs",
      user_additonal_information: "",
      user_facebook_link: "",
      user_instagram_link: "",
      user_profile_image: "s",
      location: "sfsdfs",
    };

    const mergedData = {
      user: user,
      apartments: getAllAppartments,
    };

    try {
      const res = await getBestMatchesCgptApi(mergedData);
      if (res && res.status == 200) {
        const apartment = await getAppartmentById(res.data[0]);

        if (apartment && apartment.status == 200) {
          setAppartments([apartment.data]);
        } else {
          alert("something went wrong");
        }
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          m: 5,
        }}
      >
        <Button
          variant="contained"
          onClick={handleFindMatches}
          style={{ ...btnstyle, marginRight: '20px' }}
        >
          Find the Best Matches
        </Button>
        <Stack>
          <Tooltip title="Your Profile" disableInteractive>
            <Button
              variant="contained"
              onClick={() => {
                setModalPref(true);
              }}
              style={btnstyle}
            >
              Set Your Preferences
            </Button>
          </Tooltip>
          <Dialog maxWidth="lg" open={modalPref} onClose={handleCloseProfile}>
            <DialogTitle textAlign="center">
              Your Profile
            </DialogTitle>
            <UserProfile email={userEmail ? userEmail : ""} />
          </Dialog>
        </Stack>
      </Box>

      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          display: "inline-flex",
          flexDirection: "column",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          sx={{ justifyContent: "center" }}
          alignItems="center"
          flexWrap="wrap"
        >
          {matchedApartments.length > 0
            ? matchedApartments.map((item, index) => (
              <Box
                key={index}
                component="div"
                sx={{ display: "inline", marginRight: "auto" }}
              >
                <ListItem>
                  <ApartmentListItem data={item} />
                </ListItem>
              </Box>
            ))
            : appartments
              ? appartments.map((item, index) => (
                <Box
                  key={index}
                  component="div"
                  sx={{ display: "inline", marginRight: "auto" }}
                >
                  <ListItem>
                    <ApartmentListItem data={item} />
                  </ListItem>
                </Box>
              ))
              : ""}
        </Stack>
      </List>
    </>
  );
}

export default ApartmentList;
