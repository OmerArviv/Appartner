import { Avatar, Button, CardMedia, Typography, CardActionArea } from "@mui/material";
import { Box, CardContent , ListItem} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Stack } from "@mui/material";


function ApartmentListItem(props){
const roommates= props.data.roommates_images;
    return(
        <>
      {/* <Box container="true" sx={{ height: 200, width: 300,display: 'inline-flex', flexDirection: 'column', flexWrap: "wrap", alignItems: 'center' }}> */}
        
        {/* <Box item="true" sx={{ height: "fit-content", width: "fit-content"}}> */}
    
        <CardActionArea sx={{width:"fit-content"}}>
        <CardContent>
        <CardMedia
                component="img"
                height="250"
                width="250"
                src={props.data.image}
                alt="home image"
                sx={{borderRadius: 3, boxShadow: 5}}
                variant="rounded"
                />
            </CardContent>
            </CardActionArea>

        {/* </Box> */}
        {/* <Box item="true" sx={{ height: "fit-content", width: "fit-content"}} > */}
        <Stack direction="column" >        

        <CardContent>
        <Typography variant="h5">
                <LocationOnIcon/> {props.data.address}
            </Typography>
        </CardContent>
        <CardContent>
            <Typography variant="h6">
             Price:{props.data.price}{"   "}
            </Typography>
        </CardContent>
        <CardContent>
            <Stack direction="row" spacing={2}>
            {roommates.map((item, index)=>{
                return(
                    <Button onClick={()=>{console.log("clickrd on rommate")}}>
                        <Avatar src={item}
                        sx={{ width: 75, height: 75 }}/>  
                        </Button>)})}

            </Stack>
        </CardContent>
        </Stack>
        {/* </Box> */}
        {/* </Box> */}
        

        </>
    )
}

export default ApartmentListItem; 