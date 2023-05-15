import React from 'react';
import { Button } from '@mui/material';

const FindMatchesButton = ({ onMatchedApartments, apartments }) => {
  const handleFindMatches = async () => {
    try {
      // Send the request to the ChatGPT API
      const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY', // Replace with your ChatGPT API key
        },
        body: JSON.stringify({
          prompt: 'Find the best matches for the given data:', // Customize the prompt as needed
          max_tokens: 100, // Adjust the maximum number of tokens as per your preference
          temperature: 0.7, // Adjust the temperature parameter as per your preference
          apartments: apartments,
        }),
      });

      const responseData = await response.json();
      // Process the responseData to extract and display the best matches

      // Extract the matched apartments from the response and pass it to the callback
      const matchedApartments = /* Extract the list of matched apartments from responseData */
      onMatchedApartments(matchedApartments);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Button variant="contained" onClick={handleFindMatches}>
      Find the Best Matches
    </Button>
  );
};

export default FindMatchesButton;
