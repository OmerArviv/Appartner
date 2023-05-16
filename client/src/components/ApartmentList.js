import React, { useEffect, useState } from 'react';
import {
  Box,
  List,
  ListItem,
  Stack,
  Grid,
  CardActionArea,
  Divider,
  Button,
} from '@mui/material';
import ApartmentListItem from './ApartmentListItem';
import { getAllAppartments, getAllAppartmentsAndRoomateDetails, getAppartmentById } from '../controller/appartmentController';
import FindMatchesButton from './FindMatchesButton';
import { getBestMatchesCgptApi } from '../controller/RoomateRequestController';

function ApartmentList() {
  const [appartments, setAppartments] = useState(null);
  const [matchedApartments, setMatchedApartments] = useState([]);

  useEffect(() => {
    setAllAppartments();
  }, []);

  const setAllAppartments = async () => {
    const res = await getAllAppartments();
    if (res) {
      setAppartments(res);
    }
  };

  const handleMatchedApartments = (apartments) => {
    setMatchedApartments(apartments);
  };

  const handleFindMatches = async () => {
    const getAllAppartments = await getAllAppartmentsAndRoomateDetails();
    const user = { email: 'omer123@gmail.com',
    Birthday_date: '22',
    user_employment: 'teswt',
    smoking: 'No',
    pets: 'Yes',
    gender: 'Female',
    alcohol: 'Yes',
    kosher: 'Yes',
    hobby: 'sdfdsfs',
    user_additonal_information: '',
    user_facebook_link: '',
    user_instagram_link: '',
    user_profile_image: 's',
    location: "sfsdfs",
  }

  const mergedData = {
    user: user,
    apartments: getAllAppartments,
  };

    try {
      const res = await getBestMatchesCgptApi(mergedData);
      const response = res.data;
      const startIndex = response.indexOf("'") + 1;
      const endIndex = response.lastIndexOf("'");
      const parsedID = response.substring(startIndex, endIndex);
      const apartment = await getAppartmentById(parsedID)

      console.log(parsedID); // Output: 6461515faa5a5f543f110fa0


      if(apartment && apartment.status==200){
        setAppartments([apartment]);
      }

    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: 2,
        }}
      >
        <Button variant="contained" onClick={handleFindMatches}>
      Find the Best Matches
        </Button>
      </Box>

      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          display: 'inline-flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{ justifyContent: 'center' }}
          alignItems="center"
          flexWrap="wrap"
        >
          {matchedApartments.length > 0
            ? matchedApartments.map((item, index) => (
                <Box
                  key={index}
                  component="div"
                  sx={{ display: 'inline', marginRight: 'auto' }}
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
                  sx={{ display: 'inline', marginRight: 'auto' }}
                >
                  <ListItem>
                    <ApartmentListItem data={item} />
                  </ListItem>
                </Box>
              ))
            : ''}
        </Stack>
      </List>
    </>
  );
}

export default ApartmentList;
