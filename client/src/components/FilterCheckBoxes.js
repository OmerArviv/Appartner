import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Stack, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useState, useEffect } from "react";
import { Container } from "@mui/system";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Slider from "@mui/material/Slider";
import { InputLabel, MenuItem, TextField, Select } from "@mui/material";

export default function FilterCheckBoxes(props) {
  const setProducts = props.setProducts;
  const products = props.products;
  const allProducts = props.allProducts;
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [ageRange, setAgeRange] = useState([0, 100]);
  const [gender, setGender] = useState([
    "Male Only",
    "Female Only",
    "It doesn't matter",
  ]);
  const [elevator, setElevator] = useState(["Yes", "No", "It doesn't matter"]);
  const [productMaterial, setProductMaterial] = useState([
    "sterling silver",
    "gold plated",
    "rose gold",
  ]);

  //   const handleStyleChange = (e) => {
  //     if (e.target.checked === true) {
  //       setProductStyle([...productStyle, e.target.value]);
  //     } else {
  //       setProductStyle(productStyle.filter((item) => item != e.target.value));
  //     }
  //   };

  const handleMaterialChange = (e) => {
    if (e.target.checked === true) {
      setProductMaterial([...productMaterial, e.target.value]);
    } else {
      setProductMaterial(
        productMaterial.filter((item) => item != e.target.value)
      );
    }
  };

  //   useEffect(() => {
  //     // setProducts([
  //     //   ...allProducts.filter((product) => productStyle.includes(product.type)),
  //     // ]);
  //   }, [productStyle]);

  //   useEffect(() => {
  //     // setProducts([
  //     //   ...allProducts.filter((product) =>
  //     //     productMaterial.includes(product.material)
  //     //   ),
  //     // ]);
  //   }, [productMaterial]);

  //   useEffect(() => {
  //     // setProducts([
  //     //   ...allProducts.filter(
  //     //     (product) => product.price > value[0] && product.price < value[1]
  //     //   ),
  //     // ]);
  //   }, [value]);

  //   function valuetext(value) {
  //     return value;
  //   }

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleAgeRangeChange = (event, newValue) => {
    setAgeRange(newValue);
  };

  return (
    <Box>
      <Container maxWidth="xl" sx={{ color: "black", bgcolor: "white" }}>
        <Grid container>
          <Grid item xs={2}>
            <Typography
              sx={{
                textAlign: "center",
                mt: 2,
              }}
            >
              Age Range
            </Typography>
            <Box sx={{ width: "100%" }}>
              <Stack
                spacing={2}
                direction="row"
                sx={{ mb: 1 }}
                alignItems="center"
              >
                <Typography>{ageRange[0]}</Typography>
                <Slider
                  getAriaLabel={() => "Age range"}
                  value={ageRange}
                  onChange={handleAgeRangeChange}
                  valueLabelDisplay="auto"
                  //   getAriaValueText={ageRange}
                  sx={{ color: "black" }}
                />
                <Typography>{ageRange[1]}</Typography>
              </Stack>
            </Box>
            <Typography
              sx={{
                textAlign: "center",
                mt: 2,
                fontSize: "110%",
              }}
            >
              Price Range
            </Typography>
            <Box sx={{ width: "100%" }}>
              <Stack
                spacing={2}
                direction="row"
                sx={{ mb: 1 }}
                alignItems="center"
              >
                <Typography>{priceRange[0]}</Typography>
                <Slider
                  getAriaLabel={() => "Price range"}
                  value={priceRange}
                  onChange={handlePriceRangeChange}
                  valueLabelDisplay="auto"
                  sx={{ color: "black" }}
                  //   getAriaValueText={priceRange}
                />
                <Typography>{priceRange[1]}</Typography>
              </Stack>
            </Box>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
          <Grid item xs="auto">
            <Typography
              sx={{
                textAlign: "center",
                mt: 2,
                fontSize: "110%",
              }}
            >
              Gender
            </Typography>
            <Select
              label="Gender"
              id="gender"
              value={gender[0]}
              //   onChange={genderHandler}
              fullWidth
            >
              {gender.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
          <Grid item xs="auto">
            <Typography
              sx={{
                textAlign: "center",
                mt: 2,
                fontSize: "110%",
              }}
            >
              Elevator
            </Typography>
            <Select
              label="Elevator"
              id="gender"
              value={elevator[0]}
              //   onChange={genderHandler}
              fullWidth
            >
              {elevator.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
          <Grid item xs="auto">
            <Typography
              sx={{
                textAlign: "center",
                mt: 2,
                fontSize: "110%",
              }}
            >
              Parking
            </Typography>
            <Select
              label="Parking"
              id="parking"
              value={elevator[0]}
              //   onChange={genderHandler}
              fullWidth
            >
              {elevator.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
          <Grid item xs="auto">
            <Typography
              sx={{
                textAlign: "center",
                mt: 2,
                fontSize: "110%",
              }}
            >
              Smoking
            </Typography>
            <Select
              label="Smoking"
              id="smoking"
              value={elevator[0]}
              //   onChange={genderHandler}
              fullWidth
            >
              {elevator.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
          <Grid item xs="auto">
            <Typography
              sx={{
                textAlign: "center",
                mt: 2,
                fontSize: "110%",
              }}
            >
              Number Of Roomates
            </Typography>
            <Select
              label="Number Of Roomates"
              id="roomates"
              value={elevator[0]}
              //   onChange={genderHandler}
              fullWidth
            >
              {elevator.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
          <Grid item xs="auto">
            <Typography
              sx={{
                textAlign: "center",
                mt: 2,
                fontSize: "110%",
              }}
            >
              Location
            </Typography>
            <TextField
              //  label='Location'
              labelid="location-label"
              id="location"
              //   onChange={}
              //   value={}
              fullWidth
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
