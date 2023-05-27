import React, { useState } from "react";
import GoogleMap from "./GoogleMap";

const btnstyle = {
  background: "#4F4E51",
  color: "#D0D2D8",
};

const SearchGoogleMap = ({ onPositionSelect, onSearchValueSelect }) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [showMapPopup, setShowMapPopup] = useState(false);

  const handleSearchSelect = (value) => {
    setSearchValue(value);
    onSearchValueSelect(value);
  };

  const handlePositionSelect = (position) => {
    setSelectedPosition(position);
    onPositionSelect(position);
  };

  const handleOpenMapPopup = () => {
    setShowMapPopup(true);
  };

  const handleCloseMapPopup = () => {
    setShowMapPopup(false);
  };

  return (
    <div>
      <GoogleMap
        onSearchSelect={handleSearchSelect}
        onPositionSelect={handlePositionSelect}
      />
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
