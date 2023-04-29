import { useEffect, useContext } from "react";
import { pageTitleContext } from "../APP/Utils";
import ApartmentListItem from "../components/ApartmentListItem";

const data={
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_K499eYY1TlP-vJ9TPcBDqTf6Cj8RLG-CaA&usqp=CAU",
    address: "Rotchild , Tel Aviv",
    price: "1500$",
    roommates_images: ["https://cdn.w600.comps.canstockphoto.co.il/%D7%90%D7%95%D7%A4%D7%99-%D7%A9%D7%9E%D7%97-%D7%90%D7%95-%D7%A6%D7%99%D7%95%D7%A8-%D7%94%D7%99%D7%AA%D7%95%D7%9C%D7%99-%D7%90%D7%99%D7%A9-%D7%A2%D7%A1%D7%A7%D7%99%D7%9D-%D7%95%D7%A7%D7%98%D7%95%D7%A8-%D7%90%D7%99%D7%A4%D7%A1%D7%90%D7%A1_csp75767149.jpg",
     "https://static.wixstatic.com/media/df7dea_64c7fb48c5d54b3b832cc73724099420~mv2.jpg/v1/fill/w_625,h_938,al_c,q_85,usm_0.66_1.00_0.01/df7dea_64c7fb48c5d54b3b832cc73724099420~mv2.webp"]
};

function LookerHomePage(){
    const {setPageTitle} = useContext(pageTitleContext);

    useEffect(()=>{
        setPageTitle("Looker Home Page");
      },[]);

    return (<>
    
    <ApartmentListItem data={data}/>
    
    </>)
}

export default LookerHomePage;