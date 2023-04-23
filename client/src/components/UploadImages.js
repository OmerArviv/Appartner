import {Box, Card,} from "@mui/material";
import { useEffect, useState } from "react";
import DialogImage from "./DialogImage";

const UploadImages= (props)=>{
    const [arrayImages, setArrayImages]= useState("");
    const [image1, setImage1]= useState("");

    function arrayImagesHandler(index){
        console.log("arrayImages update"); 

        arrayImages[index]="image"+ index;
        alert.log(arrayImages); 


    }

    // useEffect(()=>{
    //     if(image1){
    //         setImage1(image1); 
    //         arrayImagesHandler(1);
    //         console.log(arrayImages); 
    //         image1Handler("change image1");
    //     }
    // })

    function image1Handler(img){
        console.log("in image1"); 
        setImage1(img);
        console.log(arrayImages); 
    }

    return(
        <>
        <Box item="true" xs={4} sx={{display:'flex',flexWrap: 'wrap', width: "auto", marginLeft:"auto", marginRight:'auto'}} >
        <Box item="true" xs={4} sx={{ width: "auto", marginLeft:"auto", marginRight:'auto'}} >
        
            <Card  xs={2} sx={{height: 'fit-content', width: 'fit-content', marginLeft:"auto", marginRight:'auto', marginRight:10}}>
            <DialogImage setImage={image1Handler}/>
            </Card>

            <Card  xs={2} sx={{height: 'fit-content', width: 'fit-content', marginRight:'auto', marginTop:1}}>
            <DialogImage/>
            </Card>
           
            {/* <Card  xs={2} sx={{height: 'fit-content', width: 'fit-content', marginLeft:"auto", marginRight:'auto', marginRight:10}}>
                <CardActionArea  onClick={image1Handler}>

                    <CardMedia
                    component="img"
                    height="200"
                    width="200"
                    image="https://i0.wp.com/getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg"
                    alt="upload image 1"
                    // onClick={image1Handler}
                    >
                    </CardMedia>
                </CardActionArea>
            </Card> */}
            
            {/* <Card  xs={2} sx={{height: 'fit-content', width: 'fit-content', marginRight:'auto', marginTop:1}}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="200"
                    width="200"
                    image="https://i0.wp.com/getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg"
                    alt="upload image 3">
                    </CardMedia>
                </CardActionArea>
            </Card> */}
           </Box>

            <Box item="true" xs={4} sx={{ width: "auto", marginLeft:"auto", marginRight:'auto'}} >
            <Card  xs={2} sx={{height: 'fit-content', width: 'fit-content', marginLeft:"auto", marginRight:'auto',}}>
              <DialogImage/>
                {/* <CardActionArea>
                    <CardMedia
                    component="img"
                    height="200"
                    width="200"
                    image="https://i0.wp.com/getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg"
                    alt="upload image 2">
                    </CardMedia>
                </CardActionArea> */}
            </Card>
            <Card  xs={2} sx={{height: 'fit-content', width: 'fit-content', marginRight:'auto', marginTop:1}}>
              <DialogImage/>
                {/* <CardActionArea>
                    <CardMedia
                    component="img"
                    height="200"
                    width="200"
                    image="https://i0.wp.com/getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg"
                    alt="upload image 4">
                    </CardMedia>
                </CardActionArea> */}
            </Card>
        </Box>
        </Box>
       
        </>
    );
}

export default UploadImages; 
