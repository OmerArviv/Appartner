import { useState, useContext, useEffect } from "react";
import { getRoomateRequestByUserEmail } from "../controller/RoomateRequestController";
import { authContext, pageTitleContext } from "../APP/Utils";
import LookerRequestItem from "../components/LookerRequestItem";
import ForumIcon from '@mui/icons-material/Forum';
import { useNavigate } from "react-router-dom";
import {Button,Grid } from "@mui/material";


const LookerRequestsPage = () => {
  const { setPageTitle } = useContext(pageTitleContext);
  const [userRequests, setUserRequests] = useState();
  const { userEmail } = useContext(authContext);
  const navigate= useNavigate();

  // const [apartments, setApartments]= useState([]);
  // const [apartmentsID, setApartmentsID]= useState([]);

  const tmpApartmentsID = [];

  useEffect(() => {
    setPageTitle("Your Requests");
    getUserRequests();
  }, []);

  useEffect(() => {
    getUserRequests();
    // getAllUserRequestsApartments();
  }, [userRequests]);

  // useEffect(()=>{
  //   getAllUserRequestsApartments();
  //   // getAllUserRequestsApartments();
  // },[apartmentsID]);

  const getUserRequests = async () => {
    const res = await getRoomateRequestByUserEmail(userEmail);
    if (res) {
      setUserRequests(res);
    }
    // if(userRequests){
    //   userRequests.forEach((item, index)=>{
    //     tmpApartmentsID.push(item.appartment_id);
    //   });
    //   setApartmentsID(tmpApartmentsID);
    // }
    // getAllUserRequestsApartments();
  };

  // const getAllUserRequestsApartments= async()=>{
  //     if(apartmentsID){
  //       const tmpApa=[]

  //       for (let i = 0; i < apartmentsID.length; i++) {
  //         const ap=await getAppartmentById(apartmentsID[i]);
  //         if(ap){
  //           tmpApa.push(ap);
  //         }
  //       }
  //       setApartments(tmpApa);
  //     }
  // }

  return (
    <div>
        <Grid container="true" sx={{ width:"100%", mt: '10px'}}>
            {userRequests
        ? (
          <>
            {   userRequests.map((item, index) => {
            return <LookerRequestItem request={item} key={index} />;
          })}
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
              startIcon={<ForumIcon fontSize="large"/>}
              variant="outlined"
              iconSizeLarge
              >
                
                Let's go chat with welcomers! 
              </Button>
   
          </>
          
       )
        : // apartments.map((item, index) => {

          //             return (
          //               // console.log(item.data)
          //               <Box
          //               key={index}
          //                 direction="row"
          //                 sx={{ display: "block", justifyContent:"center",marginRight:"50%", alignItems:"center", alignContent:"center" }}
          //               >
          //                 <Box item="true">
          //                 <ListItem>
          //                  <ApartmentListItem data={item.data} />
          //                 </ListItem>
          //                 <IconButton></IconButton>
          //                 </Box>
          //               </Box>
          //               )})
          "You don't have requests"}





            </Grid>

         </div>
  );
};

export default LookerRequestsPage;
