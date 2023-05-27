import { useContext, useEffect, useState } from "react";
import { authContext, pageTitleContext } from "../APP/Utils";
import RequestItem from "../components/RequestItem";
import { Button, Dialog, DialogTitle, Grid } from "@mui/material";
import { getRoomateRequestByAppartmentUserEmail } from "../controller/RoomateRequestController";
import SetPreferncesProfile from "./SetPreferncesProfile";

const btnstyle = {
  background: "#4F4E51",
  color: "#D0D2D8",
};

const WelcomerHomePage = () => {
  const { setPageTitle } = useContext(pageTitleContext);
  const { userEmail } = useContext(authContext);
  const [requests, setRequests] = useState([]);
  const [modalPref, setModalPref] = useState(false);


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
    }
  };

  return (
    <div>
      <Grid>
        {requests.length != 0
          ? requests.map((item, index) => {
            return <RequestItem request={item} key={index}></RequestItem>;
          })
          : ""}
      </Grid>
    </div>
  );
};

export default WelcomerHomePage;
