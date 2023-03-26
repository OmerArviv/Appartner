import { React, useState } from "react";
import "./App.css";
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
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { loginTest, register } from "./controller/authenticationController";
import { useContext, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { authContext, pageTitleContext } from "./APP/Utils";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  // const {setPageTitle} = useContext(pageTitleContext);
  // setPageTitle("Login");

  const navigate = useNavigate();
  const { setAuthenticated } = useContext(authContext);
  const { setPageTitle } = useContext(pageTitleContext);
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState();
  const [userName, setUserName] = useState();
  const [userPhone, setUserPhone] = useState();

  useEffect(() => {
    setPageTitle("Sign Up");
  }, []);

  const handleLogin = () => {
    setAuthenticated(true);
    navigate("/");
  };
  const onChangeUserEmailHandler = (event) => {
    setUserEmail(event.target.value);
  };
  const onChangeUserPasswordHandler = (event) => {
    setUserPassword(event.target.value);
  };
  const onChangeUserNameHandler = (event) => {
    setUserName(event.target.value);
  };
  const onChangeUserPhoneHandler = (event) => {
    setUserPhone(event.target.value);
  };

  const onSumbitHandler = async (event) => {
    event.preventDefault();
    if (userEmail && userPassword && userName && userPhone) {
      const result = await register(
        userName,
        userEmail,
        userPassword,
        userPhone
      );
      // console.log(result);
      if (result == true) {
        handleLogin();
      } else {
        // handle failed login
        if (result.response.status == 409) {
          alert("You already have an account");
        } else if (result.response.status == 403) {
          alert("Error occured!");
        }
      }
    } else {
      alert("Please enter all fields!");
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
          <h2>Sign Up</h2>
        </Grid>
        <TextField
          onChange={onChangeUserNameHandler}
          className="simple-input"
          label="Name"
          placeholder="Enter Name"
          type="text"
          variant="outlined"
          fullWidth
          required
        />
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
          onChange={onChangeUserPhoneHandler}
          className="simple-input"
          label="Phone Number"
          placeholder="Enter Phone Number"
          type="text"
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
        <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Remember me"
        />
        <Button
          onClick={onSumbitHandler}
          type="submit"
          variant="contained"
          style={btnstyle}
          fullWidth
        >
          Sign Up
        </Button>
        <Typography>
          {" "}
          Already have an account ?
          <Link onClick={() => navigate("/login")}>Sign In</Link>
        </Typography>
      </Container>
    </Grid>
  );
};

export default Register;
