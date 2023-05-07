import { useContext, useEffect } from "react";
import { pageTitleContext } from "../APP/Utils";
import RequestItem from "../components/RequestItem";
import { Grid } from "@mui/material";

const WelcomerHomePage = () => {
  const { setPageTitle } = useContext(pageTitleContext);

  useEffect(() => {
    setPageTitle("Requests");
  }, []);

  return (
    <Grid>
      <RequestItem></RequestItem>
    </Grid>
  );
};

export default WelcomerHomePage;
