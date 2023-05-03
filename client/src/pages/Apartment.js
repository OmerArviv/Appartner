import React, { useContext, useEffect } from "react";
import { Grid, Typography, Box, Paper, Button } from "@mui/material";
import { styled } from "@mui/system";
import { pageTitleContext } from "../APP/Utils";
import UserCarousel from "../components/UserCarousel";

const RoundedPicture = ({ src, alt, text }) => (
  <Box
    sx={{
      position: "relative",
      display: "inline-block",
      textAlign: "center",
      marginRight: 2,
    }}
  >
    <Box
      sx={{ borderRadius: "50%", overflow: "hidden", display: "inline-block" }}
    >
      <img src={src} alt={alt} style={{ width: "100%", height: "auto" }} />
    </Box>
    <Typography variant="h6" fontWeight="bold" sx={{ marginTop: 1 }}>
      {text}
    </Typography>
  </Box>
);

const btnstyle = {
  background: "#4F4E51",
  height: "50px",
  color: "#D0D2D8",
};

const Topic = ({ label, value }) => (
  <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
    <Paper sx={{ padding: "2px 8px", marginRight: 1, bgcolor: "#fff7e9" }}>
      <Typography variant="h6">{label}</Typography>
    </Paper>
    <Typography variant="h6">{value}</Typography>
  </Box>
);

const apartmentImages = [
  "https://picsum.photos/300/101",
  "https://picsum.photos/300/102",
  "https://picsum.photos/300/103",
  "https://picsum.photos/300/104",
];

const Apartment = () => {
  const { setPageTitle } = useContext(pageTitleContext);

  useEffect(() => {
    setPageTitle("Apartment");
  }, [setPageTitle]);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="stretch"
      style={{ margin: "0 auto" }}
    >
      <Grid item xs={10} sm={8} md={6}>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          spacing={2}
          marginTop={15}
        >
          <Grid item xs={12}>
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              spacing={2}
            >
              <Grid item xs={12} sm={5}>
                <Box sx={{ height: 450 }}>
                  <UserCarousel
                    apartmentImages={apartmentImages}
                    height={300}
                  />
                </Box>
                <RoundedPicture
                  src="https://picsum.photos/101"
                  alt="Profile Picture 5"
                  text="Omer Bar, 27"
                />
              </Grid>
              <Grid item xs={12} sm={2} />
              <Grid item xs={12} sm={5}>
                <Box sx={{ height: 450 }}>
                  <Topic label="Age:" value="24-25" />
                  <Topic label="Location:" value="New York" />
                  <Topic label="Price:" value="$2000/month" />
                  <Topic label="Gender:" value="Male" />
                  <Topic label="Elevator:" value="Yes" />
                  <Topic label="Parking:" value="No" />
                  <Topic label="Pets:" value="Yes" />
                </Box>
                <RoundedPicture
                  src="https://picsum.photos/100"
                  alt="Profile Picture 5"
                  text="Noa Sharon, 25"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
        >
          <Button
            variant="contained"
            // onClick={onSubmitHandler}
            style={btnstyle}
            sx={{ width: "400px", marginBottom: "20px" }}
          >
            I LOVE THIS APARTMENT, SEND REQUEST
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Apartment;
