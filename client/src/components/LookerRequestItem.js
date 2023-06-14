import { Box, Skeleton, IconButton } from "@mui/material";
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
      console.log(phone);
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
      color: "white",
      fontWeight: "bold",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "5px",
    };

    if (request.status === "accepted") {
      style.background = "green";
    } else if (request.status === "pending") {
      style.background = "orange";
    } else if (request.status === "ignored") {
      style.background = "red";
    }

    return style;
  };

  const getStatusLabel = () => {
    return request.status.toUpperCase();
  };

  return (
    <div>
      {apartment ? (
        <Box
          container="true"
          xs={4}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            width: "auto",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Box
            item="true"
            xs={4}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              width: "auto",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <ApartmentListItem data={apartment}></ApartmentListItem>
          </Box>
          <Box
            item="true"
            xs={4}
            sx={{
              display: "flex",
              marginRight: "auto",
              alignItems: "center",
            }}
          >
            <div style={getStatusBoxStyle()}>{getStatusLabel()}</div>
            <ContactPhoneOutlinedIcon
              style={{ fontSize: 30, margin: 5, paddingLeft: "20px" }}
            />
            <Typography>{phone}</Typography>
            <br />
            {request.status === "pending" && (
              <IconButton
                sx={{
                  height: 40,
                  width: 40,
                  color: "black",
                  paddingLeft: "10px",
                }}
                onClick={onDeleteHandler}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
        </Box>
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
