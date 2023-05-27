import { useState, useContext, useEffect } from "react";
import { getRoomateRequestByUserEmail } from "../controller/RoomateRequestController";
import { authContext, pageTitleContext } from "../APP/Utils";
import LookerRequestItem from "../components/LookerRequestItem";

const LookerRequestsPage = () => {
  const { setPageTitle } = useContext(pageTitleContext);
  const [userRequests, setUserRequests] = useState();
  const { userEmail } = useContext(authContext);
  // const [apartments, setApartments]= useState([]);
  // const [apartmentsID, setApartmentsID]= useState([]);

  const tmpApartmentsID = [];

  useEffect(() => {
    setPageTitle("Your Requests");
    getUserRequests();
  }, []);

  useEffect(() => {
    getUserRequests();
    // getAllUserRequestsApartments();
  }, [userRequests]);

  // useEffect(()=>{
  //   getAllUserRequestsApartments();
  //   // getAllUserRequestsApartments();
  // },[apartmentsID]);

  const getUserRequests = async () => {
    const res = await getRoomateRequestByUserEmail(userEmail);
    if (res) {
      setUserRequests(res);
    }
    // if(userRequests){
    //   userRequests.forEach((item, index)=>{
    //     tmpApartmentsID.push(item.appartment_id);
    //   });
    //   setApartmentsID(tmpApartmentsID);
    // }
    // getAllUserRequestsApartments();
  };

  // const getAllUserRequestsApartments= async()=>{
  //     if(apartmentsID){
  //       const tmpApa=[]

  //       for (let i = 0; i < apartmentsID.length; i++) {
  //         const ap=await getAppartmentById(apartmentsID[i]);
  //         if(ap){
  //           tmpApa.push(ap);
  //         }
  //       }
  //       setApartments(tmpApa);
  //     }
  // }

  return (
    <div>
      {userRequests
        ? userRequests.map((item, index) => {
            return <LookerRequestItem request={item} key={index} />;
          })
        : // apartments.map((item, index) => {

          //             return (
          //               // console.log(item.data)
          //               <Box
          //               key={index}
          //                 direction="row"
          //                 sx={{ display: "block", justifyContent:"center",marginRight:"50%", alignItems:"center", alignContent:"center" }}
          //               >
          //                 <Box item="true">
          //                 <ListItem>
          //                  <ApartmentListItem data={item.data} />
          //                 </ListItem>
          //                 <IconButton></IconButton>
          //                 </Box>
          //               </Box>
          //               )})
          "You don't have requests"}
    </div>
  );
};

export default LookerRequestsPage;
