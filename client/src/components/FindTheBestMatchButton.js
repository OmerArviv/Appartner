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

const btnstyle = {
  background: "#4F4E51",
  color: "#D0D2D8",
};

function FindTheBestMatchButton(props) {
  const { setAppartments, appartments } = props;
  const [isLoading, setIsLoading] = useState(false);
  const { userEmail } = useContext(authContext);

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
  return (
    <Box
      sx={{
        justifyContent: "center",
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
  );
}
export default FindTheBestMatchButton;
