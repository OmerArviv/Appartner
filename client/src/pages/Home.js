import { useContext, useEffect } from "react";
import { pageTitleContext } from "../APP/Utils";
import {
  Grid,
  Divider,
  Typography,
  Box,
  BottomNavigation,
  CardMedia,
} from "@mui/material";
import main_1 from "../images/main_1.jpg";
import main_2 from "../images/main_2.jpg";
import main_3 from "../images/main_3.jpg";
import main_4 from "../images/main_4.png";
import main_video from "../images/main_video.mp4";

import { styled } from "@mui/system";

const Banner = styled("img")(({ theme }) => ({
  objectFit: "cover",
  opacity: "0.75",
  marginBottom: theme.spacing(2),
}));
const SmallImage = styled("img")(({ theme }) => ({
  objectFit: "cover",
  borderRadius: "16px",
  width: 650,
  height: 350,
  marginBottom: theme.spacing(2),
}));

const Home = () => {
  const { setPageTitle } = useContext(pageTitleContext);

  useEffect(() => {
    setPageTitle("Home");
  }, []);

  return (
    <Grid
      container
      justifyContent="center" // Center content horizontally
      alignItems="center" // Center content vertically
      sx={{ minHeight: "100vh", marginTop: "35px" }}
    >
      <Grid item xs={12} sx={{ marginLeft: "70px" }}>
        <Banner alt="image1" src={main_2} sx={{ width: 1400, height: 500 }} />
        <Typography sx={{ fontWeight: "200", fontSize: "50px" }}>
          FIND YOUR BEST MATCH
        </Typography>
        <Typography sx={{ marginBottom: "25px" }}>
          Our website solves the issue of finding roommates to apartments for
          all the involves: The people who are searching to get into an
          apartment.
          <br />
          searching for your new home / people you are going to live with and we
          wish to find the perfect match for you.
        </Typography>
        <Divider sx={{ fontSize: "16px" }}>FOR WHO OUR SITE IS?</Divider>
      </Grid>
      <Grid container sx={{ marginLeft: "70px", marginTop: "30px" }}>
        <Grid item xs={6}>
          <SmallImage alt="image2" src={main_1} />
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Typography
              sx={{ fontWeight: "400", fontSize: "25px", marginBottom: "20px" }}
            >
              WHAT IS A WELCOMER?
            </Typography>
            <Typography sx={{ width: "90%", fontSize: "17px" }}>
              A welcomer is an individual who owns an apartment and is actively
              seeking roommates to share their living space. Welcomers are open
              to welcoming others into their apartment, often with the goal of
              forming a harmonious living arrangement and sharing the expenses
              associated with renting or owning a place. They actively search
              for compatible roommates who can join them in their apartment,
              creating a collaborative and welcoming living environment.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Typography
              sx={{ fontWeight: "400", fontSize: "25px", marginBottom: "20px" }}
            >
              WHAT IS A LOOKER?
            </Typography>
            <Typography sx={{ width: "90%", fontSize: "17px" }}>
              A looker is an individual who is in search of an apartment and is
              interested in joining as a roommate. Lookers are actively seeking
              opportunities to find suitable living arrangements by connecting
              with welcomers who have available space in their apartments. They
              are looking for compatible roommates and a comfortable living
              environment where they can share the expenses and experiences of
              living in a shared apartment. Lookers aim to find a welcoming and
              harmonious living situation that meets their needs and
              preferences.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <SmallImage alt="image3" src={main_3} />
        </Grid>
      </Grid>
      <Box>
        <Divider
          sx={{ fontSize: "16px", marginBottom: "30px", marginTop: "10px" }}
        >
          WE ARE HERE FOR YOU ♥
        </Divider>
        <CardMedia component="video" src={main_video} autoPlay loop />
      </Box>
      <Grid item xs={12} sx={{ marginTop: "30px" }}>
        <Divider />
        <BottomNavigation
          showLabels
          sx={{
            background: "#f5f5f5",
            padding: "20px 0",
            justifyContent: "center",
          }}
        >
          <Typography>Appartner © 2023</Typography>
        </BottomNavigation>
      </Grid>
    </Grid>
  );
};

export default Home;
