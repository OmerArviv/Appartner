import { useEffect, useContext } from "react";
import { pageTitleContext } from "../APP/Utils";


function LookerHomePage(){
    const {setPageTitle} = useContext(pageTitleContext);

    useEffect(()=>{
        setPageTitle("Looker Home Page");
      },[]);

    return (<>
    
    hey
    
    </>)
}

export default LookerHomePage;