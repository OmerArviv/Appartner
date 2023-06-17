import * as React from "react";
import Box from "@mui/material/Box";
import { Button, ButtonGroup } from "@mui/material";
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

export default function FilterSection(props) {
  const appartments = props.appartments;
  const setAppartments = props.setAppartments;
  const allAppartments = props.allAppartments;
  const [filterTab, setFilterTab] = useState(false);

  const [sort, setSort] = useState("");

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  const onCloseFilterTab = () => {
    setFilterTab(false);
    setAppartments(allAppartments);
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
        }}
      >
        <ButtonGroup
          variant="text"
          aria-label="text button group"
          sx={{ alignItems: "right" }}
        >
          <Button sx={{ color: "black", mx: 2 }}>
            Filter
            {filterTab === false ? (
              <AddIcon
                sx={{ height: "80%", ml: 2 }}
                onClick={() => setFilterTab(true)}
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
              <InputLabel id="demo-simple-select-label" sx={{ color: "black" }}>
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
        </ButtonGroup>
        {filterTab === true ? (
          <FilterChoices
            setAppartments={setAppartments}
            appartments={appartments}
            allAppartments={allAppartments}
          ></FilterChoices>
        ) : (
          ""
        )}
        <Box
          sx={{
            minWidth: 120,
            alignSelf: "center",
            mx: 15,
            display: "flex",
          }}
        >
          <FilterByChatGpt
            appartments={appartments}
            setAppartments={setAppartments}
            allAppartments={allAppartments}
          ></FilterByChatGpt>
        </Box>
      </Box>
    </>
  );
}
