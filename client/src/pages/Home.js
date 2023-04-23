import { useContext, useEffect } from "react";
import { pageTitleContext } from "../APP/Utils";
import { Grid, Avatar, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { pageTitleContext } from "../APP/Utils";
import main_1 from "../images/main_1.jpeg";
import main_2 from "../images/main_2.jpeg";
import main_3 from "../images/main_3.jpeg";

const Home = () => {
  const { setPageTitle } = useContext(pageTitleContext);

  useEffect(() => {
    setPageTitle("Home");
  }, []);

  return (
    <Grid
      container
      spacing={2}
      sx={{
        paddingTop: "35px",
        paddingLeft: "70px",
      }}
    >
      <Grid item xs={4}>
        <Avatar alt="image1" src={main_3} sx={{ width: 400, height: 400 }} />
      </Grid>
      <Grid item xs={4}>
        <Avatar alt="image2" src={main_1} sx={{ width: 400, height: 400 }} />
      </Grid>
      <Grid item xs={4}>
        <Avatar alt="image3" src={main_2} sx={{ width: 400, height: 400 }} />
      </Grid>
      <Grid
        item
        xs={11.5}
        sx={{
          bgcolor: "#CEC9B6",
          marginTop: "50px",
          height: 90,
          marginBottom: "40px",
          paddingLeft: "20px",
        }}
      >
        <Typography sx={{ textAlign: "center" }}>
          Our website solves the issue of finding roommates to apartments for
          all the involves: The people who are searching to get into an
          apartment.<br></br> searching for your new home / people you are going
          to live with and we wish to find the perfect match for you.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Home;
