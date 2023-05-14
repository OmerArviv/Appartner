import { useContext, useEffect, useState } from "react";
import { authContext, pageTitleContext } from "../APP/Utils";
import RequestItem from "../components/RequestItem";
import { Grid } from "@mui/material";
import { getRoomateRequestByAppartmentUserEmail } from "../controller/RoomateRequestController";

const WelcomerHomePage = () => {
  const { setPageTitle } = useContext(pageTitleContext);
  const { userEmail } = useContext(authContext);
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    setPageTitle("Requests");
    getAppartmentRequests();
  }, []);

  const getAppartmentRequests = async () => {
    const res = await getRoomateRequestByAppartmentUserEmail(userEmail);
    if (res) {
      setRequests(res);
    }
  };

  return (
    <Grid>
      {requests.length != 0
        ? requests.map((item, index) => {
            return <RequestItem request={item} key={index}></RequestItem>;
          })
        : ""}
    </Grid>
  );
};

export default WelcomerHomePage;
