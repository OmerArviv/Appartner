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
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
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
              alignItems: "center", // Add this line to center the items vertically
            }}
          >
            <ApartmentListItem data={apartment}></ApartmentListItem>
  
            <Box
              item="true"
              xs={4}
              sx={{
                display: "flex",
                flexDirection: "column", // Change the direction to column
                marginLeft: "20px", // Add some margin for spacing
              }}
            >
              <div style={getStatusBoxStyle()}>{getStatusLabel()}</div>
              <Box
  item="true"
  xs={4}
  sx={{
    display: "flex",
    flexDirection: "row", // Change the direction to row
    // marginLeft: "20px", // Add some margin for spacing
    alignItems: "center", // Align items vertically in the center
  }}
>
  <ContactPhoneOutlinedIcon style={{ fontSize: 30, margin: 5 }} />
  <Typography>{phone}</Typography>
</Box>

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
