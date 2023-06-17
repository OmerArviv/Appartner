import * as React from "react";
import Box from "@mui/material/Box";
import { Button, ButtonGroup, Grid, Tooltip } from "@mui/material";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FilterChoices from "./FilterChoices";
import FilterByChatGpt from "./FilterByChatGpt";
import SearchIcon from "@mui/icons-material/Search";
import FindTheBestMatchButton from "./FindTheBestMatchButton";

export default function FilterSection(props) {
  const appartments = props.appartments;
  const setAppartments = props.setAppartments;
  const allAppartments = props.allAppartments;
  const [filterTab, setFilterTab] = useState(false);
  const [isCodeVisible, setIsCodeVisible] = useState(false);

  const [sort, setSort] = useState("");

  const handleTitleClick = () => {
    setIsCodeVisible(!isCodeVisible);
    if (filterTab == true) {
      onCloseFilterTab();
    }
  };
  const handleChange = (event) => {
    setSort(event.target.value);
  };

  const onCloseFilterTab = () => {
    setFilterTab(false);
    setAppartments(allAppartments);
  };

  const onOpenFilterTab = () => {
    setFilterTab(true);
    setIsCodeVisible(false);
  };

  //   const openFilterTab = () => {
  //     setFilterTab(!filterTab);
  //   };

  useEffect(() => {
    if (appartments != null) {
      if (sort == 1)
        setAppartments([
          ...appartments.sort(
            (p1, p2) => p1.price_range[0] - p2.price_range[0]
          ),
        ]);
      else if (sort == 2)
        setAppartments([
          ...appartments.sort(
            (p1, p2) => p2.price_range[0] - p1.price_range[0]
          ),
        ]);
    }
  }, [sort]);

  return (
    <>
      <Box
        sx={{
          flexGrow: 2,
          border: "1px solid white",
          my: 2,
          alignItems: "right",
          display: "flex",
        }}
      >
        <Grid container>
          <Grid xs={5}>
            <ButtonGroup
              variant="text"
              aria-label="text button group"
              sx={{ alignItems: "center" }}
            >
              <Button sx={{ color: "black", mx: 2 }}>
                Filter
                {filterTab === false ? (
                  <AddIcon
                    sx={{ height: "80%", ml: 2 }}
                    onClick={onOpenFilterTab}
                  ></AddIcon>
                ) : (
                  <RemoveIcon
                    sx={{ height: "80%", ml: 2 }}
                    onClick={onCloseFilterTab}
                  ></RemoveIcon>
                )}
              </Button>
              <Divider orientation="vertical" flexItem />
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ color: "black" }}
                  >
                    Sort By
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sort}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value={1}>Price: low to high</MenuItem>
                    <MenuItem value={2}>Price: high to low</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box
                sx={{
                  minWidth: 120,
                  alignSelf: "center",
                  mx: 5,
                  display: "flex",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Tooltip
                    title="Click to fill the fields by record or short text"
                    disableInteractive
                  >
                    <SearchIcon
                      fontSize="large"
                      onClick={handleTitleClick}
                      style={{ cursor: "pointer" }}
                    ></SearchIcon>
                  </Tooltip>
                </Box>
              </Box>
            </ButtonGroup>
          </Grid>
          <Grid
            xs={7}
            sx={{
              justifyContent: "left",
              alignSelf: "center",
            }}
          >
            <FindTheBestMatchButton
              setAppartments={setAppartments}
              appartments={appartments}
            ></FindTheBestMatchButton>
          </Grid>
        </Grid>
        {filterTab === true ? (
          <FilterChoices
            setAppartments={setAppartments}
            appartments={appartments}
            allAppartments={allAppartments}
          ></FilterChoices>
        ) : (
          ""
        )}
        <FilterByChatGpt isCodeVisible={isCodeVisible}></FilterByChatGpt>
      </Box>
    </>
  );
}
