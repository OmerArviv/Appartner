import { React, useState } from "react";
import "../App.css";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  Container,
} from "@material-ui/core";
import {
  getSalt,
  getUserByEmail,
  signIn,
} from "../controller/authenticationController";
import { useContext, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { authContext, pageTitleContext } from "../APP/Utils";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import { getUserProfileByEmail } from "../controller/userProfileController";
import { getUserRole, setUserRole } from "../APP/APP_AUTH";
import { getUserPreferncesByEmail } from "../controller/userProfilePreferncesController";

const Login = (props) => {
  const { setPageTitle } = useContext(pageTitleContext);
  const navigate = useNavigate();
  const { setUserDetailsAfterLogIn } = useContext(authContext);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const { setUserRole, getUserRole } = useContext(authContext);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const user = await getUserByEmail(userEmail);
    if (user) {
      setUserDetailsAfterLogIn(user._id, userEmail);
      if (user.role) {
        setUserRole(user.role);
      } else {
        navigate("/create-profile/who-are-you");
        return;
      }
    }
    const userProfile = await getUserProfileByEmail(userEmail);
    if (!userProfile) {
      navigate("/create-profile");
      return;
    }
    const userRole = getUserRole();
    if (userRole === "Looker") {
      const userPreferences = await getUserPreferncesByEmail(userEmail);
      if (!userPreferences) {
        navigate("/create-profile/set-preferences");
        return;
      }
    }
    navigate("/");
    setError(""); // Clear any previous error messages
  };

  useEffect(() => {
    setPageTitle("Login");
  }, []);

  const onChangeUserEmailHandler = (event) => {
    setUserEmail(event.target.value);
  };

  const onChangeUserPasswordHandler = (event) => {
    setUserPassword(event.target.value);
  };

  const onSumbitHandler = async (event) => {
    event.preventDefault();
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(userEmail)) {
      setError("Please enter a valid email");
      return;
    }
    if (userEmail && userPassword) {
      const salt = await getSalt(userEmail);
      if (salt && salt.status === 200) {
        const hashedPassword = bcrypt.hashSync(userPassword, salt.data);
        const result = await signIn(userEmail, hashedPassword);
        if (result === true) {
          handleLogin();
        } else {
          setError("Email or password is incorrect");
        }
      } else {
        setError("Something went wrong");
      }
    } else {
      setError("Please enter email and password");
    }
  };

  const ContainerStyle = {
    padding: 20,
    height: "70vh",
    margin: "20px auto",
  };
  const btnstyle = {
    margin: "8px 0",
    background: "#4F4E51",
    height: "50px",
    color: "#D0D2D8",
  };

  return (
    <Grid>
      <Container maxWidth="sm" style={ContainerStyle}>
        <Grid align="center">
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <AccountCircleIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <TextField
          type="email"
          id="outlined-basic"
          onChange={onChangeUserEmailHandler}
          className="simple-input"
          label="Email"
          placeholder="Email"
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          onChange={onChangeUserPasswordHandler}
          className="simple-input"
          label="Password"
          placeholder="Enter password"
          type="password"
          variant="outlined"
          fullWidth
          required
        />
        <Button
          onClick={onSumbitHandler}
          type="submit"
          variant="contained"
          style={btnstyle}
          fullWidth
        >
          Sign in
        </Button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Typography>
          <Link href="#">Forgot password?</Link>
        </Typography>
        <Typography>
          Do you have an account?
          <Link onClick={() => navigate("/register")}>Sign Up</Link>
        </Typography>
      </Container>
    </Grid>
  );
};

export default Login;
