import { useEffect, useContext } from "react";
import { pageTitleContext } from "../APP/Utils";
import ApartmentList from "../components/ApartmentList";

function LookerHomePage() {
  const { setPageTitle } = useContext(pageTitleContext);

  useEffect(() => {
    setPageTitle("Looker Home Page");
  }, []);

  return (
    <div>
      <ApartmentList />
    </div>
  );
}

export default LookerHomePage;
