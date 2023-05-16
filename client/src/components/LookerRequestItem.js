import { Box, Button, Typography } from "@mui/material";
import { getAppartmentById } from "../controller/appartmentController";
import {deleteRoomateRequestByUser} from "../controller/RoomateRequestController";
import { useEffect, useState } from "react";
import ApartmentListItem from "./ApartmentListItem";


function LookerRequestItem(props){
    const request= props.request;
    const [apartment, setApartment]=useState();

    useEffect(()=>{
        getRequestApartment();
    }, [])

    const getRequestApartment= async ()=>{
        // console.log(request.appartment_id);
        const res= await getAppartmentById(request.appartment_id);
        if(res){
            // console.log(apartment);
            setApartment(res.data); 
            // console.log(res);

        }
    }

    const onCancelHandler = async (event) => {
        event.preventDefault();
        console.log("cancel");
        if (request._id != "") {
          const requestId = {
            _id: request._id,
          };
          const result = await deleteRoomateRequestByUser(requestId);
        //   console.log(result);

        //   if (result.status == 404) {
        //     console.log(result.status);
        //     console.log("not found");
        //   }
          if (result.status == 201) {
            console.log(result.status);
            console.log("delete the request");
          } else if (result.status == 403) {
            console.log(result.status);

            alert("Error occured!");
          }
        }
      };

    // const apartment=props.apartment; 
    const status=props.status;
    return(
        <div>
            {apartment? ( 
            <Box container="true"  xs={4} sx={{display:'flex',flexWrap: 'wrap', width: "auto", marginLeft:"auto", marginRight:'auto'}}>
                <Box item="true" xs={4} sx={{display:'flex',flexWrap: 'wrap', width: "auto", marginLeft:"auto", marginRight:'auto'}}>
                    <ApartmentListItem data={apartment}>

                    </ApartmentListItem>
                    {}
                </Box>
                <Box item="true" xs={4} sx={{display:'block', width: "auto", marginLeft:"auto", marginRight:'auto', alignContent:"center", alignItems:"center", justifyContent:"center"}}> 
                    <Typography>
                        Request Status: <br/>
                        {request.status}
                    </Typography>
                    <Button varient="contained" sx={{height:"fit-content"}}
                    onClick={onCancelHandler}
                    >
                        Cancel request
                    </Button>
                </Box>
            </Box>): ""}
           
        </div>
        
        
        
        
        
        
        );
};

export default LookerRequestItem;