import { Box, Card, Grid, Paper, TextField } from "@material-ui/core";
import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { Button, Typography } from "@mui/material";
import {
  MicNoneSharp,
  StopSharp,
  ReplaySharp,
  CenterFocusStrong,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { borderColor } from "@mui/system";
import { red } from "@mui/material/colors";

const Speechtotext = () => {
  const { transcript, resetTranscript } = useSpeechRecognition({
    continuous: true,
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
      <Box sx={{ border: "2px solid black", width: "50%", height: 250 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <IconButton onClick={handleStart}>
            <MicNoneSharp />
          </IconButton>
          <IconButton onClick={handleStop}>
            <StopSharp />
          </IconButton>
          <IconButton onClick={handleReset}>
            <ReplaySharp />
          </IconButton>
        </Box>

        <Box sx={{ border: "1px solid gray", height: 170 }}>
          <p>{transcript}</p>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <IconButton onClick={handleSaveText} sx={{ color: "Black" }}>
            Save
          </IconButton>
        </Box>
      </Box>
    </Grid>
  );
};
export default Speechtotext;
