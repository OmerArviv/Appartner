import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Paper,
  Button,
  CardContent,
  Stack,
} from "@mui/material";
import { styled } from "@mui/system";
import { pageTitleContext, authContext } from "../APP/Utils";
import UserCarousel from "../components/UserCarousel";
import { useParams } from "react-router";
import { getAppartmentById } from "../controller/appartmentController";
import { useNavigate } from "react-router";
import RoomateAvatar from "../components/RoomateAvatar";
import { createRoomateRequest } from "../controller/RoomateRequestController";

const RoundedPicture = ({ src, alt, text }) => (
  <Box
    sx={{
      position: "relative",
      display: "inline-block",
      textAlign: "center",
      marginRight: 2,
    }}
  >
    <Box
      sx={{ borderRadius: "50%", overflow: "hidden", display: "inline-block" }}
    >
      <img src={src} alt={alt} style={{ width: "100%", height: "auto" }} />
    </Box>
    <Typography variant="h6" fontWeight="bold" sx={{ marginTop: 1 }}>
      {text}
    </Typography>
  </Box>
);

const btnstyle = {
  background: "#4F4E51",
  height: "50px",
  color: "#D0D2D8",
};

const Topic = ({ label, value }) => (
  <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
    <Paper sx={{ padding: "2px 8px", marginRight: 1, bgcolor: "#fff7e9" }}>
      <Typography variant="h6">{label}</Typography>
    </Paper>
    <Typography variant="h6">{value}</Typography>
  </Box>
);

const apartmentImages = [
  "https://picsum.photos/300/101",
  "https://picsum.photos/300/102",
  "https://picsum.photos/300/103",
  "https://picsum.photos/300/104",
];

const Apartment = () => {
  const { setPageTitle } = useContext(pageTitleContext);
  const { userRole, userId, userEmail } = useContext(authContext);
  const { apartmentId } = useParams();
  const navigate = useNavigate();

  const [appartment, setAppartment] = useState("");

  const getAppartmentDetailsById = async () => {
    const res = await getAppartmentById(apartmentId);
    if (!res || res.status == 204) {
      alert("We couldn't find the appartment , please try again");
      navigate(-1);
      return;
    }
    if (res.status == 403) {
      alert("Something went wrong");
    } else if (res.status == 200) {
      setAppartment(res.data);
      console.log(res.data);
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
      alert("something went wrong");
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
          marginTop={15}
        >
          <Grid item xs={12}>
            {appartment ? (
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                spacing={2}
              >
                <Grid item xs={12} sm={5}>
                  <Box sx={{ height: 450 }}>
                    <UserCarousel
                      apartmentImages={appartment.images}
                      height={300}
                    />
                  </Box>
                  <CardContent>
                    <Stack direction="row" spacing={2}>
                      {appartment.roomates.length != 0
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
                  <Box sx={{ height: 450 }}>
                    <Topic
                      label="Age:"
                      value={
                        appartment.age_range[0] +
                        " - " +
                        appartment.age_range[1]
                      }
                    />
                    <Topic label="Location:" value={appartment.location} />
                    <Topic
                      label="Price:"
                      value={
                        appartment.price_range[0] +
                        "$ - " +
                        appartment.price_range[1] +
                        "$/month"
                      }
                    />
                    <Topic label="Gender:" value={appartment.gender} />
                    <Topic label="Elevator:" value={appartment.elevator} />
                    <Topic label="Parking:" value={appartment.parking} />
                    <Topic label="Smoking:" value={appartment.smoking} />
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
          {userRole === "Welcomer" && userId == appartment._id ? (
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
