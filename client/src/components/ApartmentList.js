import React, { useEffect, useState } from "react";
import { Box, List, ListItem, Stack, Grid } from "@mui/material";
import ApartmentListItem from "./ApartmentListItem";
import { getAllAppartments } from "../controller/appartmentController";
import FilterSection from "./FilterSection";
import SpeechtotextApart from "./Speechtotextapi/SpeechtotextApart";
import ParseChatGptApart from "./ChatGptApi/ParseChatGptApart";

function ApartmentList() {
  const [appartments, setAppartments] = useState(null);
  const [allAppartments, setAllAppartmentsNoFilter] = useState(null);
  const [matchedApartments, setMatchedApartments] = useState([]);

  //set user details with speach to text
  const [userSTT, setUserSTT] = useState("");

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

  return (
    <>
      {/* <Grid container> */}
      <FilterSection
        appartments={appartments}
        setAppartments={setAppartments}
        allAppartments={allAppartments}
      ></FilterSection>
      {/* </Grid> */}
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          display: "inline-flex",
          flexDirection: "column",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "revert",
          paddingTop: 2,
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
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
