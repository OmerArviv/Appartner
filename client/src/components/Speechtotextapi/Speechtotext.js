import { Box, Card, Grid, Paper, TextField } from "@material-ui/core";
import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";  

import { Typography } from '@mui/material';
import { MicNoneSharp, StopSharp, ReplaySharp } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { borderColor } from "@mui/system";
 
const Speechtotext = () => {
  const { transcript, resetTranscript } = useSpeechRecognition({
    continuous: true
  });

  const [text, setText] = useState("");

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  const handleSaveText = () => {
    alert(1);
  };


  const handleStart = () => {
    SpeechRecognition.startListening();
  };

  const handleStop = () => {
    SpeechRecognition.stopListening();
    setText(transcript);    
  };

  const handleReset = () => {
    resetTranscript();
    setText("");
  };
 
  return (
    <Grid>

    
     
        <IconButton onClick={handleStart}>
          <MicNoneSharp />
        </IconButton>
        <IconButton onClick={handleStop}>
          <StopSharp />
        </IconButton>
        <IconButton onClick={handleReset}>
          <ReplaySharp />
        </IconButton>
        <p>{transcript}</p>
    
        <button onClick={handleSaveText}>Save</button>
      </Grid>
  );
};
export default Speechtotext;
