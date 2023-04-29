import { Avatar, Button, CardMedia, Typography } from "@mui/material";
import { Box, CardContent } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Stack } from "@mui/material";


function ApartmentListItem(props){
const roommates= props.data.roommates_images;
    return(
        <>
      <Box container="true" sx={{ height: 200, width: 300,display: 'flex', flexDirection: 'column', flexWrap: "wrap"}}>
        <Box item="true" >
        <CardContent>
            <CardMedia
                component="img"
                height="200"
                width="200"
                src={props.data.image}
                alt="home image"
                sx={{}}
                variant="rounded"
                >
            </CardMedia>
            </CardContent>
        </Box>
        <CardContent>
        <Typography variant="h5">
                <LocationOnIcon/> {props.data.address}
            </Typography>
        </CardContent>
        <CardContent>
            <Typography variant="h6">
            {"   "} Price:{props.data.price}
            </Typography>
        </CardContent>
        <CardContent>
            <Stack direction="row" spacing={2}>
            {roommates.map((item, index)=>
             <Avatar src={item}
             sx={{ width: 76, height: 76 }}/>)}
            </Stack>
        </CardContent>
        </Box>
        </>
    )
}

export default ApartmentListItem; 