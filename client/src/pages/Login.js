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
import { getSalt, signIn } from "../controller/authenticationController";
import { useContext, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { authContext, pageTitleContext } from "../APP/Utils";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

const Login = (props) => {
  const { setPageTitle } = useContext(pageTitleContext);
  const navigate = useNavigate();
  const { setAuthenticated } = useContext(authContext);
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState();

  const handleLogin = () => {
    setAuthenticated(true);
    // if (true || checkUserProfileExist(userEmail)) {
    navigate("/create-profile/who-are-you");
    // } else {
    //   navigate("/create-profile");
    // }
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
    if (userEmail && userPassword) {
      const salt = await getSalt(userEmail);
      console.log(salt);
      if ((salt.status = 200)) {
        const hashedPassword = bcrypt.hashSync(userPassword, salt.data);
        const result = await signIn(userEmail, hashedPassword);
        if (result == true) {
          handleLogin();
        } else {
          console.log(result);
          // handle failed login
        }
      } else {
        alert("Something went wrong!");
      }
    } else {
      alert("Please enter email and password!");
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
        <Typography>
          <Link href="#">Forgot password ?</Link>
        </Typography>
        <Typography>
          {" "}
          Do you have an account ?
          <Link onClick={() => navigate("/register")}>Sign Up</Link>
        </Typography>
      </Container>
    </Grid>
  );
};

export default Login;
