import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, TextField } from "@mui/material";
import { Card, CardActionArea, CardMedia } from "@mui/material";
import { useEffect } from "react";

import { useState } from "react";

const btnstyle = {
    // margin: "8px 0",
    background: "#4F4E51",
    color: "#D0D2D8",
  };


function DialogImage(props){
    const [open, setOpen] = useState(false);
    const [image, setImage]=useState("https://i0.wp.com/getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg");
    const [urlImage, setNewUrlImage]=useState("");

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      function urlImageHandler(event) {
        console.log("image");
        setNewUrlImage(event.target.value);
        console.log(urlImage);

        //https://i0.wp.com/getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg
     };

     useEffect( () => {
        if(urlImage){
            console.log("newImage");
            props.setImage(image);
            setImage(urlImage);
            console.log(urlImage);
            console.log(image);
        }
        else{
            setImage("https://i0.wp.com/getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg");
        }
        handleClose();
      },[urlImage]);

      
    return(
        <>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="200"
                    width="200"
                    // image={image}
                    src={image}
                    // image="https://top-selfie.co.il/wp-content/uploads/2021/05/sunset-1373171.jpg"
                    alt="upload image - please try upload again"
                    onClick={handleClickOpen}
                    >
                    </CardMedia>
                </CardActionArea>
        <Dialog fullWidth open={open} onClose={handleClose}>
            <DialogTitle>
                Upload Image
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                Please insert a link to the image
                </DialogContentText>
                <TextField 
                autoFocus
                fullWidth
                value={urlImage}
                onChange={urlImageHandler}>
                
                </TextField>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} 
            style={btnstyle}>Cancel</Button>
            {/* <Button 
            onClick={useEffect}             
            style={btnstyle}>Ok</Button> */}

            </DialogActions>
        </Dialog>
        </>


    );

}

export default DialogImage;
