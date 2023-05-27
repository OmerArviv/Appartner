import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Button,
  CardContent,
  Stack,
  TextField,
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

const btnstyle = {
  background: "#4F4E51",
  height: "50px",
  color: "#D0D2D8",
};

const Topic = ({ label, value }) => (
  <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1.5 }}>
    <Typography
      sx={{ padding: "2px 8px", marginRight: 1, fontWeight: 600, fontSize: 20 }}
    >
      {label}
    </Typography>
    <Typography sx={{ fontSize: 18 }}>{value}</Typography>
  </Box>
);

const Apartment = () => {
  const { setPageTitle } = useContext(pageTitleContext);
  const { userRole, userEmail } = useContext(authContext);
  const { apartmentId } = useParams();
  const navigate = useNavigate();

  const [appartment, setAppartment] = useState("");

  const getAppartmentDetailsById = async () => {
    const res = await getAppartmentById(apartmentId);
    console.log(res.data);
    if (!res || res.status == 204) {
      alert("We couldn't find the appartment , please try again");
      navigate(-1);
      return;
    }
    if (res.status == 403) {
      alert("Something went wrong");
    } else if (res.status == 200) {
      setAppartment(res.data);
    }
  };

  useEffect(() => {
    setPageTitle("Apartment");
    getAppartmentDetailsById();
  }, []);

  const sendRequest = async () => {
    const request = {
      appartment_id: apartmentId,
      user_email: userEmail,
    };
    const res = await createRoomateRequest(request);
    if (!res || res.status == 400 || res.status == 403) {
      navigate("/");
      return;
    }
    if (res.status == 201) {
      alert("request was send");
    }
  };

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
          marginTop={5}
        >
          <Grid item xs={12}>
            {appartment ? (
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                spacing={10}
              >
                <Grid item xs={12} sm={5}>
                  <Box sx={{ height: 450, width: 450 }}>
                    <UserCarousel
                      apartmentImages={appartment.images}
                      height={300}
                    />
                  </Box>
                  <CardContent>
                    <Stack direction="row" spacing={4}>
                      {appartment.roomates && appartment.roomates.length != 0
                        ? appartment.roomates.map((item, index) => {
                          return (
                            <RoomateAvatar
                              email={item}
                              key={index}
                            ></RoomateAvatar>
                          );
                        })
                        : ""}
                    </Stack>
                  </CardContent>
                </Grid>
                <Grid item xs={12} sm={2} />
                <Grid item xs={12} sm={5}>
                  <Box sx={{ height: 500 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <AccountCircleOutlinedIcon
                        sx={{ paddingBottom: "15px" }}
                      />
                      <Topic
                        label="Age:"
                        value={
                          appartment.age_range[0] +
                          " - " +
                          appartment.age_range[1]
                        }
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <LocationOnOutlinedIcon sx={{ paddingBottom: "15px" }} />
                      <Topic label="Location:" value={appartment.location.name} />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
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
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <TransgenderOutlinedIcon sx={{ paddingBottom: "15px" }} />
                      <Topic label="Gender:" value={appartment.gender} />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <ElevatorOutlinedIcon sx={{ paddingBottom: "15px" }} />
                      <Topic label="Elevator:" value={appartment.elevator} />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <LocalParkingOutlinedIcon
                        sx={{ paddingBottom: "15px" }}
                      />
                      <Topic label="Parking:" value={appartment.parking} />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <SmokingRoomsOutlinedIcon
                        sx={{ paddingBottom: "15px" }}
                      />
                      <Topic label="Smoking:" value={appartment.smoking} />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
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
              // onClick={onSubmitHandler}
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
    </Grid>
  );
};

export default Apartment;
