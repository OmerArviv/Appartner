import { Box, Skeleton, IconButton, Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { getAppartmentById } from "../controller/appartmentController";
import { deleteRoomateRequestByUser } from "../controller/RoomateRequestController";
import { useEffect, useState } from "react";
import ApartmentListItem from "./ApartmentListItem";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import { getUserByEmail } from "../controller/authenticationController";
import ContactPhoneOutlinedIcon from "@mui/icons-material/ContactPhoneOutlined";

function LookerRequestItem(props) {
  const request = props.request;
  const [apartment, setApartment] = useState();
  const [phone, setPhone] = useState();

  useEffect(() => {
    getRequestApartment();
    getPhoneNumber();
  }, []);

  const getRequestApartment = async () => {
    const res = await getAppartmentById(request.appartment_id);
    if (res) {
      setApartment(res.data);
    }
  };

  const getPhoneNumber = async () => {
    const res = await getUserByEmail(request.user_email);
    if (res) {
      setPhone(res.phone_number);
    }
  };

  const onDeleteHandler = async (event) => {
    event.preventDefault();
    if (request._id !== "") {
      const result = await deleteRoomateRequestByUser(request._id);
      if (!result) {
        alert("something went wrong");
      }
    }
  };

  const getStatusBoxStyle = () => {
    let style = {
      width: "100px",
      height: "50px",
      color: "black",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "5px",
    };

    if (request.status === "accepted") {
      style.background = "#B9E3A4";
    } else if (request.status === "pending") {
      style.background = "#ffa5006e";
    } else if (request.status === "ignored") {
      style.background = "#EA8E8D";
    }

    return style;
  };

  const getStatusLabel = () => {
    return request.status.toUpperCase();
  };

  return (
    <div>
      {apartment ? (
        <>
          <Grid
            container
            sx={{ marginTop: "30px", alignItems: "center", m: 3 }}
          >
            <Grid item xs={4}>
              <div style={getStatusBoxStyle()}>{getStatusLabel()}</div>
            </Grid>
            <Grid item xs={5} sx={{ display: "flex", alignItems: "center" }}>
              {request.status === "accepted" && (
                <>
                  <ContactPhoneOutlinedIcon
                    style={{ fontSize: 30, margin: 5 }}
                  />
                  <Typography>{phone}</Typography>
                </>
              )}
            </Grid>
            <Grid item xs={2}>
              {request.status === "pending" && (
                <IconButton
                  sx={{
                    height: 40,
                    width: 40,
                    color: "black",
                  }}
                  onClick={onDeleteHandler}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Grid>
          </Grid>
          <ApartmentListItem data={apartment}></ApartmentListItem>
        </>
      ) : (
        <Skeleton>
          <Box></Box>
        </Skeleton>
      )}
    </div>
  );
}

LookerRequestItem.propTypes = {
  request: PropTypes.object.isRequired,
};

export default LookerRequestItem;
