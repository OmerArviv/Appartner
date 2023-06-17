import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Button,
  CardContent,
  Stack,
  Divider,
  Slider,
  InputLabel,
} from "@mui/material";
import { pageTitleContext, authContext } from "../APP/Utils";
import UserCarousel from "../components/UserCarousel";
import { useParams } from "react-router";
import { getAppartmentById, updateAppartment } from "../controller/appartmentController";
import { useNavigate } from "react-router";
import RoomateAvatar from "../components/RoomateAvatar";
import { createRoomateRequest } from "../controller/RoomateRequestController";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import TransgenderOutlinedIcon from "@mui/icons-material/TransgenderOutlined";
import ElevatorOutlinedIcon from "@mui/icons-material/ElevatorOutlined";
import LocalParkingOutlinedIcon from "@mui/icons-material/LocalParkingOutlined";
import SmokingRoomsOutlinedIcon from "@mui/icons-material/SmokingRoomsOutlined";
import SnackBarAlerts from "../components/UI/SnackbarAlerts";
import StyledImageList from "../components/UI/StyledImageList";
import { getRoomateRequestByUserEmailAndApartmentId } from "../controller/RoomateRequestController";
import { CasinoSharp } from "@mui/icons-material";
import { getUserProfileByEmail } from "../controller/userProfileController";

const btnstyle = {
  background: "#4F4E51",
  height: "50px",
  color: "#D0D2D8",
};

const Topic = ({ label, value }) => (
  <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1.5 }}>
    <Typography sx={{ padding: "2px 8px", fontWeight: 600, fontSize: 18 }}>
      {label}
    </Typography>
    <Typography sx={{ fontSize: 14 }}>{value}</Typography>
  </Box>
);

const yesNoOptions = ["yes", "no"];
const genderOptions = ["male", "female", "all"];

