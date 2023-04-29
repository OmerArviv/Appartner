import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'

function UserCarousel(props) {
    const { apartmentImages } = props;

    return (
        <div>
            <Carousel>
                {
                    apartmentImages.map((item, i) => <CarouselItem key={i} item={item} />)
                }
            </Carousel>
        </div>
    )
}

function CarouselItem(props) {
    const { item } = props;
    return (
        <Paper>
            <img src={item} style={{ height: '400px', width: '100%' }} />
        </Paper>
    )
}

export default UserCarousel;