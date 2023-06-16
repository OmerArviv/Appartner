import { Button, CardActionArea } from "@material-ui/core";
import {
  Box,
  CardMedia,
  Typography,
  Stepper,
  StepLabel,
  Step,
} from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import main_3 from "../images/main_3.jpg";
import main_1 from "../images/main_1.jpg";
import { pageTitleContext, authContext } from "../APP/Utils";
import { updateUserDetails } from "../controller/authenticationController";
import steps from "../components/StepperData";
import CustomStepper from "../components/CustomStepper";
import { styled } from "@mui/system";

const WhoAreYouProfile = () => {
  const navigate = useNavigate();
  const { setPageTitle } = useContext(pageTitleContext);
  const [userType, setUserType] = useState("");
  const { setUserRole, userEmail } = useContext(authContext);

  const SmallImage = styled("img")(({ theme }) => ({
    objectFit: "cover",
    borderRadius: "16px",
    width: 350,
    height: 200,
    marginBottom: theme.spacing(2),
  }));

  useEffect(() => {
    setPageTitle("Who Are You?");
  }, []);

  const onUserRoleUpdate = async () => {
    const email = userEmail;
    if (email && userType) {
      const res = await updateUserDetails({
        email: email,
        role: userType,
      });
      if ((res.status = 200)) {
        setUserRole(userType);
        navigate("/create-profile");
      } else {
        alert("Something went wrong!");
      }
    } else {
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    if (userType) {
      onUserRoleUpdate();
    }
  }, [userType]);

  return (
    <>
      <CustomStepper activeStep={1} steps={steps} />
      <Box
        item="true"
        sx={{
          width: "fit-content",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "15px",
        }}
      >
        {userType ? (
          <Typography sx={{ fontSize: 40 }}>Hello, {`${userType}`}</Typography>
        ) : (
          <Typography
            sx={{
              fontSize: 24,
              color: "black",
              paddingBottom: "20px",
            }}
          >
            CHOOSE YOUR USER TYPE
          </Typography>
        )}
      </Box>
      <Box container="true" sx={{ display: "flex" }}>
        <Box
          item="true"
          xs={6}
          sx={{ width: "fit-content", marginLeft: "auto", marginRight: "50px" }}
        >
          <Box sx={{ marginLeft: "50px" }}>
            <SmallImage alt="welcomer" src={main_1} />
            <Typography
              sx={{ fontSize: 30, textAlign: "center", paddingBottom: "10px" }}
            >
              WELCOMER
            </Typography>
            <Typography
              sx={{ fontSize: 20, textAlign: "center", paddingBottom: "20px" }}
            >
              People who own an apartment and <br /> looking for roommates
            </Typography>
            <Box sx={{ textAlign: "center" }}>
              <Button
                variant="outlined"
                size="large"
                onClick={() => setUserType("Welcomer")}
              >
                CHOOSE
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          item="true"
          xs={6}
          sx={{
            width: "fit-content",
            marginRight: "auto",
            marginLeft: "50px",
          }}
        >
          <Box sx={{ marginLeft: "50px" }}>
            <SmallImage alt="looker" src={main_3} />
            <Typography
              sx={{ fontSize: 30, textAlign: "center", paddingBottom: "10px" }}
            >
              LOOKER
            </Typography>
            <Typography
              sx={{ fontSize: 20, textAlign: "center", paddingBottom: "20px" }}
            >
              People who are looking for <br /> an apartment to enter
            </Typography>
            <Box sx={{ textAlign: "center" }}>
              <Button
                variant="outlined"
                size="large"
                onClick={() => setUserType("Looker")}
              >
                CHOOSE
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default WhoAreYouProfile;
