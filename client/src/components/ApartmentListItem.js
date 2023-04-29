import { Avatar, Button, CardMedia, Typography } from "@mui/material";
import { Box, CardContent } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Stack } from "@mui/material";
import { CardActionArea } from "@material-ui/core";


function ApartmentListItem(props){
const roommates= props.data.roommates_images;
    return(
        <>
    <CardActionArea sx={{ height: "fit-content", width: "fit-content"}} >
      <Box container="true" sx={{ height: 200, width: 300,display: 'inline-flex', flexDirection: 'column', flexWrap: "wrap", alignItems: 'center' }}>
        <Box item="true" sx={{ height: "fit-content", width: "fit-content"}} >
        <CardContent>
            <CardMedia
                component="img"
                height="200"
                width="200"
                src={props.data.image}
                alt="home image"
                sx={{borderRadius: 3, boxShadow: 5}}
                variant="rounded"
                >
            </CardMedia>
            </CardContent>
        </Box>
        <Box item="true" sx={{ height: "fit-content", width: "fit-content"}} >
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
             sx={{ width: 75, height: 75 }}/>)}
            </Stack>
        </CardContent>
        </Box>
        </Box>
        </CardActionArea>

        </>
    )
}

export default ApartmentListItem; 