const Apartment = (props) => {
  const { setPageTitle } = useContext(pageTitleContext);
  const { userRole, userEmail } = useContext(authContext);
  const { apartmentId } = useParams();
  const { ap } = props;
  const navigate = useNavigate();
  const [appartment, setAppartment] = useState("");

  const [editMode, setEditMode] = useState(false);

  const [editableAge, setEditableAge] = useState();
  const [editablePrice, setEditablePrice] = useState();
  const [editableGender, setEditableGender] = useState();
  const [editableElevator, setEditableElevator] = useState();
  const [editableParking, setEditableParking] = useState();
  const [editableSmoking, setEditableSmoking] = useState();

  const [openSnackbar, setOpensnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [requestStatus, setRequestStatus] = useState(false);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); //for delay

  const getAppartmentDetailsById = async () => {
    const res = await getAppartmentById(apartmentId);
    if (!res || res.status === 204) {
      setSnackbarMessage("We couldn't find the appartment , please try again");
      setAlertSeverity("error");
      setOpensnackbar(true);
      await delay(1500);
      navigate(-1);
      return;
    }
    if (res.status === 403) {
      alert("Something went wrong");
    } else if (res.status === 200) {
      setAppartment(res.data);

      setEditableAge(res.data.age_range);
      setEditablePrice(res.data.price_range);
      setEditableGender(res.data.gender);
      setEditableElevator(res.data.elevator);
      setEditableParking(res.data.parking);
      setEditableSmoking(res.data.smoking);
    }
  };

  const handleEditApartment = () => {
    if (editMode) {
      const confirmSave = window.confirm(
        "Are you sure you want to save your changes?"
      );
      if (confirmSave) {
        onSubmitHandler();
      }
    }
    setEditMode(!editMode);
  };

  useEffect(() => {
    checkIfRequestExists();
    setPageTitle("Apartment");
    if (ap) {
      setAppartment(ap);
    } else {
      getAppartmentDetailsById();
    }
    // Set timeout for console log
    const timeout = setTimeout(() => {
      console.log("images", appartment);
    }, 2000);
    console.log("images", appartment);
  }, []);

  const checkIfRequestExists = async () => {
    const res = await getRoomateRequestByUserEmailAndApartmentId(
      userEmail,
      apartmentId
    );
    if (res && res.status == 200) {
      if (res.data.length > 0) {
        setRequestStatus(false);
      } else {
        setRequestStatus(true);
      }
    } else {
      setRequestStatus(true);
    }
  };

  const sendRequest = async () => {
    const request = {
      appartment_id: apartmentId,
      user_email: userEmail,
    };
    const res = await createRoomateRequest(request);
    if (!res || res.status === 400 || res.status === 403) {
      setSnackbarMessage("The appartment does not found- try again!");
      setAlertSeverity("error");
      setOpensnackbar(true);
      await delay(1500);
      navigate("/");
      return;
    }
    if (res.status === 201) {
      setSnackbarMessage("Your request was send");
      setAlertSeverity("success");
      setOpensnackbar(true);
      await delay(1500);
      navigate("/");
    }
  };

  const handleAgeChange = (event, newValue) => {
    setEditableAge(newValue);
  };

  const handlePriceChange = (event, newValue) => {
    setEditablePrice(newValue);
  };

  const onSubmitHandler = async (event) => {
    const user_email = userEmail;
    if (
      user_email !== "" &&
      editablePrice !== "" &&
      editableAge !== "" &&
      editableGender !== "" &&
      editableElevator !== "" &&
      editableParking !== "" &&
      editableSmoking !== ""
    ) {
      const userProfileData = {
        id: apartmentId,
        email: user_email,
        age_range: editableAge,
        price_range: editablePrice,
        smoking: editableSmoking,
        gender: editableGender,
        parking: editableParking,
        elevator: editableElevator,
      };
      const userExists = await getUserProfileByEmail(userEmail);
      if (userExists) {
        const result = await updateAppartment(userProfileData);
        if (result.status === 201) {
          getAppartmentDetailsById();
          setTimeout(() => {
            alert("Your apartment have been updated!");
          }, 500);
          console.log(result.status);
        } else {
          alert("Something went wrong - try again!");
        }
      } else {
        alert("User does not exist.");
      }
    } else {
      alert("Please fill in all the fields.");
    }
  };


  return (
    <Grid
      item
      container
      sx={{ margin: "auto", justifyContent: "center" }}
      xs={12}
      md={10}
    >
      <Grid container marginTop={5}>
        {openSnackbar && (
          <SnackBarAlerts
            snackbarMessage={<Typography>{snackbarMessage}</Typography>}
            open={openSnackbar}
            severity={alertSeverity}
          />
        )}
        {appartment ? (
          <Grid
            item
            container
            spacing={1}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              sx={{
                display: "flex",
                alignItems: "center",
                marginLeft: "70px",
                gap: "10px",
                color: "black",
                fontWeight: "bold",
              }}
            >
              <Typography align="center" sx={{ fontSize: 40 }}>
                <LocationOnOutlinedIcon
                  fontSize="large"
                  sx={{ color: "black", fontWeight: "bold" }}
                />

                {appartment.location.name}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              sx={{ margin: "auto" }}
            >
              <StyledImageList images={appartment.images} />
            </Grid>
            <Grid
              item
              xs={12}
              sm={9}
              sx={{
                backgroundColor: "ButtonShadow",
                borderRadius: 3,
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 3,
              }}
            >
              <Grid
                item
                container
                sm={9}
                sx={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "flex",
                  direction: "warp",
                  justifyContent: "center",
                }}
              >
                <Grid
                  item
                  xs={12}
                  sm={3}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <AccountCircleOutlinedIcon sx={{ paddingBottom: "15px" }} />
                  {editMode ? (
                    <CardContent>
                      <Slider
                        getAriaLabel={() => "Age range"}
                        value={editableAge}
                        onChange={handleAgeChange}
                        valueLabelDisplay="auto"
                        min={18}
                        max={75}
                        size="small"
                        sx={{ color: "black" }}
                      />
                      <Typography>
                        The range of ages: {`${editableAge[0]}`}-{`${editableAge[1]}`} $
                      </Typography>
                    </CardContent>
                  ) : (
                    <Topic
                      label="Age:"
                      value={
                        editableAge[0] + " - " + editableAge[1]
                      }
                    />
                  )}
                </Grid>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ color: "black", marginTop: 1, marginBottom: 1 }}
                />
                <Grid
                  item
                  xs={12}
                  sm={3}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <AttachMoneyOutlinedIcon sx={{ paddingBottom: "15px" }} />
                  {editMode ? (
                    <CardContent>
                      <Slider
                        getAriaLabel={() => "Price range"}
                        value={editablePrice}
                        onChange={handlePriceChange}
                        valueLabelDisplay="auto"
                        min={1000}
                        max={10000}
                        size="small"
                        sx={{ color: "black" }}
                      />
                      <Typography>
                        The range of prices: {`${editablePrice[0]}`}-{`${editablePrice[1]}`} $
                      </Typography>
                    </CardContent>
                  ) : (
                    <Topic
                      label="Price:"
                      value={
                        editablePrice[0] +
                        "$ - " +
                        editablePrice[1] +
                        "$"
                      }
                    />
                  )}

                </Grid>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ color: "black", marginTop: 1, marginBottom: 1 }}
                />
                <Grid
                  item
                  xs={12}
                  sm={3}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <TransgenderOutlinedIcon sx={{ paddingBottom: "15px" }} />

                  {editMode ? (
                    <div>
                      <label htmlFor="editableGender">Gender:</label>
                      <select
                        id="editableGender"
                        value={editableGender}
                        onChange={(e) => setEditableGender(e.target.value)}
                      >
                        {genderOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <Topic label="Gender:" value={editableGender} />
                  )}
                </Grid>
              </Grid>

              <Divider
                orientation="horizontal"
                flexItem
                sx={{ color: "black", marginRight: 1, marginLeft: 1 }}
              />

              <Grid
                item
                container
                sm={9}
                sx={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "flex",
                  direction: "warp",
                  justifyContent: "center",
                }}
              >
                <Grid
                  item
                  xs={12}
                  sm={3}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <ElevatorOutlinedIcon sx={{ paddingBottom: "15px" }} />
                  {editMode ? (
                    <div>
                      <label htmlFor="editableElevator">Elevator:</label>
                      <select
                        id="editableElevator"
                        value={editableElevator}
                        onChange={(e) => setEditableElevator(e.target.value)}
                      >
                        {yesNoOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <Topic label="Elevator:" value={editableElevator} />
                  )}
                </Grid>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ color: "black", marginTop: 1, marginBottom: 1 }}
                />
                <Grid
                  item
                  xs={12}
                  sm={3}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <LocalParkingOutlinedIcon sx={{ paddingBottom: "15px" }} />
                  {editMode ? (
                    <div>
                      <label htmlFor="editableParking">Parking:</label>
                      <select
                        id="editableParking"
                        value={editableParking}
                        onChange={(e) => setEditableParking(e.target.value)}
                      >
                        {yesNoOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <Topic label="Parking:" value={editableParking} />
                  )}
                </Grid>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ color: "black", marginTop: 1, marginBottom: 1 }}
                />
                <Grid
                  item
                  xs={12}
                  sm={3}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <SmokingRoomsOutlinedIcon sx={{ paddingBottom: "15px" }} />
                  {editMode ? (
                    <div>
                      <label htmlFor="editableSmoking">Smoking:</label>
                      <select
                        id="editableSmoking"
                        value={editableSmoking}
                        onChange={(e) => setEditableSmoking(e.target.value)}
                      >
                        {yesNoOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <Topic label="Smoking:" value={editableSmoking} />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          ""
        )}

        <Grid item container sm={8}>
          <Divider
            orientation="horizontal"
            sx={{
              color: "black",
              marginRight: 1,
              marginLeft: 1,
              marginTop: 3,
              marginBottom: 3,
            }}
          />
          <Grid
            item
            sx={{
              paddingTop: "10px",
              borderRadius: 3,
            }}
            sm={12}
          >
            <Typography
              sx={{
                paddingBottom: "10px",
                fontWeight: 500,
                fontSize: "25px",
                marginLeft: "70px",
              }}
            >
              About The Appartment:
            </Typography>
            <Typography
              sx={{
                paddingBottom: "10px",
                marginLeft: "80px",
                marginRight: "auto",
              }}
            >
              {appartment.summary}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={12}>
        <CardContent>
          <Typography
            sx={{
              paddingBottom: "10px",
              fontWeight: 500,
              fontSize: "25px",
              marginLeft: "70px",
            }}
          >
            The Appartment Rommates:
          </Typography>
          <Stack sx={{ justifyContent: "center" }} direction="row" spacing={4}>
            {appartment.roomates && appartment.roomates.length != 0
              ? appartment.roomates.map((item, index) => {
                return (
                  <RoomateAvatar email={item} key={index}></RoomateAvatar>
                );
              })
              : ""}
          </Stack>
        </CardContent>
      </Grid>
      <Grid item sm={12} sx={{ textAlign: "-webkit-center" }}></Grid>

      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          marginTop: "1rem",
        }}
      >
        {userEmail != appartment.email &&
          userRole === "Looker" &&
          requestStatus && (
            <Button
              variant="contained"
              onClick={sendRequest}
              style={btnstyle}
              sx={{ width: "400px", marginBottom: "20px" }}
            >
              I LOVE THIS APARTMENT, SEND REQUEST
            </Button>
          )}
        {userEmail != appartment.email &&
          userRole === "Looker" &&
          !requestStatus && (
            <Button
              variant="contained"
              disabled
              style={{ background: "#357f354a", color: "black" }}
              sx={{ width: "400px", marginBottom: "20px" }}
            >
              YOUR REQUEST WAS SENT
            </Button>
          )}
        {userRole === "Welcomer" && userEmail == appartment.email ? (
          <Button
            variant="contained"
            style={btnstyle}
            sx={{ width: "300px", marginTop: "30px" }}
            onClick={handleEditApartment}
          >
            {editMode ? "SAVE APARTMENT" : "EDIT APARTMENT"}
          </Button>
        ) : (
          ""
        )}
      </Box>
    </Grid>
  );
};

export default Apartment;
