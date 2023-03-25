import { Box, Card, CardContent, CardMedia, ToggleButton, Typography } from "@mui/material";
import { useState } from "react";
import looker_img from '../images/looker_img.png';
import welcomer_img from '../images/welcomer_img.png';


const WhoAreYouProfile= () =>{
    const [userType, setUserType]=useState(null); 
    return(
    <>
    <p>Who Are you?</p>
    <Box container spacing={50} sx={{display:'flex', flexWrap: 'wrap', margin: '10'}}>
        <Box item  xs={6} sx={{width: 'fit-content', marginLeft:"auto", marginRight:'auto'}}>
            <Card>
                <CardContent>
                <CardContent>
                    <ToggleButton
                    value="welcomer"
                    onChange={()=>{}}
                    >
                        Welcomer
                    </ToggleButton>
                </CardContent>
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
            </Card>
        </Box>
       <Box item  xs={6} sx={{width: 'fit-content', marginLeft:"auto", marginRight:'auto'}}>
        <Card>
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
        </Card>
        </Box>
    </Box>
    
    </>
    
    );

};

export default WhoAreYouProfile;