import { useContext, useEffect } from "react";
import { pageTitleContext } from "../APP/Utils";
import { updateUserProfilePrefernces } from "../controller/userProfilePreferncesController";

const Home = () => {
  const { setPageTitle } = useContext(pageTitleContext);

  useEffect(() => {
    setPageTitle("Home");
  }, []);

  return <h1>Hello</h1>;
};

export default Home;
