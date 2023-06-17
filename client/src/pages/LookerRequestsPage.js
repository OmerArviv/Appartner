import { useState, useContext, useEffect } from "react";
import { getRoomateRequestByUserEmail } from "../controller/RoomateRequestController";
import { authContext, pageTitleContext } from "../APP/Utils";
import LookerRequestItem from "../components/LookerRequestItem";
import ForumIcon from "@mui/icons-material/Forum";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
} from "@mui/material";

const LookerRequestsPage = () => {
  const { setPageTitle } = useContext(pageTitleContext);
  const [userRequests, setUserRequests] = useState();
  const [loading, setLoading] = useState(true);
  const { userEmail } = useContext(authContext);
  const navigate = useNavigate();
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); //for delay

  const tmpApartmentsID = [];

  useEffect(() => {
    setPageTitle("Your Requests");
    getUserRequests();
  }, []);

  useEffect(() => {
    getUserRequests();
  }, [userRequests]);

  const getUserRequests = async () => {
    const res = await getRoomateRequestByUserEmail(userEmail);
    if (res) {
      setUserRequests(res);
      await delay(1000);
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        marginTop: "30px",
      }}
    >
      {loading ? (
        <CircularProgress
          sx={{
            marginLeft: "50%",
          }}
        />
      ) : userRequests != 0 ? (
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
              alignItems: "center",
              borderColor: "darkgray",
              marginBottom: "15px",
              marginLeft: "37%",
            }}
            onClick={() => navigate("/messenger")}
            startIcon={<ForumIcon fontSize="large" />}
            variant="outlined"
            iconSizeLarge
          >
            Let's go chat with welcomers!
          </Button>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            sx={{ justifyContent: "center" }}
            alignItems="center"
            flexWrap="wrap"
          >
            {userRequests.map((item, index) => (
              <div item key={index}>
                <LookerRequestItem request={item} />
              </div>
            ))}
          </Stack>
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
            You don't have any requests from welcomers —{" "}
            <strong>check it out soon again!</strong>
          </Alert>
        </>
      )}
    </Box>
  );
};

export default LookerRequestsPage;
