import {
  Card,
  CardContent,
  Slider,
  Box,
  Typography,
  Button,
} from "@mui/material";
import {
  FormControl,
  InputLabel,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { userProfileSetPrefernces } from "../controller/userProfilePreferncesController";

const options = ["Yes", "No", "It doesn't matter"];
const roomatesOptions = [1, 2, 3, 4, 5];

const SetPreferncesProfile = () => {
  const navigate = useNavigate();
  const email = "email";
  const [ageRange, setAgeRange] = useState([18, 75]);
  const [loaction, setLocation] = useState(null);
  const [priceRange, setPriceRange] = useState([2500, 5500]);
  const [gender, setGender] = useState("");

  const [elevator, setElevator] = useState(null);
  const [parking, setParking] = useState(null);
  const [smoking, setSmoking] = useState(null);
  const [roomates, setRoomates] = useState(null);

  function ageRangeHandler(event, newValue) {
    setAgeRange(newValue);
    console.log(valuetext);
  }

  function locationHandler(event) {
    console.log("location");
    setLocation(event.target.value);
    console.log(loaction);
  }

  function priceRangeHandler(event, newValue) {
    setPriceRange(newValue);
    console.log(valuePricetext);
  }

  function genderHandler(event) {
    console.log("gender");
    setGender(event.target.value);
    console.log(gender);
  }

  function elevatorHandler(event) {
    console.log("elevator");
    setElevator(event.target.value);
    console.log(elevator);
  }

  function parkingHandler(event) {
    console.log("parking");
    setParking(event.target.value);
    console.log(parking);
  }

  function smokingHandler(event) {
    console.log("userSmoking");
    setSmoking(event.target.value);
    console.log(event.target.value);
    console.log(smoking);
  }

  function roomatesHandler(event) {
    console.log("roomates");
    setRoomates(event.target.value);
    console.log(roomates);
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (
      ageRange != null &&
      loaction != null &&
      priceRange != null &&
      gender != null &&
      elevator != null &&
      parking != null &&
      smoking != null &&
      roomates != null
    ) {
      const result = await userProfileSetPrefernces(
        email,
        ageRange,
        loaction,
        priceRange,
        gender,
        elevator,
        parking,
        smoking,
        roomates
      );

      console.log("send reg");
      console.log(result);
      if (result == true) {
        navigate("/create-profile/set-prefernces");
      } else {
        if (result.response.status == 409) {
          alert("You already have an account");
        } else if (result.response.status == 403) {
          alert("Error occured!");
        }
      }
    } else {
      alert("Please enter all fields!");
    }
    navigate("/");
  };
  function valuetext(value) {
    return `${value}`;
  }

  function valuePricetext(value) {
    return `${value}`;
  }

  return (
    <>
      <p>prefernces</p>
      <Box
        container
        spacing={50}
        sx={{ display: "flex", flexWrap: "wrap", margin: "10" }}
      >
        <Box
          item
          component="form"
          xs={4}
          sx={{ width: 400, marginLeft: "auto", marginRight: "auto" }}
        >
          <Card>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <CardContent>
                <InputLabel
                  sx={{ fontSize: 20, textDecoration: "bolt" }}
                  shrink
                  id="ages-range-label"
                >
                  Enter age range
                </InputLabel>
                <Slider
                  getAriaLabel={() => "Age range"}
                  value={ageRange}
                  onChange={ageRangeHandler}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  min={18}
                  max={75}
                  size="small"
                  sx={{ color: "black" }}
                />
                <Typography>
                  The range of ages: {`${ageRange[0]}`}-{`${ageRange[1]}`}
                </Typography>
              </CardContent>
            </FormControl>
            <FormControl fullWidth>
              <CardContent>
                <InputLabel
                  sx={{ fontSize: 20, textDecoration: "bolt" }}
                  shrink
                  id="location-label"
                >
                  Location
                </InputLabel>
                <TextField
                  //  label='Location'
                  labelId="location-label"
                  id="location"
                  onChange={locationHandler}
                  value={loaction}
                  fullWidth
                />
              </CardContent>
            </FormControl>
            <FormControl fullWidth>
              <CardContent>
                <InputLabel
                  sx={{ fontSize: 20, textDecoration: "bolt" }}
                  shrink
                  id="price-range-label"
                >
                  Enter price range
                </InputLabel>
                <Slider
                  getAriaLabel={() => "Price range"}
                  value={priceRange}
                  onChange={priceRangeHandler}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuePricetext}
                  min={1000}
                  max={10000}
                  size="small"
                  sx={{ color: "black" }}
                />
                <Typography>
                  The range of price: {`${priceRange[0]}`}-{`${priceRange[1]}`}
                </Typography>
              </CardContent>
            </FormControl>
            <FormControl fullWidth>
              <CardContent>
                <InputLabel
                  sx={{ fontSize: 20, textDecoration: "bolt" }}
                  shrink
                  id="user-gender-label"
                >
                  Gender
                </InputLabel>
                <Select
                  label="Gender"
                  // labelId='smoking-label'
                  id="gender"
                  value={gender}
                  onChange={genderHandler}
                  // input={<OutlinedInput label="Smoking" />}
                  fullWidth
                >
                  {options.map((o) => (
                    <MenuItem key={o} value={o}>
                      {o}
                    </MenuItem>
                  ))}
                </Select>
              </CardContent>
            </FormControl>
          </Card>
        </Box>

        <Box
          item
          component="form"
          xs={4}
          sx={{ width: 400, marginLeft: "auto", marginRight: "auto" }}
        >
          <Card>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <CardContent>
                <InputLabel
                  sx={{ fontSize: 20, textDecoration: "bolt" }}
                  shrink
                  id="elevator-label"
                >
                  Elevator
                </InputLabel>
                <Select
                  label="Elevator"
                  // labelId='smoking-label'
                  id="elevator"
                  value={elevator}
                  onChange={elevatorHandler}
                  // input={<OutlinedInput label="Smoking" />}
                  fullWidth
                >
                  {options.map((o) => (
                    <MenuItem key={o} value={o}>
                      {o}
                    </MenuItem>
                  ))}
                </Select>
              </CardContent>
            </FormControl>
            <FormControl fullWidth>
              <CardContent>
                <InputLabel
                  sx={{ fontSize: 20, textDecoration: "bolt" }}
                  shrink
                  id="parking-label"
                >
                  Parking
                </InputLabel>
                <Select
                  label="Parking"
                  // labelId='smoking-label'
                  id="parking"
                  value={parking}
                  onChange={parkingHandler}
                  // input={<OutlinedInput label="Smoking" />}
                  fullWidth
                >
                  {options.map((o) => (
                    <MenuItem key={o} value={o}>
                      {o}
                    </MenuItem>
                  ))}
                </Select>
              </CardContent>
            </FormControl>
            <FormControl fullWidth>
              <CardContent>
                <InputLabel
                  sx={{ fontSize: 20, textDecoration: "bolt" }}
                  shrink
                  id="smoking-label"
                >
                  Smoking
                </InputLabel>
                <Select
                  label="Smoking"
                  // labelId='smoking-label'
                  id="smoking"
                  value={smoking}
                  onChange={smokingHandler}
                  // input={<OutlinedInput label="Smoking" />}
                  fullWidth
                >
                  {options.map((o) => (
                    <MenuItem key={o} value={o}>
                      {o}
                    </MenuItem>
                  ))}
                </Select>
              </CardContent>
            </FormControl>
            <FormControl fullWidth>
              <CardContent>
                <InputLabel
                  sx={{ fontSize: 20, textDecoration: "bolt" }}
                  shrink
                  id="number-of-roomates-label"
                >
                  Number Of Roomates
                </InputLabel>
                <Select
                  label="Number Of Roomates"
                  // labelId='smoking-label'
                  id="smoking"
                  value={roomates}
                  onChange={roomatesHandler}
                  // input={<OutlinedInput label="Smoking" />}
                  fullWidth
                >
                  {roomatesOptions.map((o) => (
                    <MenuItem key={o} value={o}>
                      {o}
                    </MenuItem>
                  ))}
                </Select>
              </CardContent>
            </FormControl>
          </Card>
        </Box>
      </Box>

      <Button variant="contained" onClick={onSubmitHandler}>
        Let's find your new home
      </Button>
    </>
  );
};

export default SetPreferncesProfile;
