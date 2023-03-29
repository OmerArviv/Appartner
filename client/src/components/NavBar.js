import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { pageTitle, pageTitleContext } from "../APP/Utils";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../APP/Utils";
import { RemoveTokenAfterSignOut } from "../APP/APP_AUTH";

export default function NavBar(props) {
  const navigate = useNavigate();
  const { authenticated, setAuthenticated } = useContext(authContext);
  const { pageTitle } = useContext(pageTitleContext);

  const handleSignOut = () => {
    RemoveTokenAfterSignOut();
    setAuthenticated(false);
    navigate("/login");
  };
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
            <Button
              sx={{ color: "inherit", background: "#CEC9B6" }}
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
