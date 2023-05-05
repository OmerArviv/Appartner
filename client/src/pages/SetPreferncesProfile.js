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
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { createUserProfilePrefernces } from "../controller/userProfilePreferncesController";
import { getUserEmail } from "../APP/APP_AUTH";
import { authContext, pageTitleContext } from "../APP/Utils";

const btnstyle = {
  // margin: "8px 0",
  background: "#4F4E51",
  height: "50px",
  color: "#D0D2D8",
};

const options = ["Yes", "No", "It doesn't matter"];
const roomatesOptions = [1, 2, 3, 4, 5];

const SetPreferncesProfile = () => {
  const navigate = useNavigate();
  const { setPageTitle } = useContext(pageTitleContext);
  const { userEmail } = useContext(authContext);

  useEffect(() => {
    setPageTitle("Set Prefernces");
  }, []);

  const email = "email";
  const [ageRange, setAgeRange] = useState([18, 75]);
  const [loaction, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState([2500, 5500]);
  const [gender, setGender] = useState("");

  const [elevator, setElevator] = useState("");
  const [parking, setParking] = useState("");
  const [smoking, setSmoking] = useState("");
  const [roomates, setRoomates] = useState("");

  function ageRangeHandler(event, newValue) {
    setAgeRange(newValue);
  }

  function locationHandler(event) {
    setLocation(event.target.value);
  }

  function priceRangeHandler(event, newValue) {
    setPriceRange(newValue);
  }

  function genderHandler(event) {
    setGender(event.target.value);
  }

  function elevatorHandler(event) {
    setElevator(event.target.value);
  }

  function parkingHandler(event) {
    setParking(event.target.value);
  }

  function smokingHandler(event) {
    setSmoking(event.target.value);
  }

  function roomatesHandler(event) {
    setRoomates(event.target.value);
  }

  const onSubmitHandler = async (event) => {
    const user_email = userEmail;
    event.preventDefault();
    if (
      user_email != null &&
      ageRange != null &&
      loaction != null &&
      priceRange != null &&
      gender != null &&
      elevator != null &&
      parking != null &&
      smoking != null &&
      roomates != null
    ) {
      const userProfilePrefernces = {
        email: user_email,
        ageRange: ageRange,
        location: loaction,
        priceRange: priceRange,
        gender: gender,
        elevator: elevator,
        parking: parking,
        smoking: smoking,
        numberOfRoomates: roomates,
      };

      const result = await createUserProfilePrefernces(userProfilePrefernces);
      if (result.status == 201) {
        navigate("/");
      } else if (result.status == 403) {
        alert("Error occured!");
      }
    } else {
      alert("Please enter all fields!");
    }
  };

  function valuetext(value) {
    return `${value}`;
  }

  function valuePricetext(value) {
    return `${value}`;
  }

  return (
    <>
      <Box
        container="true"
        spacing={50}
        sx={{ display: "flex", flexWrap: "wrap", margin: "10", marginTop: 5 }}
      >
        <Box
          item="true"
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
                  labelid="location-label"
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
                  The range of price: {`${priceRange[0]}`}-{`${priceRange[1]}`}{" "}
                  $ ₪
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
          item="true"
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

      <Box
        container="true"
        sx={{
          display: "flex",
          flexWrap: "warp",
          width: "auto",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 3,
        }}
      >
        <Box
          item="true"
          xs={4}
          sx={{ width: 400, marginLeft: "auto", marginRight: "auto" }}
        >
          <Button
            variant="contained"
            onClick={onSubmitHandler}
            style={btnstyle}
          >
            Let's find your new home
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default SetPreferncesProfile;
