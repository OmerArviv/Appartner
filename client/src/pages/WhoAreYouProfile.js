import { Button, CardActionArea } from "@material-ui/core";
import { Box, Card, CardContent, CardMedia, Checkbox, ToggleButton, Typography } from "@mui/material";
import { useState, useEffect,useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import looker_img from '../images/looker_img.png';
import welcomer_img from '../images/welcomer_img.png';
import { pageTitleContext } from "../APP/Utils";


const btnstyle = {
    // margin: "8px 0",
    background: "#4F4E51",
    height: "50px",
    color: "#D0D2D8",
  };

const WhoAreYouProfile= () =>{
    const navigate = useNavigate();
    const {setPageTitle} = useContext(pageTitleContext);
    const [userType, setUserType]=useState(""); 


    useEffect(()=>{
      setPageTitle("Who Are You?");
    },[]);
  


    return(
    <>
      <Box item="true"  xs={6} sx={{width: 'fit-content', marginLeft:"auto", marginRight:'auto', marginTop:3, marginBottom:3}}>
    {userType? <Typography sx={{fontSize:40}}>Hello, <b>{`${userType}`}</b></Typography> :
    <Typography sx={{fontSize:40, color:"darksalmon"}}>Please choose who are you?</Typography>}
            </Box>


    <Box container="true" spacing={50} sx={{display:'flex', flexWrap: 'wrap', margin: '10'}}>
      
        <Box item="true"  xs={6} sx={{width: 'fit-content', marginLeft:"auto", marginRight:'auto'}}>
            <Button 
            sx={{display:'flex', flexWrap: 'wrap', margin: '10'}}
            onClick={()=>setUserType("Welcomer")}
            >
                <CardActionArea sx={{width: 'fit-content', marginLeft:"auto", marginRight:'auto'}}>
                <Typography sx={{fontSize:30}}>
                        Welcomer
                    </Typography>
                <CardMedia
                    component="img"
                    height="400"
                    width="400"
                    image={welcomer_img}
                    alt="welcomer image"
                    sx={{width: 'fit-content'}}
                    />
                            <Typography sx={{fontSize:22}}>
                    People who own an apartment and <br/> looking for roommates
                    </Typography>
                </CardActionArea>
            {/* <Card>
                <CardActionArea>
                <CardContent>
                <Typography>
                        Welcomer
                    </Typography>
                    <CardMedia
                    component="img"
                    height="400"
                    width="400"
                    image={welcomer_img}
                    alt="upload image 2"
                    />
                         <Typography>
                    People who own an apartment and looking for roommates
                    </Typography>
                </CardContent>
                </CardActionArea>
            </Card> */}
            </Button>

        </Box>
       <Box item="true"  xs={6} sx={{width: 'fit-content', marginLeft:"auto", marginRight:'auto'}}>
       <Button sx={{display:'flex', flexWrap: 'wrap', margin: '10'}}
            onClick={()=>setUserType("Looker")}
            >
                 <CardActionArea>
            <Typography sx={{fontSize:30}}>Looker</Typography>
                <CardMedia
                component="img"
                height="400"
                width="400"
                image={looker_img}
                alt="upload image 2"
                />
                  <Typography sx={{fontSize:22}}>
                    People who are looking for <br/> an apartment to enter
                </Typography>
{/* 
            <CardContent>
                <Typography>
                    People who are looking for an apartment to enter
                </Typography>
            </CardContent> */}
            </CardActionArea>
        {/* <Card>
            <CardActionArea>
            <CardContent>
            <Typography>Looker</Typography>
                <CardMedia
                component="img"
                height="400"
                width="400"
                image={looker_img}
                alt="upload image 2"
                />
                  <Typography>
                    People who are looking for an apartment to enter
                </Typography>
            </CardContent>
            </CardActionArea>
        </Card> */}
        </Button>
        </Box>
    </Box>


    <Box container="true" sx={{display:'flex',flexWrap:"warp",  width: "auto", marginLeft:"auto", marginRight:'auto', marginTop:3}} >
    <Box item="true" xs={4} sx={{width: "fit-content", marginLeft:"50%", marginRight:"auto"}} >
    <Button 
    variant="contained"
    onClick={()=>{navigate("/create-profile")}}
    style={btnstyle}
    // sx={{ width: "auto", marginLeft: 1 / 2, marginRight: 1 / 2 }}
    xs={4}

    > 
        Continue
    </Button>
    </Box>
    </Box>

    </>
    
    );

};

export default WhoAreYouProfile;