import { useContext, useEffect, useState } from "react";
import { authContext, pageTitleContext } from "../APP/Utils";
import RequestItem from "../components/RequestItem";
import { Grid } from "@mui/material";
import { getRoomateRequestByAppartmentId } from "../controller/RoomateRequestController";
import { getAppartmentByUserEmail } from "../controller/appartmentController";

const WelcomerHomePage = () => {
  const { setPageTitle } = useContext(pageTitleContext);
  const { userEmail } = useContext(authContext);
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    setPageTitle("Requests");
    getAppartmentRequests();
  }, []);

  const getAppartmentRequests = async () => {
    const res = await getAppartmentByUserEmail(userEmail);
    if (res) {
      if (res.status == 200) {
        const appartments = res.data;
        for (let i = 0; i < appartments.length; i++) {
          const req = await getRoomateRequestByAppartmentId(appartments[i]._id);
          if (req && req.status == 200) {
            setRequests(...requests, req.data);
          }
        }
      }
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
