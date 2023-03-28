
import {Box, Card, CardActionArea, CardMedia} from "@mui/material";

const UploadImages= ()=>{
    return(
        <Box item="true" xs={4} sx={{display:'flex',flexWrap: 'wrap', width: "auto", marginLeft:"auto", marginRight:'auto'}} >
        <Box item="true" xs={4} sx={{ width: "auto", marginLeft:"auto", marginRight:'auto'}} >
            <Card  xs={2} sx={{height: 'fit-content', width: 'fit-content', marginLeft:"auto", marginRight:'auto', marginRight:10}}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="200"
                    width="200"
                    image="https://i0.wp.com/getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg"
                    alt="upload image 1">
                    </CardMedia>
                </CardActionArea>
            </Card>
            <Card  xs={2} sx={{height: 'fit-content', width: 'fit-content', marginRight:'auto', marginTop:1}}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="200"
                    width="200"
                    image="https://i0.wp.com/getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg"
                    alt="upload image 3">
                    </CardMedia>
                </CardActionArea>
            </Card>
           </Box>

            <Box item="true" xs={4} sx={{ width: "auto", marginLeft:"auto", marginRight:'auto'}} >
            <Card  xs={2} sx={{height: 'fit-content', width: 'fit-content', marginLeft:"auto", marginRight:'auto',}}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="200"
                    width="200"
                    image="https://i0.wp.com/getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg"
                    alt="upload image 2">
                    </CardMedia>
                </CardActionArea>
            </Card>
            <Card  xs={2} sx={{height: 'fit-content', width: 'fit-content', marginRight:'auto', marginTop:1}}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="200"
                    width="200"
                    image="https://i0.wp.com/getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg"
                    alt="upload image 4">
                    </CardMedia>
                </CardActionArea>
            </Card>
    
        </Box>

        </Box>
    );
}

export default UploadImages; 