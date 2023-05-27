import React, { useEffect, useRef, useState } from 'react';

const GoogleMap = ({ onSearchSelect, onPositionSelect }) => {
    const mapRef = useRef(null);
    const searchBoxRef = useRef(null);
    const [marker, setMarker] = useState(null); // Store the marker in a state variable

    useEffect(() => {
        // Initialize the map
        const mapOptions = {
            center: { lat: 32.0853, lng: 34.7818 }, // Tel Aviv coordinates
            zoom: 12,
        };
        const map = new window.google.maps.Map(mapRef.current, mapOptions);

        // Create and attach the search box to the map
        const searchBox = new window.google.maps.places.SearchBox(searchBoxRef.current);
        map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(searchBoxRef.current);

        // Listen for the event when the user selects a place from the search box
        searchBox.addListener('places_changed', () => {
            const places = searchBox.getPlaces();

            if (places.length === 0) {
                return;
            }

            // Clear previous marker from the map
            if (marker) {
                marker.setMap(null);
            }

            // Create a marker for the selected place
            const place = places[0];
            const newMarker = new window.google.maps.Marker({
                position: place.geometry.location,
                map: map,
            });

            // Store the marker in the state variable
            setMarker(newMarker);

            // Set the map's center and zoom to the selected place
            map.setCenter(place.geometry.location);
            map.setZoom(15);

            // Call the onPositionSelect callback with the selected position
            onPositionSelect(place.geometry.location);
            onSearchSelect(searchBoxRef.current.value);
        });
    }, []);

    return (
        <div>
            <input
                ref={searchBoxRef}
                type="text"
                placeholder="Search for an address"
                style={{ width: '300px', padding: '5px' }}
            />
            <div ref={mapRef} style={{ width: '100%', height: '400px', marginTop: '10px' }} />
        </div>
    );
};

export default GoogleMap;
