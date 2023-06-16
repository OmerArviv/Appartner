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

function FilterByChatGpt() {
  const [isCodeVisible, setIsCodeVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { userEmail } = useContext(authContext);

  const handleTitleClick = () => {
    setIsCodeVisible(!isCodeVisible);
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
    </>
  );
}

export default FilterByChatGpt;
