import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Paper, Button } from "@mui/material";
import Apartment from "../pages/Apartment";

function ApartmentCarousel(props) {
  const { apartments } = props;

  return (
    <Carousel showArrows={true}>
      {apartments.map((item, i) => (
        <Apartment key={i} ap={item} />
      ))}
    </Carousel>
  );
}

export default ApartmentCarousel;
