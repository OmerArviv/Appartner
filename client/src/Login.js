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
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { loginTest, signIn } from "./data/authenticationData";
import { useContext } from "react";
import { authContext } from "./APP/Utils";

const Login = () => {
  const { setAuthenticated } = useContext(authContext);
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState();

  const handleLogin = () => setAuthenticated(true);
  const handleLogout = () => setAuthenticated(false);

  const onChangeUserEmailHandler = (event) => {
    setUserEmail(event.target.value);
  };
  const onChangeUserPasswordHandler = (event) => {
    setUserPassword(event.target.value);
  };
  const onSumbitHandler = async (event) => {

    event.preventDefault();
    if (userEmail && userPassword) {
      const result = await signIn(userEmail, userPassword);
      if(result == true){
        handleLogin();
      }else{
      // handle failed login
    } 
  }else {
      alert("Please enter email and password!");
    }
  };
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <TextField
          onChange={onChangeUserEmailHandler}
          className="simple-input"
          label="Email"
          placeholder="Enter Email"
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
          color="primary"
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
          Do you have an account ?<Link href="#">Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
