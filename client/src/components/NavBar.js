import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { pageTitle, pageTitleContext } from "../APP/Utils";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../APP/Utils";
import { RemoveTokenAfterSignOut } from "../APP/APP_AUTH";
import {Avatar, Badge, Tooltip } from "@mui/material";
import Cookies from "js-cookie";
import { getUserProfileByEmail } from "../controller/userProfileController";
import { Stack } from "@mui/system";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AddHomeIcon from '@mui/icons-material/AddHome';
import { getAppartmentByUserEmail } from "../controller/appartmentController";

export default function NavBar(props) {
  const navigate = useNavigate();
  const { authenticated, removeUserDetailsAfterSignout } =
    useContext(authContext);
  const { pageTitle } = useContext(pageTitleContext);
  const [userProfile, setUserProfile]=useState("");
  const userRole=Cookies.get("user_role");
  const [requestsNumber, setRequestsNumber] = useState(1);
  const [userApartments, setUserApartments] = useState("");

  const handleSignOut = () => {
    removeUserDetailsAfterSignout();
    navigate("/login");
  };

  useEffect(()=>{ 
    getUserHandler();
    getUserApartmentsHandler();
  }, []);

  const getUserHandler= async ()=>{
    const res= await getUserProfileByEmail(Cookies.get("user_email"));
    if (res) {
      setUserProfile(res);
    }
  }

  const getUserApartmentsHandler= async ()=>{
    const res= await getAppartmentByUserEmail(Cookies.get("user_email"));
    if (res._id) {
      console.log("apartment");
      setUserApartments(res);
      console.log(res);
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: "#EDE3DF" }}>
        <Toolbar>
          <img
            id="logo"
            src="/logo.png"
            style={{
              width: 90,
              cursor: "pointer",
            }}
            alt="Logo"
            onClick={() => navigate("/")}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            {pageTitle}
          </Typography>
          {!authenticated ? (
            <div>
              <Button
                sx={{ color: "inherit", background: "#CEC9B6", mr: 2 }}
                onClick={() => navigate("/register")}
              >
                Sign Up
              </Button>
              <Button
                sx={{ color: "inherit", background: "#CEC9B6" }}
                onClick={() => navigate("/login")}
              >
                Log In
              </Button>
            </div>
          ) : (
            <>
            {userRole == "Welcomer" ? (
              <>
              <Tooltip title="Your Requests" disableInteractive>
              <IconButton >
              <Badge color="secondary" badgeContent={requestsNumber}  onClick={()=>{navigate("/")}} max={10}>
                <PeopleAltIcon fontSize="large"/>
              </Badge>
              </IconButton>
              </Tooltip >
              {userApartments? (
                <Tooltip title="Your Apartment" disableInteractive>
                <IconButton onClick={()=>navigate(`/apartment/${userApartments._id}`)}>
                  <HomeRoundedIcon fontSize="large"/>
                </IconButton>
                </Tooltip>) : (
                <Tooltip title="Create Apartment" disableInteractive>
                <IconButton onClick={()=>{navigate(`/create-apartment`);}}>
                <AddHomeIcon fontSize="large"/>
              </IconButton>
              </Tooltip>   )}
              
            </>
            ):(<Stack direction="row">
              <Typography>

              </Typography>
            </Stack>)}
            
            <Stack>
            <Tooltip title="Your Profile" disableInteractive>
            <IconButton>
            <Avatar 
            src={userProfile ? userProfile.user_profile_image : "" }
            onClick={()=>{navigate("/userProfile")}}
            />
            </IconButton>
            </Tooltip>
            </Stack>
            <Button
              sx={{ color: "inherit", background: "#CEC9B6" }}
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
