import { useContext, useEffect, useState } from "react";
import { authContext, pageTitleContext } from "../APP/Utils";
import RequestItem from "../components/RequestItem";
import {
  Alert,
  AlertTitle,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import { getRoomateRequestByAppartmentUserEmail } from "../controller/RoomateRequestController";
import ForumIcon from "@mui/icons-material/Forum";
import { useNavigate } from "react-router-dom";

const btnstyle = {
  background: "#4F4E51",
  color: "#D0D2D8",
};

const WelcomerHomePage = () => {
  const { setPageTitle } = useContext(pageTitleContext);
  const { userEmail } = useContext(authContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalPref, setModalPref] = useState(false);
  const navigate = useNavigate();
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); //for delay

  useEffect(() => {
    setPageTitle("Requests");
    getAppartmentRequests();
  }, []);

  useEffect(() => {
    getAppartmentRequests();
  }, [requests]);

  const handleCloseProfile = () => {
    setModalPref(false);
  };

  const getAppartmentRequests = async () => {
    const res = await getRoomateRequestByAppartmentUserEmail(userEmail);
    if (res) {
      setRequests(res);
      await delay(1000);
      setLoading(false);
    }
  };

  return (
    <div>
      <Grid
        container="true"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "warp",
        }}
      >
        {loading ? (
          <CircularProgress
            sx={{
              marginLeft: "50%",
              marginTop: "30px",
            }}
          />
        ) : requests.length != 0 ? (
          <>
            <Button
              sx={{
                "&:hover": {
                  borderRadius: "4px",
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  color: "darkgray",
                },
                color: "darkgray",
                fontSize: "20px",
                marginRight: "auto",
                height: "fit-content",
                marginTop: "30px",
                marginLeft: "auto",
                borderColor: "darkgray",
              }}
              onClick={() => navigate("/messenger")}
              startIcon={<ForumIcon />}
              variant="outlined"
            >
              Let's go chat!
            </Button>
            {requests.map((item, index) => {
              return <RequestItem request={item} key={index}></RequestItem>;
            })}
          </>
        ) : (
          <>
            <Alert
              severity="info"
              sx={{
                width: "50%",
                marginTop: 3,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <AlertTitle>Info</AlertTitle>
              You don't have any requests from lookers —{" "}
              <strong>check it out soon again!</strong>
            </Alert>
          </>
        )}
      </Grid>
    </div>
  );
};

export default WelcomerHomePage;
