import { Box, CircularProgress } from "@material-ui/core";
import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { MicNoneSharp, StopSharp, ReplaySharp } from "@mui/icons-material";
import { Button, IconButton, InputBase } from "@mui/material";
import { convWithChatGpt } from "../../controller/chatGptController";
import { getAppartmentById } from "../../controller/appartmentController";

const btnstyle = {
  background: "#4F4E51",
  height: "50px",
  width: "100px",
  color: "#D0D2D8",
};

const SpeechtotextApart = (props) => {
  const { transcript, resetTranscript } = useSpeechRecognition({
    continuous: true,
  });

  const { allAppartments, setAppartments, appartments } = props;

  const [isListening, setIsListening] = useState(false);

  const [text, setText] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  const handleSaveText = async (event) => {
    event.preventDefault();
    const apartmentData = { user: transcript, apartments: appartments };

    try {
      const res = await convWithChatGpt(apartmentData);
      console.log(res);
      if (res && res.status == 200) {
        const apartments_array = [];
        for (let i = 0; i < res.data.length; i++) {
          const apartment = await getAppartmentById(res.data[i]);
          apartments_array.push(apartment.data);
        }

        setAppartments(apartments_array);
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
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
    <Box p={4} boxShadow={2} width={700}>
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
      <Box sx={{ height: 100 }}>
        <InputBase
          multiline
          fullWidth
          value={isListening ? text : transcript}
          onChange={(e) => setText(e.target.value)}
          InputProps={{ disableUnderline: true }}
          placeholder="Speak or type here..."
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={handleSaveText}
          style={btnstyle}
          sx={{ marginLeft: "auto", marginRight: "auto" }}
        >
          {isLoading ? <CircularProgress color="white" size={30} /> : "Save"}
        </Button>
      </Box>
    </Box>
  );
};
export default SpeechtotextApart;
