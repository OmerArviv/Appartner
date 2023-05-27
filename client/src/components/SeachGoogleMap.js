import React, { useEffect, useState } from 'react';
import GoogleMap from './GoogleMap';
import { Dialog, Tooltip } from '@mui/material';
import { Button } from '@material-ui/core';

const btnstyle = {
    background: "#4F4E51",
    color: "#D0D2D8",
};

const SearchGoogleMap = () => {
    const [searchValue, setSearchValue] = useState('');
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [showMapPopup, setShowMapPopup] = useState(false);

    const handleSearchSelect = (value) => {
        setSearchValue(value);
        // Do something with the search value
    };

    const handlePositionSelect = (position) => {
        setSelectedPosition(position);
        // Do something with the selected position
    };

    const handleOpenMapPopup = () => {
        setShowMapPopup(true);
    };

    const handleCloseMapPopup = () => {
        setShowMapPopup(false);
    };

    return (
        <div>
            <Button
                variant='contained'
                onClick={handleOpenMapPopup}
                style={btnstyle}>
                {searchValue ? searchValue : 'Open Map'}
            </Button>
            {showMapPopup && (
                <div className="map-popup">
                    <GoogleMap
                        onSearchSelect={handleSearchSelect}
                        onPositionSelect={handlePositionSelect}
                    />
                    <Button
                        variant='contained'
                        onClick={handleCloseMapPopup}
                        style={btnstyle}>
                        Close Map
                    </Button>
                </div>
            )}

            {selectedPosition && (
                <p>
                    Search Value: {searchValue} <br />
                    Selected Position: {selectedPosition.lat()}, {selectedPosition.lng()}
                </p>
            )}
        </div>
    );
};

export default SearchGoogleMap;
