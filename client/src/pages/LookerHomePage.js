import { useEffect, useContext, useState } from "react";
import ApartmentList from "../components/ApartmentList";
import { getUserLastLogin } from "../controller/authenticationController";
import { authContext, pageTitleContext } from "../APP/Utils";
import { getNewAppartments } from "../controller/appartmentController";
import { Box, Dialog, DialogTitle } from "@mui/material";
import ApartmentCarousel from "../components/ApartmentCarousel";
import UserProfile from "./UserProfile";
import { Container } from "@mui/system";

function LookerHomePage() {
  const { setPageTitle } = useContext(pageTitleContext);
  const { userEmail } = useContext(authContext);
  const [appartments, setAppartments] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setPageTitle("Looker Home Page");
    setNewAppartments();
  }, []);

  const setNewAppartments = async () => {
    const res = await getUserLastLogin(userEmail);
    if (res) {
      var data = await getNewAppartments(res);
      if (data.length > 0) {
        setAppartments(data);
        setModal(true);
      }
    }
  };

  const handleCloseProfile = () => {
    setModal(false);
  };

  return (
    <div>
      {appartments.length > 0 ? (
        <Dialog
          maxWidth="lg"
          fullWidth={true}
          height="auto"
          open={modal}
          onClose={handleCloseProfile}
        >
          <Box sx={{ width: "auto", height: "auto" }}>
            <DialogTitle textAlign="center">
              New Appartments That you Would like
            </DialogTitle>
            <ApartmentCarousel apartments={appartments}></ApartmentCarousel>
          </Box>
        </Dialog>
      ) : (
        ""
      )}
      <ApartmentList />
    </div>
  );
}

export default LookerHomePage;
