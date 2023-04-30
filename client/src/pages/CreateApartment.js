import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CardContent,
  Slider,
  Typography,
} from "@mui/material";
import { pageTitleContext } from "../APP/Utils";
import UploadImages from "../components/UploadImages";
import { useContext, useEffect, useState } from "react";
import DialogAddCollabrator from "../components/DialogAddCollabrator";

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
  const [age, setAge] = useState([18, 75]);
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState([2500, 5500]);
  const [elevator, setElevator] = useState("");
  const [parking, setParking] = useState("");
  const [smoking, setSmoking] = useState("");
  const [roomates, setRoomates] = useState("");
  const [apartmentImages, setApartmentImages] = useState("");

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleAgeChange = (event, newValue) => {
    setAge(newValue);
  };
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
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

  function valueAgetext(value) {
    return `${value}`;
  }
  function valuePricetext(value) {
    return `${value}`;
  }

  function apartmentImagesHandler(arr) {
    console.log("set images array handler");
    const newArray=[]; 
    if(arr[0]!=""){
      newArray.push(arr[0]); 
    }if(arr[1]!=""){
      newArray.push(arr[1]); 
    }if(arr[2]!=""){
      newArray.push(arr[2]); 
    }if(arr[3]!=""){
      newArray.push(arr[3]); 
    }
    if(newArray!= null){
    setApartmentImages(newArray);
    }
    console.log(apartmentImages);
  }

  return (
    <Grid container spacing={2} sx={{ paddingTop: "40px" }}>
      <Grid item xs={4} sx={{ textAlign: "center" }}>
        <FormControl sx={{ mt: 3, width: "400px" }}>
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
              value={age}
              onChange={handleAgeChange}
              valueLabelDisplay="auto"
              getAriaValueText={valueAgetext}
              min={18}
              max={75}
              size="small"
              sx={{ color: "black" }}
            />
            <Typography>
              The range of ages: {`${age[0]}`}-{`${age[1]}`}
            </Typography>
          </CardContent>
        </FormControl>
        <TextField
          id="location"
          label="Enter Location"
          value={location}
          onChange={handleLocationChange}
          sx={{ width: "400px", marginBottom: "20px" }}
        ></TextField>
        <FormControl sx={{ width: "400px", marginTop: "10px" }}>
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
              value={price}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuePricetext}
              min={1000}
              max={10000}
              size="small"
              sx={{ color: "black" }}
            />
            <Typography>
              The range of price: {`${price[0]}`}-{`${price[1]}`} $ ₪
            </Typography>
          </CardContent>
        </FormControl>
        <FormControl sx={{ width: "400px", marginBottom: "20px" }}>
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
        <FormControl sx={{ width: "400px", marginBottom: "20px" }}>
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
        <FormControl sx={{ width: "400px", marginBottom: "20px" }}>
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
        <FormControl sx={{ width: "400px", marginBottom: "20px" }}>
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
        <FormControl sx={{ width: "400px", marginBottom: "20px" }}>
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
        <DialogAddCollabrator></DialogAddCollabrator>
        <Button style={btnstyle} sx={{ width: "400px", marginTop: "100px" }}>
          Create My Apartment
        </Button>
      </Grid>
      <Grid item xs={4} sx={{ textAlign: "center" }}>
        <UploadImages setArrayImages={apartmentImagesHandler}/>
      </Grid>
    </Grid>
  );
};

export default CreateApartment;
