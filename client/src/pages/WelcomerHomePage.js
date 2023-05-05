import { useContext, useEffect } from "react";
import { pageTitleContext } from "../APP/Utils";
import { Typography } from "@mui/material";
import RequestItem from "../components/RequestItem";

const WelcomerHomePage = () => {
  const { setPageTitle } = useContext(pageTitleContext);

  useEffect(() => {
    setPageTitle("Home");
  }, []);

  return (
    // <Typography sx={{ textAlign: "center" }}>Welcomer Home Page</Typography>
    <RequestItem></RequestItem>
  );
};

export default WelcomerHomePage;
