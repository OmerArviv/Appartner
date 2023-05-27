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
  ListItemText,
} from "@mui/material";
import ApartmentListItem from "./ApartmentListItem";
import {
  getAllAppartments,
  getAllAppartmentsAndRoomateDetails,
  getAppartmentById,
} from "../controller/appartmentController";
import FilterSection from "./FilterSection";
import UserProfile from "../pages/UserProfile";
import { authContext } from "../APP/Utils";
import SetPreferncesProfile from "../pages/SetPreferncesProfile";
import axios from "axios";
import {
  convWithChatGpt,
  getBestMatchesCgptApi,
  shortcutWithChatGpt,
} from "../controller/chatGptController";

const btnstyle = {
  background: "#4F4E51",
  color: "#D0D2D8",
};

function ApartmentList() {
  const [appartments, setAppartments] = useState(null);
  const [allAppartments, setAllAppartmentsNoFilter] = useState(null);
  const [matchedApartments, setMatchedApartments] = useState([]);
  const [modalPref, setModalPref] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [userMessage, setUserMessage] = useState("");

  const { userEmail } = useContext(authContext);

  const apartments_array = [];

  useEffect(() => {
    setAllAppartments();
  }, []);

  const setAllAppartments = async () => {
    const res = await getAllAppartments();
    if (res) {
      setAppartments(res);
      setAllAppartmentsNoFilter(res);
    }
  };

  const handleCloseProfile = () => {
    setModalPref(false);
  };

  const handleMatchedApartments = (apartments) => {
    setMatchedApartments(apartments);
  };

  const sendMessage = async (message) => {
    const getAllAppartments = await getAllAppartmentsAndRoomateDetails();

    const userMessage = { role: "user", content: message };
    const apartmentData = { user: message, apartments: getAllAppartments };

    setConversation([...conversation, userMessage]);

    try {
      const res = await convWithChatGpt(apartmentData);

      if (res && res.status == 200) {
        for (let i = 0; i < res.data.length; i++) {
          const apartment = await getAppartmentById(res.data[0]._id);
          apartments_array.push(apartment.data);
        }
        console.log(apartments_array);

        setAppartments(apartments_array);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFindMatches = async () => {
    //צריך להוסיף את הפונקציה של הלקוח
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

  const handleUserMessageChange = (event) => {
    setUserMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (userMessage.trim() !== "") {
      sendMessage(userMessage);
      setUserMessage("");
    }
  };

  const handleCreateShortcut = async () => {
    const getAllAppartments = await getAllAppartmentsAndRoomateDetails();
    const res = await shortcutWithChatGpt(getAllAppartments);

    const data = [];

    if (res && res.status == 200) {
      for (let i = 0; i < res.data.length; i++) {
        let name = "omer";
        data.push({
          name: name,
          summary: res.data[i].summary,
        });
      }
    } else {
      alert("something went wrong");
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
          onClick={handleCreateShortcut}
          style={{ ...btnstyle, marginRight: "20px" }}
        >
          SHORTCUT ON THE APARTMENTS
        </Button>
        <Button
          variant="contained"
          onClick={handleFindMatches}
          style={{ ...btnstyle, marginRight: "20px" }}
        >
          Find the Best Matches
        </Button>
        <Stack>
          <Button
            variant="contained"
            onClick={() => {
              setModalPref(true);
            }}
            style={btnstyle}
          >
            Set Your Preferences
          </Button>
          <Dialog maxWidth="lg" open={modalPref} onClose={handleCloseProfile}>
            <DialogTitle textAlign="center">Change Your Prefernces</DialogTitle>
            <SetPreferncesProfile
              handleCloseProfile={handleCloseProfile}
              propEmail={userEmail ? userEmail : ""}
            />
          </Dialog>
        </Stack>
      </Box>
      <FilterSection
        appartments={appartments}
        setAppartments={setAppartments}
        allAppartments={allAppartments}
      ></FilterSection>
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          m: 5,
        }}
      >
        <input
          type="text"
          value={userMessage}
          onChange={handleUserMessageChange}
        />
        <button onClick={handleSendMessage}>Send</button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          m: 5,
        }}
      >
        <List>
          {conversation.map((message, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemText
                primary={message.role === "user" ? "You" : "Chatbot"}
                secondary={message.content}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
}

export default ApartmentList;
