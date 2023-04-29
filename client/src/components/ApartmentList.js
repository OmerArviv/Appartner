import { Box, List, ListItem, Stack, Grid ,CardActionArea, Divider} from "@mui/material";
import ApartmentListItem from "./ApartmentListItem";




const data=[{
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_K499eYY1TlP-vJ9TPcBDqTf6Cj8RLG-CaA&usqp=CAU",
    address: "Rotchild , Tel Aviv",
    price: "1500$",
    roommates_images: ["https://images.squarespace-cdn.com/content/v1/522b327ee4b0673919bbe57a/1551246035214-6CO98SNBGLT6CXDAR2H1/%D7%92%D7%9C-%D7%A9%D7%9C%D7%95%D7%9D-%D7%9B%D7%94%D7%9F_01_1500.jpg",
     "https://images.squarespace-cdn.com/content/v1/522b327ee4b0673919bbe57a/1551246048479-DN3TH6PYE3PKCPDGMVNH/%D7%A0%D7%95%D7%A2%D7%94-%D7%9C%D7%A4%D7%99%D7%93%D7%95%D7%AA_01_1500.jpg"]
},
{
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_K499eYY1TlP-vJ9TPcBDqTf6Cj8RLG-CaA&usqp=CAU",
    address: "Rotchild , Tel Aviv",
    price: "1500$",
    roommates_images: ["https://images.squarespace-cdn.com/content/v1/522b327ee4b0673919bbe57a/1551246035214-6CO98SNBGLT6CXDAR2H1/%D7%92%D7%9C-%D7%A9%D7%9C%D7%95%D7%9D-%D7%9B%D7%94%D7%9F_01_1500.jpg",
     "https://images.squarespace-cdn.com/content/v1/522b327ee4b0673919bbe57a/1551246048479-DN3TH6PYE3PKCPDGMVNH/%D7%A0%D7%95%D7%A2%D7%94-%D7%9C%D7%A4%D7%99%D7%93%D7%95%D7%AA_01_1500.jpg"]
},{
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_K499eYY1TlP-vJ9TPcBDqTf6Cj8RLG-CaA&usqp=CAU",
    address: "Rotchild , Tel Aviv",
    price: "1500$",
    roommates_images: ["https://images.squarespace-cdn.com/content/v1/522b327ee4b0673919bbe57a/1551246035214-6CO98SNBGLT6CXDAR2H1/%D7%92%D7%9C-%D7%A9%D7%9C%D7%95%D7%9D-%D7%9B%D7%94%D7%9F_01_1500.jpg",
     "https://images.squarespace-cdn.com/content/v1/522b327ee4b0673919bbe57a/1551246048479-DN3TH6PYE3PKCPDGMVNH/%D7%A0%D7%95%D7%A2%D7%94-%D7%9C%D7%A4%D7%99%D7%93%D7%95%D7%AA_01_1500.jpg"]
},{
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_K499eYY1TlP-vJ9TPcBDqTf6Cj8RLG-CaA&usqp=CAU",
    address: "Rotchild , Tel Aviv",
    price: "1500$",
    roommates_images: ["https://images.squarespace-cdn.com/content/v1/522b327ee4b0673919bbe57a/1551246035214-6CO98SNBGLT6CXDAR2H1/%D7%92%D7%9C-%D7%A9%D7%9C%D7%95%D7%9D-%D7%9B%D7%94%D7%9F_01_1500.jpg",
     "https://images.squarespace-cdn.com/content/v1/522b327ee4b0673919bbe57a/1551246048479-DN3TH6PYE3PKCPDGMVNH/%D7%A0%D7%95%D7%A2%D7%94-%D7%9C%D7%A4%D7%99%D7%93%D7%95%D7%AA_01_1500.jpg"]
},{
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_K499eYY1TlP-vJ9TPcBDqTf6Cj8RLG-CaA&usqp=CAU",
    address: "Rotchild , Tel Aviv",
    price: "1500$",
    roommates_images: ["https://images.squarespace-cdn.com/content/v1/522b327ee4b0673919bbe57a/1551246035214-6CO98SNBGLT6CXDAR2H1/%D7%92%D7%9C-%D7%A9%D7%9C%D7%95%D7%9D-%D7%9B%D7%94%D7%9F_01_1500.jpg",
     "https://images.squarespace-cdn.com/content/v1/522b327ee4b0673919bbe57a/1551246048479-DN3TH6PYE3PKCPDGMVNH/%D7%A0%D7%95%D7%A2%D7%94-%D7%9C%D7%A4%D7%99%D7%93%D7%95%D7%AA_01_1500.jpg"]
}];

function ApartmentList(){

    return(
        <>
        <List sx={{ display: "flex", flexDirection: "column",display: 'inline-flex', flexDirection: 'column', flexWrap: "wrap", alignItems: 'center' }}>
            {/* <Stack
            direction="row"
                // divider={<Divider orientation="vertical" flexItem />}
            spacing={10}> */}
            <Box component="div" sx={{ display: 'inline' }}>
            {data.map((item, index)=>{ 
                return(
                        <ListItem
                        sx={{
                          mb: 2,
                        }}>
                            <ApartmentListItem data={item} key={index}/>
                  </ListItem>
            )}
       
        )}
            </Box>
           
        {/* </Stack> */}
        </List>
        {/* <Stack container="true" sx={{ height: 200, width: 300,display: 'inline-flex', flexDirection: 'column', flexWrap: "wrap", alignItems: 'center' }}>
        <Box item="true" >
        {data.map((item, index)=>
        <ApartmentListItem data={item} key={index}/>
        )}
        </Box>
        </Stack> */}
        </>
    );
}

export default ApartmentList;