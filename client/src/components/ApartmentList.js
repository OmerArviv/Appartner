import React, { useEffect, useState } from 'react';
import {
  Box,
  List,
  ListItem,
  Stack,
  Grid,
  CardActionArea,
  Divider,
} from '@mui/material';
import ApartmentListItem from './ApartmentListItem';
import { getAllAppartments } from '../controller/appartmentController';
import FindMatchesButton from './FindMatchesButton';

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

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: 2,
        }}
      >
        <FindMatchesButton
          onMatchedApartments={handleMatchedApartments}
          apartments={appartments}
        />
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
