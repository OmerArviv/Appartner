import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { pageTitleContext } from "../APP/Utils";
import UploadImages from "../components/UploadImages";
import { useContext, useEffect, useState } from "react";

const btnstyle = {
  background: "#4F4E51",
  height: "50px",
  color: "#D0D2D8",
};

const CreateApartment = () => {
  const { setPageTitle } = useContext(pageTitleContext);

  useEffect(() => {
    setPageTitle("Create Apartment");
  }, []);

  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [elevator, setElevator] = useState("");
  const [parking, setParking] = useState("");
  const [smoking, setSmoking] = useState("");
  const [roomates, setRoomates] = useState("");

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  const handleElevatorChange = (event) => {
    setElevator(event.target.value);
  };
  const handleParkingChange = (event) => {
    setParking(event.target.value);
  };
  const handleSmokingChange = (event) => {
    setSmoking(event.target.value);
  };
  const handleRoomatesChange = (event) => {
    setRoomates(event.target.value);
  };

  return (
    <Grid container spacing={2} sx={{ paddingTop: "40px" }}>
      <Grid item xs={4} sx={{ textAlign: "center" }}>
        <TextField
          id="Age"
          label="Enter Age Range"
          value={age}
          onChange={handleAgeChange}
          sx={{ width: "300px", marginBottom: "20px" }}
        ></TextField>
        <TextField
          id="location"
          label="Enter Location"
          value={location}
          onChange={handleLocationChange}
          sx={{ width: "300px", marginBottom: "20px" }}
        ></TextField>
        <TextField
          id="price"
          label="Enter Price"
          value={price}
          onChange={handlePriceChange}
          sx={{ width: "300px", marginBottom: "20px" }}
        ></TextField>
        <FormControl sx={{ width: "300px", marginBottom: "20px" }}>
          <InputLabel id="Gender-label">Gender</InputLabel>
          <Select
            labelId="Gender-label"
            id="Gender"
            value={gender}
            label="Gender"
            onChange={handleGenderChange}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4} sx={{ textAlign: "center" }}>
        <FormControl sx={{ width: "300px", marginBottom: "20px" }}>
          <InputLabel id="Elevator-label">Elevator</InputLabel>
          <Select
            labelId="Elevator-label"
            id="Elevator"
            value={elevator}
            label="Elevator"
            onChange={handleElevatorChange}
          >
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ width: "300px", marginBottom: "20px" }}>
          <InputLabel id="Parking-label">Parking</InputLabel>
          <Select
            labelId="Parking-label"
            id="Parking"
            value={parking}
            label="Parking"
            onChange={handleParkingChange}
          >
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ width: "300px", marginBottom: "20px" }}>
          <InputLabel id="Smoking-label">Smoking</InputLabel>
          <Select
            labelId="Smoking-label"
            id="Smoking"
            value={smoking}
            label="Smoking"
            onChange={handleSmokingChange}
          >
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ width: "300px", marginBottom: "20px" }}>
          <InputLabel id="Roomates-label">Roomates</InputLabel>
          <Select
            labelId="Roomates-label"
            id="Roomates"
            value={roomates}
            label="Roomates"
            onChange={handleRoomatesChange}
          >
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">4</MenuItem>
            <MenuItem value="5">5</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          // onClick={onSubmitHandler}
          style={btnstyle}
          sx={{ width: "300px", marginBottom: "20px" }}
        >
          Add Collabrator
        </Button>
      </Grid>
      <Grid item xs={4} sx={{ textAlign: "center" }}>
        <UploadImages></UploadImages>
      </Grid>
    </Grid>
  );
};

export default CreateApartment;
