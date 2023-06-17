import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { convWithChatGpt } from "../../controller/chatGptController";
import { getAppartmentById } from "../../controller/appartmentController";
import { parseData } from "../../controller/chatGptController";
import { CircularProgress } from "@material-ui/core";

const btnstyle = {
  background: "#4F4E51",
  height: "50px",
  width: "100px",
  color: "#D0D2D8",
};

const ParseChatGptApart = (props) => {
  const [input, setInput] = useState("");
  const [parsedInfo, setParsedInfo] = useState(null);
  const [error, setError] = useState(null);
  const { allAppartments, setAppartments, appartments } = props;
  const [isLoading, setIsLoading] = useState(false);

  const getAppartmentsFiltered = async () => {
    const data = [];
    for (let i = 0; i < appartments.length; i++) {
      let apartment = appartments[i];
      data.push({
        id: apartment._id,
        age_range: apartment.age_range,
        location: apartment.location.name,
        price_range: apartment.price_range,
        gender: apartment.gender,
        elevator: apartment.elevator,
        parking: apartment.parking,
        smoking: apartment.smoking,
      });
    }
    return data;
  };

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const filteredApartments = await getAppartmentsFiltered();
    const apartmentData = { user: input, apartments: filteredApartments };

    try {
      const res = await convWithChatGpt(apartmentData);
      console.log(res.data);

      if (res && res.status == 200) {
        const apartments_array = [];
        console.log(res.data);
        for (let i = 0; i < res.data.length; i++) {
          const apartment = await getAppartmentById(res.data[i]);
          apartments_array.push(apartment.data);
        }
        setIsLoading(false);
        setAppartments(apartments_array);
      } else {
        alert("something went wrong");
      }
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
            label="Ask me a quetsion"
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
            {isLoading ? (
              <CircularProgress color="white" size={30} />
            ) : (
              "Submit"
            )}
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

export default ParseChatGptApart;
