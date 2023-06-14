import { useContext, useEffect, useState } from "react";
import { authContext, pageTitleContext } from "../APP/Utils";
import RequestItem from "../components/RequestItem";
import { Alert, AlertTitle, Button, Dialog, DialogTitle, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { getRoomateRequestByAppartmentUserEmail } from "../controller/RoomateRequestController";
import SetPreferncesProfile from "./SetPreferncesProfile";
import ForumIcon from '@mui/icons-material/Forum';
import { useNavigate } from "react-router-dom";

const btnstyle = {
  background: "#4F4E51",
  color: "#D0D2D8",
};

const WelcomerHomePage = () => {
  const { setPageTitle } = useContext(pageTitleContext);
  const { userEmail } = useContext(authContext);
  const [requests, setRequests] = useState([]);
  const [modalPref, setModalPref] = useState(false);
  const navigate= useNavigate();



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
      {/* <Typography variant="h4" align="center" sx={{ mt: '20px', color: 'ligtblue', fontWeight:"bold" }}>
              Your Requests
      </Typography> */}

      <Grid container="true" sx={{ width:"100%", mt: '10px', display:"flex", flexDirection:"warp"}}>
        {/* <Grid item="true"> */}

        {requests.length != 0
          ? (
            <>
                    <Button
              sx={{
                '&:hover': {
                  borderRadius: '4px',
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  color: "darkgray"
                },
                color: "darkgray", fontSize:"25px",
                marginRight:"auto",height:"fit-content",marginTop:5,
                marginLeft:"auto",
                borderColor:"darkgray"
              }}
              onClick={()=>navigate("/messenger")}
              startIcon={<ForumIcon />}
              variant="outlined"
              >
                
                Let's go chat! 
              </Button>
             {requests.map((item, index) => {
            return <RequestItem request={item} key={index}></RequestItem>;
          })}
            </>
           )
          : 
          <>
            <Alert severity="info" sx={{width:"50%", marginTop:3, marginLeft:"auto", marginRight:"auto"}}>
              <AlertTitle>
              Info
              </AlertTitle>
              You don't have any requests from lookers — <strong>check it out soon again!</strong> 
            </Alert>
          </> 
          }
      </Grid>
    </div>
  );
};

export default WelcomerHomePage;
