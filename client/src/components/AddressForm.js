import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField } from '@mui/material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Autocomplete from 'react-google-autocomplete';

const AddressForm = ({ open, onClose }) => {
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handlePlaceSelect = (place) => {
    setAddress(place.formatted_address);
    setLatitude(place.geometry.location.lat());
    setLongitude(place.geometry.location.lng());
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Enter Address</DialogTitle>
      <DialogContent>
        <div>
          <Autocomplete
            apiKey="YOUR_GOOGLE_MAPS_API_KEY"
            style={{ width: '100%' }}
            onPlaceSelected={handlePlaceSelect}
            types={['geocode']}
          >
            <TextField
              label="Address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </Autocomplete>
          {latitude && longitude && (
            <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
              <GoogleMap
                mapContainerStyle={{ height: '400px', width: '100%' }}
                center={{ lat: latitude, lng: longitude }}
                zoom={15}
              >
                <Marker position={{ lat: latitude, lng: longitude }} />
              </GoogleMap>
            </LoadScript>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddressForm;
