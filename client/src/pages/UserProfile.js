import React, { useContext, useEffect, useState } from "react";
import { Grid, Typography, Box, Paper, Button } from "@mui/material";
import { styled } from "@mui/system";
import { authContext, pageTitleContext } from "../APP/Utils";
import { getUserEmail } from "../APP/APP_AUTH";

const ProfilePicture = styled("img")(({ theme }) => ({
  width: "100%",
  height: "400px",
  objectFit: "cover",
  borderRadius: "20%",
  marginBottom: theme.spacing(2),
}));

const Topic = ({ label, value }) => (
  <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
    <Paper sx={{ padding: "2px 8px", marginRight: 1, bgcolor: "#fff7e9" }}>
      <Typography variant="h6">{label}</Typography>
    </Paper>
    <Typography variant="h6">{value}</Typography>
  </Box>
);

const btnstyle = {
  background: "#4F4E51",
  height: "50px",
  color: "#D0D2D8",
};

const UserProfile = () => {
  const { setPageTitle } = useContext(pageTitleContext);
  const { userEmail } = useContext(authContext);
  const [age, setAge] = useState();
  const [gender, setGender] = useState();
  const [employment, setEmployment] = useState();
  const [alcohol, setAlcohol] = useState();
  const [kosher, setKosher] = useState();
  const [smoking, setSmoking] = useState();
  const [pets, setPets] = useState();
  const [additionInfo, setAdditionInfo] = useState();

  useEffect(() => {
    setPageTitle("User Profile");
  }, [setPageTitle]);

  useEffect(() => {
    const email = userEmail;
    fetch("http://localhost:8000/email-userprofile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        let uProfile = data.message;
        console.log(data.message); // logs "Email received"
        setAge(uProfile.Birthday_date);
        setGender(uProfile.gender);
        setEmployment(uProfile.user_employment);
        setAlcohol(uProfile.alcohol);
        setKosher(uProfile.kosher);
        setSmoking(uProfile.smoking);
        setPets(uProfile.pets);
        setAdditionInfo(uProfile.user_additonal_information);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
                <Box sx={{ height: 400, overflow: "hidden" }}>
                  <ProfilePicture
                    src="https://picsum.photos/300/201"
                    alt="Profile Picture"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "3rem",
                  }}
                >
                  <Button
                    variant="contained"
                    style={btnstyle}
                    sx={{ width: "300px", marginBottom: "20px" }}
                  >
                    CHANGE PROFILE IMAGE
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={2} />
              <Grid item xs={5}>
                <Box sx={{ height: 400 }}>
                  <Topic label="Age" value={age} />
                  <Topic label="Gender" value={gender} />
                  <Topic label="Employment" value={employment} />
                  <Topic label="Alcohol" value={alcohol} />
                  <Topic label="Smoking" value={smoking} />
                  <Topic label="Kosher" value={kosher} />
                  <Topic label="Pets" value={pets} />
                  <Topic label="Additional Information" value={additionInfo} />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "3rem",
                  }}
                >
                  <Button
                    variant="contained"
                    style={btnstyle}
                    sx={{ width: "300px", marginBottom: "20px" }}
                  >
                    EDIT PROFILE
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
