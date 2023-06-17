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

function FilterByChatGpt(props) {
  const { isCodeVisible } = props;
  const { allAppartments, setAppartments, appartments } = props;
  const [selectedOption, setSelectedOption] = useState("parseChatGpt");

  return (
    <>
      {isCodeVisible && (
        <Box
          sx={{
            justifyContent: "center",
            marginTop: 5,
            marginLeft: 5,
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
    </>
  );
}

export default FilterByChatGpt;
