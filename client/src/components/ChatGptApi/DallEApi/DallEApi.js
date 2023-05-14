import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { createVideo } from '../../../controller/userProfileController';

const DallEApi = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [text, setText] = useState('');
  const [video, setVideo] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const response = await createVideo(imageUrl, text);
    console.log(response.data);
  };

  return (
    <div>
      <TextField
        label="Image URL"
        placeholder="Enter the image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Text"
        placeholder="Enter the text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
      >
        Generate Video
      </Button>
      <TextField
        label="Video"
        placeholder="Enter the text"
        value={text}
        onChange={(e) => setVideo(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
    </div>
  );
};

export default DallEApi;
