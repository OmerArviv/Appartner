import { useState, useContext, useEffect } from "react";
import {getRoomateRequestByUserEmail} from "../controller/RoomateRequestController";
import ApartmentListItem from "../components/ApartmentListItem";
import { authContext, pageTitleContext } from "../APP/Utils";
import { ListItem, Box, Button, IconButton } from "@mui/material";
import {getAppartmentById} from "../controller/appartmentController";
import { Stack } from "@mui/system";
import LookerRequestItem from "../components/LookerRequestItem";

const LookerRequestsPage=()=>{
  const { setPageTitle } = useContext(pageTitleContext);
const [userRequests, setUserRequests]= useState();
const { userEmail } = useContext(authContext);
const [apartments, setApartments]= useState([]);
const [apartmentsID, setApartmentsID]= useState([]);

const tmpApartmentsID=[];

useEffect(()=>{
    getUserRequests();
    // getAllUserRequestsApartments();
    setPageTitle("Your Requests");
    // getAllUserRequestsApartments();
},[]);

useEffect(()=>{
  getUserRequests();
  // getAllUserRequestsApartments();
},[userRequests]);

// useEffect(()=>{
//   getAllUserRequestsApartments();
//   // getAllUserRequestsApartments();
// },[apartmentsID]);

const getUserRequests= async ()=>{
    const res= await getRoomateRequestByUserEmail(userEmail);
    if(res){
        setUserRequests(res); 
    }
    // else{
    //   console.log("can't get the user requests");
    // }
    if(userRequests){
      userRequests.forEach((item, index)=>{
        tmpApartmentsID.push(item.appartment_id);
      });
      setApartmentsID(tmpApartmentsID);
    }
    // if(apartmentsID){
    //   const tmpApa=[]

    //   for (let i = 0; i < apartmentsID.length; i++) {
    //     const ap=await getAppartmentById(apartmentsID[i]);
    //     if(ap){
    //       tmpApa.push(ap);
    //     }
    //   }
    //   // console.log("apartments");
    //   // console.log(apartments);
    //   setApartments(tmpApa);
    // }
    // getAllUserRequestsApartments();

}

const getAllUserRequestsApartments= async()=>{
    if(apartmentsID){
      const tmpApa=[]

      for (let i = 0; i < apartmentsID.length; i++) {
        const ap=await getAppartmentById(apartmentsID[i]);
        if(ap){
          tmpApa.push(ap);
        }
      }
      // console.log("apartments");
      // console.log(apartments);
      setApartments(tmpApa);
            // console.log(apartments);

    }
}


return(
<div>
    {userRequests  ?
    userRequests.map((item, index)=>{
      // console.log(item);
      return(      
      <LookerRequestItem request={item} key={index}/>
      )
    })
      
    // apartments.map((item, index) => {

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
 : "You don't have requests"}
</div>);


}

export default LookerRequestsPage;