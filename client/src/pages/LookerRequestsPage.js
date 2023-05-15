import { useState, useContext, useEffect } from "react";
import {getRoomateRequestByUserEmail} from "../controller/RoomateRequestController";
import ApartmentListItem from "../components/ApartmentListItem";
import { authContext } from "../APP/Utils";
import { ListItem, Box } from "@mui/material";

const LookerRequestsPage=()=>{
const [userRequests, setUserRequest]= useState([]);
const { userEmail } = useContext(authContext);

useEffect(()=>{
    getUserRequests();
},[]);

const getUserRequests= async ()=>{
    const res= await getRoomateRequestByUserEmail(userEmail);
    if(res){
        setUserRequest(res); 
        console.log(res);

    }
    else{
       alert('not working');

        console.log(res);
    }
}


return(<div>
    {userRequests!= [] ? ("yes")
    //  userRequests.map((item, index) => {
    //             return (
    //               <Box
    //                 key={index}
    //                 component="div"
    //                 sx={{ display: "inline", marginRight: "auto" }}
    //               >
    //                 <ListItem>
    //                   <ApartmentListItem data={item} />
    //                 </ListItem>
    //               </Box>
 : (
             " j"
              )}
</div>);


}

export default LookerRequestsPage;