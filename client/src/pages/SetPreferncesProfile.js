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
import {
  createUserProfilePrefernces,
  getUserPreferncesByEmail,
  updateUserProfilePrefernces,
} from "../controller/userProfilePreferncesController";
import { authContext, pageTitleContext } from "../APP/Utils";
import SearchGoogleMap from "../components/SeachGoogleMap";

const btnstyle = {
  background: "#4F4E51",
  height: "50px",
  color: "#D0D2D8",
};

const options = ["Yes", "No", "It doesn't matter"];
const genderOptions = ["Males Only", "Females Only", "It doesn't matter"];
const roomatesOptions = [1, 2, 3, 4, 5];

const SetPreferncesProfile = () => {
  const navigate = useNavigate();
  const { setPageTitle } = useContext(pageTitleContext);
  const { userEmail } = useContext(authContext);
  const [ageRange, setAgeRange] = useState([18, 75]);
  const [priceRange, setPriceRange] = useState([2500, 5500]);
  const [gender, setGender] = useState("");
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [radius, setRadius] = useState(2000);
  const [elevator, setElevator] = useState("");
  const [parking, setParking] = useState("");
  const [smoking, setSmoking] = useState("");
  const [roomates, setRoomates] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      console.log("Test", userEmail);
      if (userEmail) {
        const userData = await getUserPreferncesByEmail(userEmail);
        console.log(userData);
        setAgeRange(userData.ageRange);
        setElevator(userData.elevator);
        setGender(userData.gender);
        setSelectedLocation(userData.location.name);
        setSelectedPosition(userData.location.position);
        setRoomates(userData.numberOfRoomates);
        setParking(userData.parking);
        setPriceRange(userData.priceRange);
        setSmoking(userData.smoking);
        setRadius(userData.radius);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    setPageTitle("Set Your Preferences");
  })

  const handlePositionSelect = (position) => {
    setSelectedPosition(position);
  };

  const handleSearchValueSelect = (value) => {
    setSelectedLocation(value);
  };

  function ageRangeHandler(event, newValue) {
    setAgeRange(newValue);
  }

  function radiusHandler(event, newValue) {
    setRadius(newValue);
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
    console.log(user_email);
    event.preventDefault();
    if (
      user_email !== "" &&
      ageRange !== "" &&
      loaction !== "" &&
      priceRange !== "" &&
      gender !== "" &&
      elevator !== "" &&
      parking !== "" &&
      smoking !== "" &&
      roomates !== ""
    ) {
      const userProfilePrefernces = {
        email: user_email,
        ageRange: ageRange,
        location: {
          position: selectedPosition,
          name: selectedLocation,
        },
        radius: radius,
        priceRange: priceRange,
        gender: gender,
        elevator: elevator,
        parking: parking,
        smoking: smoking,
        numberOfRoomates: roomates,
      };

      const userExists = await getUserPreferncesByEmail(userEmail);
      console.log("userExists \n", userExists);
      let result = null;
      if (userExists) {
        result = await updateUserProfilePrefernces(userProfilePrefernces);
      } else {
        result = await createUserProfilePrefernces(userProfilePrefernces);
      }
      if (result.status === 201) {
        navigate("/");
      } else if (result.status === 403) {
        alert("Error occured!");
      }
    } else {
      setError("Please enter all fields!");
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
        sx={{ display: "flex", flexWrap: "wrap", marginTop: 5 }}
      >
        <Box
          item="true"
          component="form"
          xs={4}
          sx={{ width: 600, marginLeft: "auto", marginRight: "auto" }}
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
                <SearchGoogleMap
                  onPositionSelect={handlePositionSelect}
                  onSearchValueSelect={handleSearchValueSelect}
                />
                <TextField
                  //  label='Location'
                  labelid="location-label"
                  id="location"
                  value={selectedLocation}
                  fullWidth
                />
              </CardContent>
            </FormControl>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <CardContent>
                <InputLabel
                  sx={{ fontSize: 20, textDecoration: "bolt" }}
                  shrink
                  id="ages-range-label"
                >
                  Enter Range In Meters
                </InputLabel>
                <Slider
                  getAriaLabel={() => "Range"}
                  value={radius}
                  onChange={radiusHandler}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  max={3000}
                  size="small"
                  sx={{ color: "black" }}
                />
                <Typography>The range is up to {radius} meters</Typography>
              </CardContent>
            </FormControl>
          </Card>
        </Box>

        <Box
          item="true"
          component="form"
          xs={4}
          sx={{ width: 600, marginLeft: "auto", marginRight: "auto" }}
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
                  {genderOptions.map((o) => (
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
          marginTop: 5,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {error && <p style={{ color: "red", fontSize: "20px" }}>{error}</p>}
        </Box>

        <Box
          item="true"
          xs={4}
          sx={{ width: 250, marginLeft: "auto", marginRight: "auto" }}
        >
          <Button
            variant="contained"
            onClick={onSubmitHandler}
            style={btnstyle}
          >
            Update My Prefernces
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default SetPreferncesProfile;
