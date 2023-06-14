import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";

function UserCarousel(props) {
  const { apartmentImages } = props;

  useEffect(() => {
    if (apartmentImages.length == 0) {
      apartmentImages.push(
        "https://www.easylinedrawing.com/wp-content/uploads/2019/07/house_drawing_tutorial.png"
      );
    }
  }, []);

  return (
    <div>
      {apartmentImages.length > 0 ? (
        <Carousel>
          {apartmentImages.map((item, i) => (
            <CarouselItem key={i} item={item} />
          ))}
        </Carousel>
      ) : (
        <Carousel>
          <CarouselItem
            item={
              "https://www.easylinedrawing.com/wp-content/uploads/2019/07/house_drawing_tutorial.png"
            }
          />
        </Carousel>
      )}
    </div>
  );
}

function CarouselItem(props) {
  const { item } = props;
  return (
    <Paper>
      <img src={item} style={{ height: "400px", width: "100%" }} />
    </Paper>
  );
}

export default UserCarousel;
