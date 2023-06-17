import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Stack, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useState, useEffect, useContext } from "react";
import { Container } from "@mui/system";
import Slider from "@mui/material/Slider";
import { MenuItem, TextField, Select } from "@mui/material";
import { authContext } from "../APP/Utils";
import { getUserPreferncesByEmail } from "../controller/userProfilePreferncesController";
import { calculateDistance } from "../controller/appartmentController";

const options = ["Yes", "No", "It doesn't matter"];
const genderOptions = ["Males Only", "Females Only", "It doesn't matter"];
const roomatesOptions = [1, 2, 3, 4, 5];

export default function FilterChoices(props) {
  const setAppartments = props.setAppartments;
  const appartments = props.appartments;
  const allAppartments = props.allAppartments;
  const [priceRange, setPriceRange] = useState([1000, 10000]);
  const [ageRange, setAgeRange] = useState([18, 75]);
  const [radius, setRadius] = useState(2000);
  const { userEmail } = useContext(authContext);
  const [location, setLocation] = useState("");
  const [gender, setGender] = useState("");

  const [elevator, setElevator] = useState("");
  const [parking, setParking] = useState("");
  const [smoking, setSmoking] = useState("");
  const [roomates, setRoomates] = useState("");

  const handleAgeRangeChange = (event, newValue) => {
    setAgeRange(newValue);
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleRadiusChange = (event, newValue) => {
    setRadius(newValue);
  };

  useEffect(() => {
    async function getUserPrefernces() {
      if (userEmail) {
        const userData = await getUserPreferncesByEmail(userEmail);
        setAgeRange(userData.ageRange);
        setElevator(userData.elevator);
        setGender(userData.gender);
        setLocation(userData.location);
        setRoomates(userData.numberOfRoomates);
        setParking(userData.parking);
        setPriceRange(userData.priceRange);
        setSmoking(userData.smoking);
        setRadius(userData.radius);
      }
    }
    getUserPrefernces();
  }, []);

  useEffect(() => {
    setAppartments([
      ...allAppartments.filter((appartment) => {
        if (location.position && appartment.location) {
          const distance = calculateDistance(
            location.position,
            appartment.location.position
          );
          console.log(distance); // Print the calculated distance
          return (
            appartment.age_range[0] >= ageRange[0] &&
            appartment.age_range[1] <= ageRange[1] &&
            appartment.price_range[0] >= priceRange[0] &&
            appartment.price_range[1] <= priceRange[1] &&
            appartment.roomates.length === roomates &&
            (smoking === options[2] ||
              (smoking !== options[2] &&
                appartment.smoking.toLowerCase() === smoking.toLowerCase())) &&
            (elevator === options[2] ||
              appartment.elevator.toLowerCase() === elevator.toLowerCase()) &&
            (parking === options[2] ||
              appartment.parking.toLowerCase() === parking.toLowerCase()) &&
            distance <= radius
          );
        }
      }),
    ]);
  }, [ageRange, priceRange, roomates, smoking, elevator, parking]);

  function valueAgetext(value) {
    return `${value}`;
  }

  function valuePricetext(value) {
    return `${value}`;
  }

  function valueRadiustext(value) {
    return `${value}`;
  }

  return (
    <Box>
      <Container maxWidth="xl" sx={{ color: "black", bgcolor: "white" }}>
        <Grid container>
          <Grid item xs={3}>
            <Typography
              sx={{
                textAlign: "center",
                mt: 2,
              }}
            >
              Age Range
            </Typography>
            <Box sx={{ width: "100%" }}>
              <Stack
                spacing={2}
                direction="row"
                sx={{ mb: 1 }}
                alignItems="center"
              >
                <Typography>{ageRange[0]}</Typography>
                <Slider
                  getAriaLabel={() => "Age range"}
                  value={ageRange}
                  onChange={handleAgeRangeChange}
                  valueLabelDisplay="auto"
                  getAriaValueText={valueAgetext}
                  min={18}
                  max={75}
                  size="small"
                  sx={{ color: "black" }}
                />
                <Typography>{ageRange[1]}</Typography>
              </Stack>
            </Box>
            <Typography
              sx={{
                textAlign: "center",
                mt: 2,
              }}
            >
              Price Range
            </Typography>
            <Box sx={{ width: "100%" }}>
              <Stack
                spacing={2}
                direction="row"
                sx={{ mb: 1 }}
                alignItems="center"
              >
                <Typography>{priceRange[0]}</Typography>
                <Slider
                  getAriaLabel={() => "Price range"}
                  value={priceRange}
                  onChange={handlePriceRangeChange}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuePricetext}
                  min={1000}
                  max={10000}
                  size="small"
                  sx={{ color: "black" }}
                />
                <Typography>{priceRange[1]}</Typography>
              </Stack>
            </Box>
          </Grid>
          {/* <Divider orientation="vertical" flexItem sx={{ mx: 2 }} /> */}
          {/* <Grid item xs="auto">
            <Typography
              sx={{
                textAlign: "center",
                mt: 2,
              }}
            >
              Gender
            </Typography>
            <Select
              label="Gender"
              id="gender"
              value={gender}
              onChange={(event) => setGender(event.target.value)}
              fullWidth
            >
              {genderOptions.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </Grid> */}
          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
          <Grid item xs={1.5}>
            <Typography
              sx={{
                textAlign: "center",
                mt: 2,
              }}
            >
              Elevator
            </Typography>
            <Select
              id="elevator"
              value={elevator}
              onChange={(event) => setElevator(event.target.value)}
              fullWidth
            >
              {options.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
          <Grid item xs={1.5}>
            <Typography
              sx={{
                textAlign: "center",
                mt: 2,
              }}
            >
              Parking
            </Typography>
            <Select
              id="parking"
              value={parking}
              onChange={(event) => setParking(event.target.value)}
              fullWidth
            >
              {options.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
          <Grid item xs={1.5}>
            <Typography
              sx={{
                textAlign: "center",
                mt: 2,
              }}
            >
              Smoking
            </Typography>
            <Select
              id="smoking"
              value={smoking}
              onChange={(event) => setSmoking(event.target.value)}
              fullWidth
            >
              {options.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
          <Grid item xs="auto">
            <Typography
              sx={{
                textAlign: "center",
                mt: 2,
              }}
            >
              Number Of Roomates
            </Typography>
            <Select
              id="roomates"
              value={roomates}
              onChange={(event) => setRoomates(event.target.value)}
              fullWidth
            >
              {roomatesOptions.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
          <Grid item xs="auto">
            <Typography
              sx={{
                textAlign: "center",
                mt: 2,
                fontSize: "110%",
              }}
            >
              Location
            </Typography>
            <TextField id="location" value={location.name} fullWidth />
            <Typography
              sx={{
                textAlign: "center",
                mt: 2,
              }}
            >
              Radius
            </Typography>
            <Box sx={{ width: "100%" }}>
              <Stack
                spacing={2}
                direction="row"
                sx={{ mb: 1 }}
                alignItems="center"
              >
                <Typography>{radius[0]}</Typography>
                <Slider
                  getAriaLabel={() => "Radius"}
                  value={radius}
                  onChange={handleRadiusChange}
                  valueLabelDisplay="auto"
                  getAriaValueText={valueRadiustext}
                  min={0}
                  max={3000}
                  size="small"
                  sx={{ color: "black" }}
                />
                <Typography>{radius[1]}</Typography>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
