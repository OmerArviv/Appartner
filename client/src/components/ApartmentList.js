import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  TextField,
  Grid,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Toolbar,
  Tooltip,
} from "@mui/material";
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

import SpeechtotextApart from "./Speechtotextapi/SpeechtotextApart";
import ParseChatGptApart from "./ChatGptApi/ParseChatGptApart";
import SearchIcon from "@mui/icons-material/Search";

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

  //set user details with speach to text
  const [userSTT, setUserSTT] = useState("");

  //set user details with chat GPT
  const [userGPT, setUserGPT] = useState("");

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

    try {
      const res = await convWithChatGpt(apartmentData);

      if (res && res.status == 200) {
        for (let i = 0; i < res.data.length; i++) {
          const apartment = await getAppartmentById(res.data[0]._id);
          apartments_array.push(apartment.data);
        }

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

  const [selectedOption, setSelectedOption] = useState("parseChatGpt");

  {
    selectedOption === "parseChatGpt" ? (
      <ParseChatGptApart
        apartment={allAppartments}
        setAppartments={setAppartments}
      />
    ) : (
      <SpeechtotextApart setUser={setUserSTT} />
    );
  }

  const [isCodeVisible, setIsCodeVisible] = useState(false);

  const handleTitleClick = () => {
    setIsCodeVisible(!isCodeVisible);
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
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 5,
          marginBottom: 5,
        }}
      >
        <Tooltip
          title="Click to fill the fields by record or short text !!!!"
          disableInteractive
        >
          <SearchIcon
            fontSize="large"
            onClick={handleTitleClick}
            style={{ cursor: "pointer" }}
          ></SearchIcon>
        </Tooltip>
        {isCodeVisible && (
          <Box
            sx={{
              justifyContent: "center",
              marginTop: 5,
            }}
          >
            <ToggleButtonGroup
              value={selectedOption}
              exclusive
              onChange={(event, newSelectedOption) =>
                newSelectedOption && setSelectedOption(newSelectedOption)
              }
            >
              <ToggleButton value="parseChatGpt">Text</ToggleButton>
              <ToggleButton value="speechtotext">Voice</ToggleButton>
            </ToggleButtonGroup>
            {selectedOption === "parseChatGpt" && (
              <Box
                sx={{
                  justifyContent: "center",
                  marginTop: 5,
                }}
              >
                <ParseChatGptApart
                  appartments={appartments}
                  allAppartments={allAppartments}
                  setAppartments={setAppartments}
                />
              </Box>
            )}
            {selectedOption === "speechtotext" && (
              <Box
                sx={{
                  justifyContent: "center",
                  marginTop: 5,
                }}
              >
                <SpeechtotextApart
                  appartments={appartments}
                  allAppartments={allAppartments}
                  setAppartments={setAppartments}
                />
              </Box>
            )}
          </Box>
        )}
      </Box>
      {/* <Grid container>
        <Grid item> */}
      <FilterSection
        appartments={appartments}
        setAppartments={setAppartments}
        allAppartments={allAppartments}
      ></FilterSection>
      {/* </Grid>
      </Grid> */}
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
                <div key={index}>
                  {/* <ListItem> */}
                  <ApartmentListItem data={item} />
                  {/* </ListItem> */}
                </div>
              ))
            : ""}
        </Stack>
      </List>
    </>
  );
}

export default ApartmentList;
