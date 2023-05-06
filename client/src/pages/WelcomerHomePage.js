import { useContext, useEffect } from "react";
import { pageTitleContext } from "../APP/Utils";
import { Typography } from "@mui/material";

const Home = () => {
  const { setPageTitle } = useContext(pageTitleContext);

  useEffect(() => {
    setPageTitle("Home");
  }, []);

  return (
    <Typography sx={{ textAlign: "center" }}>Welcomer Home Page</Typography>
  );
};

export default Home;
