import { Box, Button, Chip, Skeleton, Typography } from "@mui/material";
import { getAppartmentById } from "../controller/appartmentController";
import {deleteRoomateRequestByUser} from "../controller/RoomateRequestController";
import { useEffect, useState } from "react";
import ApartmentListItem from "./ApartmentListItem";
import TelegramIcon from '@mui/icons-material/Telegram';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';


function LookerRequestItem(props){
    const request= props.request;
    const [apartment, setApartment]=useState();

    useEffect(()=>{
        getRequestApartment();
    }, [])

    const getRequestApartment= async ()=>{
        const res= await getAppartmentById(request.appartment_id);
        if(res){
            setApartment(res.data); 
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

    return(
        <div>
            {apartment? ( 
            <Box container="true"  xs={4} sx={{display:'flex',flexWrap: 'wrap', width: "auto", marginLeft:"auto", marginRight:'auto'}}>
                <Box item="true" xs={4} sx={{display:'flex',flexWrap: 'wrap', width: "auto", marginLeft:"auto", marginRight:'auto'}}>
                    <ApartmentListItem data={apartment}>

                    </ApartmentListItem>
                    {}
                </Box>
                <Box item="true" xs={4} sx={{display:'flex',flexWrap: 'wrap', width: "auto", marginLeft:"auto", marginRight:'auto', alignContent:"center", alignItems:"center", justifyContent:"center"}}> 
                    <Chip
                        sx={{backgroundColor:"#ffc457", height:40, width:170, fontFamily: "monospace", fontSize:23, fontStyle:"bolt" }}
                        icon={<TelegramIcon sx={{color:"black", height:36, width:36}}/>}
                        label={request.status}
                    />
                    <br/>
                    <Chip
                    sx={{ height:40, width:170, fontFamily: "monospace", fontSize:23, fontStyle:"bolt" }}
                    icon={<RemoveCircleIcon sx={{color:"black", height:36, width:36}}/>}
                    label={"Cancel Request"}
                    onClick={onCancelHandler}

                    >

                    </Chip>
                </Box>
            </Box>): 
            <Skeleton>
                <Box></Box>
            </Skeleton>
            }
           
        </div>
        
        
        
        
        
        
        );
};

export default LookerRequestItem;