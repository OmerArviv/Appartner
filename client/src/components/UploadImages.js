import {Box, Card,} from "@mui/material";
import { useState, useEffect } from "react";
import DialogImage from "./DialogImage";

const UploadImages= (props)=>{
    const arrayImages= ["","","",""];
    const [image1, setImage1]= useState("");
    const [image2, setImage2]= useState("");
    const [image3, setImage3]= useState("");
    const [image4, setImage4]= useState("");


    useEffect( () => {
        if(image1){
            console.log("array - img 1");
            arrayImages[0]=image1;
            console.log(arrayImages)
        }
        else{
            arrayImages[0]=""; 
        }
        if(image2){
            console.log("array - img 2");
            arrayImages[1]=image2; 
            console.log(arrayImages)
        }
        else{
            arrayImages[1]=""; 
        }
        if(image3){
            console.log("array - img 3");
            arrayImages[2]=image3; 
            console.log(arrayImages)
        }
        else{
            arrayImages[2]=""; 
        }
        if(image4){
            console.log("array - img 4");
            arrayImages[3]=image4; 
            console.log(arrayImages)
        }
        else{
            arrayImages[3]=""; 
        }
        props.setArrayImages(arrayImages);
      },[image1, image2, image3, image4]);

    return(
        <>
        <Box item="true" xs={4} sx={{display:'flex',flexWrap: 'wrap', width: "auto", marginLeft:"auto", marginRight:'auto'}} >
        <Box item="true" xs={4} sx={{ width: "auto", marginLeft:"auto", marginRight:'auto'}} >
        
            <Card  xs={2} sx={{height: 'fit-content', width: 'fit-content', marginLeft:"auto", marginRight:'auto', marginRight:10}}>
            <DialogImage setImage={setImage1}/>
            </Card>
            <Card  xs={2} sx={{height: 'fit-content', width: 'fit-content', marginRight:'auto', marginTop:1}}>
            <DialogImage setImage={setImage3}/>
            </Card>
           </Box>

            <Box item="true" xs={4} sx={{ width: "auto", marginLeft:"auto", marginRight:'auto'}} >
            <Card  xs={2} sx={{height: 'fit-content', width: 'fit-content', marginLeft:"auto", marginRight:'auto',}}>
              <DialogImage setImage={setImage2} />
            </Card>
            <Card  xs={2} sx={{height: 'fit-content', width: 'fit-content', marginRight:'auto', marginTop:1}}>
              <DialogImage setImage={setImage4}/>
            </Card>
        </Box>
        </Box>
       
        </>
    );
}

export default UploadImages; 
