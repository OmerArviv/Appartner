import { Box, Card, Grid, Paper, TextField } from "@material-ui/core";
import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import {
  MicNoneSharp,
  StopSharp,
  ReplaySharp,
  CenterFocusStrong,
} from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { parseData } from "../../controller/userProfileController";




const Speechtotext = (props) => {
  const { transcript, resetTranscript } = useSpeechRecognition({
    continuous: true,
  });

  const [isListening, setIsListening] = useState(false);


  const [text, setText] = useState("");

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  const handleSaveText = async (event) => {
    event.preventDefault();
    try {
      const res = await parseData(transcript);
      props.setUser(res.data);
    } catch (error) {
      console.error(error);
    }


    // try {
    //   const response = await fetch("http://localhost:8000/run-script", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ text: transcript }), // send the transcript as JSON data
    //   });
    //   const result = await response.text();
    //   props.setUser(JSON.parse(result));
    //   console.log(JSON.parse(result));
    //   console.log("speach to text"); // log the result returned by the Python script
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const handleStart = () => {
    const recognition = SpeechRecognition.getRecognition();
    recognition.continuous = true;
    SpeechRecognition.startListening({ continuous: true });
  };
  

  const handleStop = () => {
    SpeechRecognition.stopListening();
    setIsListening(false);
    setText(transcript);
  };

  const handleReset = () => {
    resetTranscript();
    setText("");
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <Grid>
      <Box component={Paper} p={4} boxShadow={2} width={700}>
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

        <Box sx={{ height: 170 }}>
          <TextField
              multiline
              fullWidth
              value={isListening ? text : transcript}
              onChange={(e) => setText(e.target.value)}
              InputProps={{ disableUnderline: true }}
              placeholder="Speak or type here..."/>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
          <Button onClick={handleSaveText} variant="contained" type="submit" sx={{ marginLeft: "auto", marginRight: "auto" }}>
            Save
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};
export default Speechtotext;
