import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Button,
  CardContent,
  Stack,
  Divider,
} from "@mui/material";
import { pageTitleContext, authContext } from "../APP/Utils";
import UserCarousel from "../components/UserCarousel";
import { useParams } from "react-router";
import { getAppartmentById } from "../controller/appartmentController";
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

const btnstyle = {
  background: "#4F4E51",
  height: "50px",
  color: "#D0D2D8",
};

const Topic = ({ label, value }) => (
  <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1.5}}>
    <Typography
      sx={{ padding: "2px 8px", fontWeight: 600, fontSize: 18 }}
    >
      {label}
    </Typography>
    <Typography sx={{ fontSize: 14 }}>{value}</Typography>
  </Box>
);

const Apartment = (props) => {
  const { setPageTitle } = useContext(pageTitleContext);
  const { userRole, userEmail } = useContext(authContext);
  const { apartmentId } = useParams();
  const { ap } = props;
  const navigate = useNavigate();
  const [appartment, setAppartment] = useState("");
  const [openSnackbar, setOpensnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const delay = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms)); //for delay

  const getAppartmentDetailsById = async () => {
    const res = await getAppartmentById(apartmentId);
    // console.log(res.data);
    if (!res || res.status === 204) {
      setSnackbarMessage("We couldn't find the appartment , please try again");
      setAlertSeverity("error");
      setOpensnackbar(true);
      await delay(2500);
      navigate(-1);
      return;
    }
    if (res.status === 403) {
      alert("Something went wrong");
    } else if (res.status === 200) {
      setAppartment(res.data);
    }
  };

  useEffect(() => {
    setPageTitle("Apartment");
    if (ap) {
      setAppartment(ap);
    } else {
      getAppartmentDetailsById();
    }
  }, []);

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
      await delay(2500);
      navigate("/");
      return;
    }
    if (res.status === 201) {
      setSnackbarMessage("Your request was send");
      setAlertSeverity("success");
      setOpensnackbar(true);
      await delay(2500);
      navigate("/");
    }
  };

  return (
    <Grid
      container
      sx={{ margin: "auto", justifyContent: "center" }}
      xs={12}
      sm={12}
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
          <Grid container="true" spacing={1} 
          sx={{
            display: "flex",
            alignItems: "center",
          }}>
            <Grid
            item="true"
            xs={12}
            sm={12}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft:"70px",
                    gap: "10px",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  <Typography align="center"
                  sx={{fontSize:40}}>
                  <LocationOnOutlinedIcon fontSize="large" sx={{ color: "black", fontWeight:"bold"}}/>

                    {appartment.location.name}
                  </Typography>
                </Grid>
                
                {/* images */}
            <Grid
              item="true"
              xs={12}
              sm={12}
              // sx={{ margin: "auto", textAlign: "-webkit-right" }}
              sx={{ margin: "auto"}}>
                <StyledImageList images={appartment.images}/>
            </Grid>

            {/* properties of the appartment */}
            <Grid
            item="true"
            xs={12}
            sm={9}
            sx={{backgroundColor:"ButtonShadow", borderRadius:3, marginLeft:"auto", marginRight:"auto", marginTop:3}}>
              <Grid container="true" sm={9}
               sx={{marginLeft:"auto", marginRight:"auto",  display:"flex", direction:"warp", 
               justifyContent:"center"}}>
              <Grid
               item="true"
               xs={12}
               sm={3}
                     sx={{
                       display: "flex",
                       alignItems: "center",
                       marginLeft:"auto",
                       marginRight:"auto",
                     }}>
                         <AccountCircleOutlinedIcon sx={{ paddingBottom: "15px" }} />
                        <Topic
                        label="Age:"
                        value={
                          appartment.age_range[0] + " - " + appartment.age_range[1]
                        }/>
                </Grid>
                <Divider  orientation="vertical" flexItem sx={{color:"black", marginTop:1, marginBottom:1}}/>
                <Grid
               item="true"
               xs={12}
               sm={3}
                     sx={{
                       display: "flex",
                       alignItems: "center",
                       marginLeft:"auto",
                       marginRight:"auto",
                     }}>
                        <AttachMoneyOutlinedIcon sx={{ paddingBottom: "15px" }} />
                        <Topic
                          label="Price:"
                          value={
                            appartment.price_range[0] +
                            "$ - " +
                            appartment.price_range[1] +
                            "$"
                          }
                        />
                </Grid>
                <Divider  orientation="vertical" flexItem sx={{color:"black", marginTop:1, marginBottom:1}}/>
                <Grid
                    item="true"
                    xs={12}
                    sm={3}
                    sx={{
                       display: "flex",
                       alignItems: "center",
                       marginLeft:"auto",
                       marginRight:"auto",
                     }}>
                        <TransgenderOutlinedIcon sx={{ paddingBottom: "15px" }} />
                        <Topic label="Gender:" value={appartment.gender} />
                </Grid>
              </Grid>
            
                <Divider orientation="horizontal" flexItem sx={{color:"black",marginRight:1, marginLeft:1, }}/>

                <Grid container="true" sm={9}
                sx={{marginLeft:"auto", marginRight:"auto",  display:"flex", direction:"warp", 
                justifyContent:"center"}}>
                <Grid
               item="true"
               xs={12}
               sm={3}
                     sx={{
                       display: "flex",
                       alignItems: "center",
                       marginLeft:"auto",
                       marginRight:"auto",
                     }}>
                        <ElevatorOutlinedIcon sx={{ paddingBottom: "15px" }} />
                        <Topic label="Elevator:" value={appartment.elevator} />
                </Grid>
                <Divider  orientation="vertical" flexItem sx={{color:"black", marginTop:1, marginBottom:1}}/>
                <Grid
               item="true"
               xs={12}
               sm={3}
                     sx={{
                       display: "flex",
                       alignItems: "center",
                       marginLeft:"auto",
                       marginRight:"auto",
                     }}>
                        <LocalParkingOutlinedIcon sx={{ paddingBottom: "15px" }} />
                        <Topic label="Parking:" value={appartment.parking} />
                </Grid>
                <Divider  orientation="vertical" flexItem sx={{color:"black", marginTop:1, marginBottom:1}}/>
                <Grid
               item="true"
               xs={12}
               sm={3}
                     sx={{
                       display: "flex",
                       alignItems: "center",
                       marginLeft:"auto",
                       marginRight:"auto",
                     }}>
                        <SmokingRoomsOutlinedIcon sx={{ paddingBottom: "15px" }} />
                  <Topic label="Smoking:" value={appartment.smoking} />
                </Grid>
                </Grid>
                
              </Grid>
          </Grid>
        ) : (
          ""
        )}
       
      

        <Grid container="true"sm={8}

        
        >
        <Divider orientation="horizontal" sx={{color:"black",marginRight:1, marginLeft:1, marginTop:3, marginBottom:3}}/>
          <Grid
            sx={{
              paddingTop: "10px", borderRadius:3,
            }}
            sm={12}
          >
            <Typography sx={{ paddingBottom: "10px", fontWeight:500, fontSize:"25px", marginLeft:"70px" }}>About The Appartment:</Typography>
            <Typography sx={{ paddingBottom: "10px", marginLeft:"80px", marginRight:"auto" }}>
              {appartment.summary}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid sm={12}>
        <CardContent>
        <Typography sx={{ paddingBottom: "10px", fontWeight:500, fontSize:"25px", marginLeft:"70px" }}>The Appartment Rommates:</Typography>
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
      <Grid sm={12} sx={{ textAlign: "-webkit-center" }}>
        
      </Grid>

      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          marginTop: "1rem",
        }}
      >
        {userRole === "Looker" ? (
          <Button
            variant="contained"
            onClick={sendRequest}
            style={btnstyle}
            sx={{ width: "400px", marginBottom: "20px" }}
          >
            I LOVE THIS APARTMENT, SEND REQUEST
          </Button>
        ) : (
          ""
        )}
        {userRole === "Welcomer" && userEmail == appartment.email ? (
          <Button
            variant="contained"
            onClick={() => navigate("/create-apartment")}
            style={btnstyle}
            sx={{ width: "400px", marginBottom: "20px" }}
          >
            EDIT APPARTMENT
          </Button>
        ) : (
          ""
        )}
      </Box>
    </Grid>
  );
};

export default Apartment;
