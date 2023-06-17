import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CardContent,
  Slider,
  Typography,
  Stepper,
  StepLabel,
  Step,
} from "@mui/material";
import { authContext, pageTitleContext } from "../APP/Utils";
import UploadImages from "../components/UploadImages";
import { useContext, useEffect, useState } from "react";
import DialogAddCollabrator from "../components/DialogAddCollabrator";
import { createAppartment } from "../controller/appartmentController";
import { useNavigate } from "react-router-dom";
import RoomateAvatar from "../components/RoomateAvatar";
import SearchGoogleMap from "../components/SeachGoogleMap";
import { Box, CircularProgress } from "@material-ui/core";
import { summaryWithChatGpt } from "../controller/chatGptController";
import SnackBarAlerts from "../components/UI/SnackbarAlerts";
import steps from "../components/StepperData";
import { red } from "@mui/material/colors";
import CustomStepper from "../components/CustomStepper";

const btnstyle = {
  background: "#4F4E51",
  height: "50px",
  color: "#D0D2D8",
};

const CreateApartment = () => {
  const { setPageTitle } = useContext(pageTitleContext);
  const { userEmail } = useContext(authContext);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setPageTitle("Create Apartment");
  }, []);

  // useEffect(() => {
  //   if()
  // }, []);

  // const getUserApartment= async ()=>{

  // }

  const [gender, setGender] = useState("");
  const [age, setAge] = useState([18, 75]);
  const [location, setLocation] = useState("");
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [price, setPrice] = useState([2500, 5500]);
  const [elevator, setElevator] = useState("");
  const [parking, setParking] = useState("");
  const [smoking, setSmoking] = useState("");
  const [apartmentImages, setApartmentImages] = useState("");
  const [roomates, setRoomates] = useState([userEmail]);
  const [selectedCollaborator, setSelectedCollaborator] = useState("");
  const [error, setError] = useState("");
  const [openSnackbar, setOpensnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); //for delay

  const handlePositionSelect = (position) => {
    setSelectedPosition(position);
  };

  const handleSearchValueSelect = (value) => {
    setSelectedLocation(value);
  };

  const handleChooseCollaborator = (email) => {
    setSelectedCollaborator(email);

  };

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

  function valueAgetext(value) {
    return `${value}`;
  }
  function valuePricetext(value) {
    return `${value}`;
  }

  function apartmentImagesHandler(arr) {
    const newArray = [];
    if (arr[0] !== "") {
      newArray.push(arr[0]);
    }
    if (arr[1] !== "") {
      newArray.push(arr[1]);
    }
    if (arr[2] !== "") {
      newArray.push(arr[2]);
    }
    if (arr[3] !== "") {
      newArray.push(arr[3]);
    }
    if (newArray != null) {
      setApartmentImages(newArray);
    }
  }
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const user_email = userEmail;
    if (
      user_email != null &&
      age != null &&
      selectedLocation !== "" &&
      selectedPosition != null &&
      price != null &&
      gender != null &&
      elevator != null &&
      parking != null &&
      smoking != null &&
      roomates != null
    ) {
      const appartment = {
        email: user_email,
        age_range: age,
        location: {
          position: selectedPosition,
          name: selectedLocation,
        },
        price_range: price,
        gender: gender,
        elevator: elevator,
        parking: parking,
        smoking: smoking,
        roomates: roomates,
        images: apartmentImages,
      };

      const appartmentToChat = {
        email: user_email,
        age_range: age,
        location: {
          position: selectedPosition,
          name: selectedLocation,
        },
        price_range: price,
        gender: gender,
        elevator: elevator,
        parking: parking,
        smoking: smoking,
        roomates: roomates,
      }; 

      if (selectedCollaborator !== "" && selectedCollaborator) {
        appartment.roomates = [...roomates, selectedCollaborator];
      }

      const respone_summary = await summaryWithChatGpt(appartmentToChat);


      if (respone_summary && respone_summary.status === 200) {
        appartment.summary = respone_summary.data;
      }

      const result = await createAppartment(appartment);

      console.log("omer", appartment);
      if (result.status === 201) {
        setSnackbarMessage("Your request was send");
        setAlertSeverity("success");
        setOpensnackbar(true);
        await delay(1500);
        navigate("/");
      } else if (result.status === 403) {
        setError("Error occured!");
      }
    } else {
      setError("Please enter all fields!");
      // setSnackbarMessage("Please fill all fields!");
      // setAlertSeverity("warning");
      // setOpensnackbar(true);
      // await delay(1500);
    }
    setIsLoading(false);
  };

  return (
    <Grid>
      <CustomStepper activeStep={3} steps={steps} />

      <Grid container spacing={2} sx={{ paddingTop: "40px" }}>
        {
          <SnackBarAlerts
            snackbarMessage={<Typography>{snackbarMessage}</Typography>}
            open={openSnackbar}
            severity={alertSeverity}
          />
        }
        <Grid item xs={4} sx={{ width: 400, textAlign: "center" }}>
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
              <MenuItem value="all">All</MenuItem>
            </Select>
          </FormControl>
          <SearchGoogleMap
            onPositionSelect={handlePositionSelect}
            onSearchValueSelect={handleSearchValueSelect}
          />
          <h1>{selectedLocation}</h1>
          {selectedPosition && (
            <h1>
              {selectedPosition.lat()}, {selectedPosition.lng()}
            </h1>
          )}
        </Grid>
        <Grid item xs={4} sx={{ width: 400, textAlign: "center" }}>
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

          <div>
            {selectedCollaborator !== "" && (
              <RoomateAvatar email={selectedCollaborator} />
            )}
            <DialogAddCollabrator
              onChooseCollaborator={handleChooseCollaborator}
              sx={{ width: "400px", marginBottom: "20px" }}
            />
          </div>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {error && <p style={{ color: "red", fontSize: "20px" }}>{error}</p>}
          </Box>
          <Button
            style={btnstyle}
            sx={{ width: "400px", marginTop: "100px" }}
            onClick={onSubmitHandler}
          >
            {isLoading ? (
              <CircularProgress color="white" size={30} />
            ) : (
              "Create My Apartment"
            )}
          </Button>
        </Grid>
        <Grid
          item="ture"
          xs={4}
          sx={{
            width: 400,
            marginLeft: "auto",
            marginRight: "auto",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <UploadImages setArrayImages={apartmentImagesHandler} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CreateApartment;
