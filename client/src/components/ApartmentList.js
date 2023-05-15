import {
  Box,
  List,
  ListItem,
  Stack,
  Grid,
  CardActionArea,
  Divider,
} from "@mui/material";
import ApartmentListItem from "./ApartmentListItem";
import { useEffect, useState } from "react";
import { getAllAppartments } from "../controller/appartmentController";

function ApartmentList() {
  const [appartments, setAppartments] = useState(null);

  useEffect(() => {
    setAllAppartments();
  }, []);

  const setAllAppartments = async () => {
    const res = await getAllAppartments();
    if (res) {
      setAppartments(res);
    }
  };

  return (
    <>
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
          // divider={<Divider orientation="vertical" flexItem />}
          // spacing={4}
          flexWrap="wrap"
        >
          {/* <Box component="div" sx={{ display: 'inline' }}> */}
          {appartments
            ? appartments.map((item, index) => {
                return (
                  <Box
                    key={index}
                    component="div"
                    sx={{ display: "inline", marginRight: "auto" }}
                  >
                    <ListItem>
                      <ApartmentListItem data={item} />
                    </ListItem>
                  </Box>
                );
              })
            : ""}
          {/* </Box> */}
        </Stack>
      </List>
      {/* <Stack container="true" sx={{ height: 200, width: 300,display: 'inline-flex', flexDirection: 'column', flexWrap: "wrap", alignItems: 'center' }}>
        <Box item="true" >
        {data.map((item, index)=>
        <ApartmentListItem data={item} key={index}/>
        )}
        </Box>
        </Stack> */}
    </>
  );
}

export default ApartmentList;
