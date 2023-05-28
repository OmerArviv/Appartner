import { Button, CardActionArea } from "@material-ui/core";
import { Box, CardMedia, Typography } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import looker_img from "../images/looker_img.png";
import welcomer_img from "../images/welcomer_img.png";
import { pageTitleContext, authContext } from "../APP/Utils";
import { updateUserDetails } from "../controller/authenticationController";

const WhoAreYouProfile = () => {
  const navigate = useNavigate();
  const { setPageTitle } = useContext(pageTitleContext);
  const [userType, setUserType] = useState("");
  const { setUserRole, userEmail } = useContext(authContext);

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
      <Box
        item="true"
        sx={{
          width: "fit-content",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {userType ? (
          <Typography sx={{ fontSize: 40 }}>Hello, {`${userType}`}</Typography>
        ) : (
          <Typography sx={{ fontSize: 24, color: "black" }}>
            CHOOSE YOUR USER TYPE
          </Typography>
        )}
      </Box>
      <Box container="true" sx={{ display: "flex" }}>
        <Box
          item="true"
          xs={6}
          sx={{ width: "fit-content", marginLeft: "auto" }}
        >
          <Button
            sx={{ display: "flex", flexWrap: "wrap" }}
            onClick={() => setUserType("Welcomer")}
          >
            <CardActionArea
              sx={{
                width: "fit-content",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <CardMedia
                component="img"
                height="400"
                width="400"
                image={welcomer_img}
                alt="welcomer image"
                sx={{ width: "fit-content" }}
              />
              <Typography sx={{ fontSize: 26 }}>WELCOMER</Typography>
              <Typography sx={{ fontSize: 20 }}>
                People who own an apartment and <br /> looking for roommates
              </Typography>
            </CardActionArea>
          </Button>
        </Box>
        <Box
          item="true"
          xs={6}
          sx={{ width: "fit-content", marginRight: "auto" }}
        >
          <Button
            sx={{ display: "flex", flexWrap: "wrap" }}
            onClick={() => setUserType("Looker")}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="400"
                width="400"
                image={looker_img}
                alt="upload image 2"
              />
              <Typography sx={{ fontSize: 26 }}>LOOKER</Typography>
              <Typography sx={{ fontSize: 20 }}>
                People who are looking for <br /> an apartment to enter
              </Typography>
            </CardActionArea>
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default WhoAreYouProfile;
