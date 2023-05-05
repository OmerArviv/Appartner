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
    <div>
      {" "}
      <RequestItem></RequestItem>
    </div>
  );
};

export default WelcomerHomePage;
