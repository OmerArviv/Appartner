import { Button, CardActionArea } from "@material-ui/core";
import { Box, Card, CardContent, CardMedia, Checkbox, ToggleButton, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import looker_img from '../images/looker_img.png';
import welcomer_img from '../images/welcomer_img.png';


const WhoAreYouProfile= () =>{
    const navigate = useNavigate();

    const [userType, setUserType]=useState(""); 

    function userTypeHandler(event){
        // setUserType(type);
        console.log(event.target.value);
    }

    return(
    <>
    <p>Who Are you?</p>
    {userType? <Typography sx={{fontSize:40}}>Hello, <b>{`${userType}`}</b></Typography> :
    <Typography sx={{fontSize:30, color:"darksalmon"}}>Please choose who are you?</Typography>}
    
    <Box container="true" spacing={50} sx={{display:'flex', flexWrap: 'wrap', margin: '10'}}>
        <Box item="true"  xs={6} sx={{width: 'fit-content', marginLeft:"auto", marginRight:'auto'}}>
            <Button 
            sx={{display:'flex', flexWrap: 'wrap', margin: '10'}}
            onClick={()=>setUserType("Welcomer")}
            >
            <Card>
                <CardActionArea>
                <CardContent>
                    <Typography>
                        Welcomer
                    </Typography>
                </CardContent>
                <CardContent>
                    <CardMedia
                    component="img"
                    height="300"
                    width="300"
                    image={welcomer_img}
                    alt="upload image 2"
                    />
                </CardContent>
                <CardContent>
                    <Typography>
                    People who own an apartment and looking for roommates
                    </Typography>
                </CardContent>
                </CardActionArea>
            </Card>
            </Button>

        </Box>
       <Box item="true"  xs={6} sx={{width: 'fit-content', marginLeft:"auto", marginRight:'auto'}}>
       <Button sx={{display:'flex', flexWrap: 'wrap', margin: '10'}}
            onClick={()=>setUserType("Looker")}
            >
        <Card>
            <CardActionArea>
            <CardContent>
            <Typography>Looker</Typography>
            </CardContent>
            <CardContent>
                <CardMedia
                component="img"
                height="300"
                width="300"
                image={looker_img}
                alt="upload image 2"
                />
            </CardContent>
            <CardContent>
                <Typography>
                    People who are looking for an apartment to enter
                </Typography>
            </CardContent>
            </CardActionArea>
        </Card>
        </Button>
        </Box>
    </Box>
    <Button 
    variant="contained"
    onClick={()=>{navigate("/create-profile")}}
    > 
        Continue
    </Button>
    
    </>
    
    );

};

export default WhoAreYouProfile;