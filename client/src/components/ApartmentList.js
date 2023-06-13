import React, { useContext, useEffect, useState } from "react";
import { Box, List, ListItem, Stack, Button, TextField } from "@mui/material";
import ApartmentListItem from "./ApartmentListItem";
import {
  getAllAppartments,
  getAllAppartmentsAndRoomateDetails,
  getAppartmentById,
} from "../controller/appartmentController";
import FilterSection from "./FilterSection";
import { authContext } from "../APP/Utils";
import {
  convWithChatGpt,
  getBestMatchesCgptApi,
  shortcutWithChatGpt,
} from "../controller/chatGptController";
import { getUserProfileByEmail } from "../controller/userProfileController";
import { getUserPreferncesByEmail } from "../controller/userProfilePreferncesController";
import { CircularProgress } from "@material-ui/core";

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
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

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
    const appartments = await getAppartmentsFiltered();

    const userMessage = { role: "user", content: message };
    const apartmentData = { user: message, apartments: appartments };

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

  const getAppartmentsFiltered = async () => {
    const data = [];
    for (let i = 0; i < appartments.length; i++) {
      let apartment = appartments[i];
      data.push({
        id: apartment._id,
        age_range: apartment.age_range,
        location: apartment.location.name,
        price_range: apartment.price_range,
        gender: apartment.gender,
        elevator: apartment.elevator,
        parking: apartment.parking,
        smoking: apartment.smoking,
      });
    }
    return data;
  };

  const handleFindMatches = async () => {
    setIsLoading(true);
    const user = await getUserProfileByEmail(userEmail);
    const user_per = await getUserPreferncesByEmail(userEmail);
    const apartments_data = await getAppartmentsFiltered();

    const mergedData = {
      user: {
        age: user.Birthday_date,
        smoking: user.smoking,
        gender: user.gender,
        age_range: user_per.age_range,
        location: user_per.location,
        price_range: user_per.price_range,
        elevator: user_per.elevator,
        parking: user_per.parking,
      },
      apartments: apartments_data,
    };

    console.log(mergedData);

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
    setIsLoading(false);
  };

  const handleUserMessageChange = (event) => {
    setUserMessage(event.target.value);
  };

  const handleSendMessage = () => {
    setIsLoading2(true);
    if (userMessage.trim() !== "") {
      sendMessage(userMessage);
      setUserMessage("");
    }
    setIsLoading2(false);
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
          onClick={handleFindMatches}
          style={{ ...btnstyle, marginRight: "20px" }}
        >
          {isLoading ? (
            <CircularProgress color="white" size={30} />
          ) : (
            "Find the Best Match !"
          )}
        </Button>
        <TextField
          sx={{ marginRight: "10px" }}
          type="text"
          placeholder="Filter By Text"
          value={userMessage}
          onChange={handleUserMessageChange}
        />
        <Button
          style={btnstyle}
          sx={{ height: "55px" }}
          onClick={handleSendMessage}
        >
          {isLoading2 ? <CircularProgress color="white" size={30} /> : "Send"}
        </Button>
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
    </>
  );
}

export default ApartmentList;
