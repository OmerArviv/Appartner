import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { pageTitleContext } from "../APP/Utils";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../APP/Utils";
import { Avatar, Badge, DialogTitle, Tooltip } from "@mui/material";
import Cookies from "js-cookie";
import { getUserProfileByEmail } from "../controller/userProfileController";
import { Stack } from "@mui/system";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AddHomeIcon from "@mui/icons-material/AddHome";
import { getAppartmentByUserEmail } from "../controller/appartmentController";
import { getRoomateRequestByAppartmentUserEmail } from "../controller/RoomateRequestController";
import UserProfile from "../pages/UserProfile";
import { Dialog } from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";

export default function NavBar(props) {
  const navigate = useNavigate();
  const {
    authenticated,
    removeUserDetailsAfterSignout,
    userEmail,
    navBarStatus,
  } = useContext(authContext);
  const { pageTitle } = useContext(pageTitleContext);
  const [userProfile, setUserProfile] = useState("");
  const userRole = Cookies.get("user_role");
  const [requestsNumber, setRequestsNumber] = useState(0);
  const [userApartments, setUserApartments] = useState("");
  const [modal, setModal] = useState(false);

  const handleSignOut = () => {
    removeUserDetailsAfterSignout();
    navigate("/login");
  };

  useEffect(() => {
    getUserHandler();
    getUserApartmentsHandler();
    getRoomateRequesHandler();
  }, []);

  useEffect(() => {
    getUserHandler();
    getUserApartmentsHandler();
    getRoomateRequesHandler();
  }, [authenticated, navBarStatus]);

  useEffect(() => {
    getUserHandler();
  }, [userEmail]);

  const getUserHandler = async () => {
    const res = await getUserProfileByEmail(userEmail);
    if (res) {
      setUserProfile(res);
    }
  };

  const getUserApartmentsHandler = async () => {
    const res = await getAppartmentByUserEmail(userEmail);
    if (res.status === 200 && res.data.length !== 0) {
      setUserApartments(res.data[0]);
    }
  };

  const getRoomateRequesHandler = async () => {
    if (userEmail) {
      const res = await getRoomateRequestByAppartmentUserEmail(userEmail);
      if (res) {
        const req = res.filter((x) => {
          return x.status == "pending";
        });
        setRequestsNumber(req.length);
      }
    }
  };

  const handleCloseProfile = () => {
    setModal(false);
  };

  return (
    <Box>
      <AppBar position="static" style={{ background: "#BDCDD6" }}>
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexGrow: 1,
            }}
          >
            <Typography
              component="div"
              variant="h8"
              sx={{
                textAlign: "center",
                textTransform: "uppercase",
                fontFamily: "Pacifico, cursive",
                fontWeight: "bold",
                fontSize: "2rem",
                marginLeft: "70px", // Adjust the margin value as needed
              }}
            >
              {pageTitle}
            </Typography>
          </Box>
          {!authenticated ? (
            <div>
              <Button
                sx={{
                  color: "inherit",
                  background: "#E9E8E8",
                  mr: 2,
                  ":hover": {
                    bgcolor: "#fff",
                  },
                }}
                onClick={() => navigate("/register")}
              >
                Sign Up
              </Button>
              <Button
                sx={{
                  color: "inherit",
                  background: "#E9E8E8",
                  ":hover": {
                    bgcolor: "#fff",
                  },
                }}
                onClick={() => navigate("/login")}
              >
                Log In
              </Button>
            </div>
          ) : (
            <>
              {userRole === "Welcomer" ? (
                <>
                  <Tooltip title="Your Requests" disableInteractive>
                    <IconButton
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      <Badge
                        color="secondary"
                        badgeContent={requestsNumber}
                        max={10}
                      >
                        <PeopleAltIcon fontSize="large" />
                      </Badge>
                    </IconButton>
                  </Tooltip>
                  {userApartments ? (
                    <Tooltip title="Your Apartment" disableInteractive>
                      <IconButton
                        onClick={() =>
                          navigate(`/apartment/${userApartments._id}`)
                        }
                      >
                        <HomeRoundedIcon fontSize="large" />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Create Apartment" disableInteractive>
                      <IconButton
                        onClick={() => {
                          navigate(`/create-apartment`);
                        }}
                      >
                        <AddHomeIcon fontSize="large" />
                      </IconButton>
                    </Tooltip>
                  )}
                </>
              ) : (
                <Stack direction="row">
                  <Tooltip title="Your Requests" disableInteractive>
                    <IconButton
                      onClick={() => {
                        navigate("/looker/looker-requests");
                      }}
                    >
                      <TelegramIcon fontSize="large" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Set Your Preferences" disableInteractive>
                    <IconButton
                      onClick={() => {
                        navigate("/set-your-pref");
                      }}
                    >
                      <PsychologyAltIcon fontSize="large" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              )}

              <Stack>
                <Tooltip title="Your Profile" disableInteractive>
                  <IconButton
                    onClick={() => {
                      setModal(true);
                    }}
                  >
                    <Avatar
                      src={userProfile ? userProfile.user_profile_image : ""}
                    />
                  </IconButton>
                </Tooltip>
                <Dialog maxWidth="lg" open={modal} onClose={handleCloseProfile}>
                  <DialogTitle textAlign="center">Your Profile</DialogTitle>
                  <UserProfile email={userEmail ? userEmail : ""} />
                </Dialog>
              </Stack>
              <Button
                sx={{
                  color: "inherit",
                  background: "#E9E8E8",
                  ":hover": {
                    bgcolor: "#fff",
                  },
                }}
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
