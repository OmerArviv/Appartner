import React, { useEffect, useState } from 'react';
import GoogleMap from './GoogleMap';

const SearchGoogleMap = () => {
    const [searchValue, setSearchValue] = useState('');
    const [selectedPosition, setSelectedPosition] = useState(null);

    const handleSearchSelect = (value) => {
        setSearchValue(value);
        // Do something with the search value
    };

    const handlePositionSelect = (position) => {
        setSelectedPosition(position);
        // Do something with the selected position
    };

    return (
        <div>
            <GoogleMap onSearchSelect={handleSearchSelect} onPositionSelect={handlePositionSelect} searchValue={searchValue} selectedPosition={selectedPosition} />
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
