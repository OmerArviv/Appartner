import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { parseData } from "../../controller/chatGptController";

const btnstyle = {
  background: "#4F4E51",
  height: "50px",
  width: "100px",
  color: "#D0D2D8",
};

const ParseChatGpt = (props) => {
  const [input, setInput] = useState("");
  const [parsedInfo, setParsedInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await parseData(input);
      console.log(input);
      props.setUser(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box p={4} boxShadow={2} width={700}>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            id="user-input"
            label="Describe yourself"
            multiline
            rows={4}
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            variant="outlined"
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
          <Button
            style={btnstyle}
            sx={{ marginLeft: "auto", marginRight: "auto" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </form>
      {parsedInfo && (
        <Box mt={4}>
          <Typography variant="h6">Parsed Information:</Typography>
          <pre>{JSON.stringify(parsedInfo, null, 2)}</pre>
        </Box>
      )}
      {error && (
        <Box mt={2}>
          <Typography color="error">{error}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default ParseChatGpt;
