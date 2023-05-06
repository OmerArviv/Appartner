import {
  Box,
  List,
  ListItem,
  Stack,
  Grid,
  CardActionArea,
  Divider,
} from "@mui/material";
import ApartmentListItem from "./ApartmentListItem";
import { useEffect, useState } from "react";
import { getAllAppartments } from "../controller/appartmentController";

const data = [
  {
    image:
      "https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg",
    address: "Rotchild , Tel Aviv",
    price: "1500$",
    roommates_images: [
      "https://images.squarespace-cdn.com/content/v1/522b327ee4b0673919bbe57a/1551246035214-6CO98SNBGLT6CXDAR2H1/%D7%92%D7%9C-%D7%A9%D7%9C%D7%95%D7%9D-%D7%9B%D7%94%D7%9F_01_1500.jpg",
      "https://images.squarespace-cdn.com/content/v1/522b327ee4b0673919bbe57a/1551246048479-DN3TH6PYE3PKCPDGMVNH/%D7%A0%D7%95%D7%A2%D7%94-%D7%9C%D7%A4%D7%99%D7%93%D7%95%D7%AA_01_1500.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNJb4YAZHweJqUlstNOZkvbBlo3oeP_G6j5g&usqp=CAU",
    ],
  },
  {
    image:
      "https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg",
    address: "Rotchild , Tel Aviv",
    price: "1500$",
    roommates_images: [
      "https://images.squarespace-cdn.com/content/v1/522b327ee4b0673919bbe57a/1551246035214-6CO98SNBGLT6CXDAR2H1/%D7%92%D7%9C-%D7%A9%D7%9C%D7%95%D7%9D-%D7%9B%D7%94%D7%9F_01_1500.jpg",
      "https://images.squarespace-cdn.com/content/v1/522b327ee4b0673919bbe57a/1551246048479-DN3TH6PYE3PKCPDGMVNH/%D7%A0%D7%95%D7%A2%D7%94-%D7%9C%D7%A4%D7%99%D7%93%D7%95%D7%AA_01_1500.jpg",
    ],
  },
  {
    image:
      "https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg",
    address: "Rotchild , Tel Aviv",
    price: "1500$",
    roommates_images: [
      "https://images.squarespace-cdn.com/content/v1/522b327ee4b0673919bbe57a/1551246035214-6CO98SNBGLT6CXDAR2H1/%D7%92%D7%9C-%D7%A9%D7%9C%D7%95%D7%9D-%D7%9B%D7%94%D7%9F_01_1500.jpg",
      "https://images.squarespace-cdn.com/content/v1/522b327ee4b0673919bbe57a/1551246048479-DN3TH6PYE3PKCPDGMVNH/%D7%A0%D7%95%D7%A2%D7%94-%D7%9C%D7%A4%D7%99%D7%93%D7%95%D7%AA_01_1500.jpg",
    ],
  },
  {
    image:
      "https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg",
    address: "Rotchild , Tel Aviv",
    price: "1500$",
    roommates_images: [
      "https://images.squarespace-cdn.com/content/v1/522b327ee4b0673919bbe57a/1551246035214-6CO98SNBGLT6CXDAR2H1/%D7%92%D7%9C-%D7%A9%D7%9C%D7%95%D7%9D-%D7%9B%D7%94%D7%9F_01_1500.jpg",
      "https://images.squarespace-cdn.com/content/v1/522b327ee4b0673919bbe57a/1551246048479-DN3TH6PYE3PKCPDGMVNH/%D7%A0%D7%95%D7%A2%D7%94-%D7%9C%D7%A4%D7%99%D7%93%D7%95%D7%AA_01_1500.jpg",
    ],
  },
  {
    image:
      "https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg",
    address: "Rotchild , Tel Aviv",
    price: "1500$",
    roommates_images: [
      "https://images.squarespace-cdn.com/content/v1/522b327ee4b0673919bbe57a/1551246035214-6CO98SNBGLT6CXDAR2H1/%D7%92%D7%9C-%D7%A9%D7%9C%D7%95%D7%9D-%D7%9B%D7%94%D7%9F_01_1500.jpg",
      "https://images.squarespace-cdn.com/content/v1/522b327ee4b0673919bbe57a/1551246048479-DN3TH6PYE3PKCPDGMVNH/%D7%A0%D7%95%D7%A2%D7%94-%D7%9C%D7%A4%D7%99%D7%93%D7%95%D7%AA_01_1500.jpg",
    ],
  },
];

function ApartmentList() {
  const [appartments, setAppartments] = useState(null);

  useEffect(() => {
    setAllAppartments();
  }, []);

  const setAllAppartments = async () => {
    const res = await getAllAppartments();
    if (res) {
      setAppartments(res);
    }
  };

  return (
    <>
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          display: "inline-flex",
          flexDirection: "column",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          sx={{ justifyContent: "center" }}
          alignItems="center"
          // divider={<Divider orientation="vertical" flexItem />}
          // spacing={4}
          flexWrap="wrap"
        >
          {/* <Box component="div" sx={{ display: 'inline' }}> */}
          {appartments
            ? appartments.map((item, index) => {
                return (
                  <Box
                    key={index}
                    component="div"
                    sx={{ display: "inline", marginRight: "auto" }}
                  >
                    <ListItem>
                      <ApartmentListItem data={item} />
                    </ListItem>
                  </Box>
                );
              })
            : ""}
          {/* </Box> */}
        </Stack>
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
