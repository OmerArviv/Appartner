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
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { register } from "../controller/authenticationController";
import { useContext, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { authContext, pageTitleContext } from "../APP/Utils";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

const Register = (props) => {
  const navigate = useNavigate();
  const { setUserDetailsAfterLogIn } = useContext(authContext);
  const { setPageTitle } = useContext(pageTitleContext);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userSalt, setUserSalt] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setPageTitle("Sign Up");
  }, []);

  const handleLogin = (id) => {
    setUserDetailsAfterLogIn(id, userEmail);
    navigate("/create-profile/who-are-you");
  };

  const onChangeUserEmailHandler = (event) => {
    setUserEmail(event.target.value);
  };

  const onChangeUserPasswordHandler = (event) => {
    const salt = bcrypt.genSaltSync(10);
    setUserPassword(bcrypt.hashSync(event.target.value, salt));
    setUserSalt(salt);
  };

  const onChangeUserNameHandler = (event) => {
    setUserName(event.target.value);
  };

  const onChangeUserPhoneHandler = (event) => {
    setUserPhone(event.target.value);
  };

  const onSumbitHandler = async (event) => {
    event.preventDefault();
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(userEmail)) {
      setError("Please enter a valid email");
      return;
    }
    if (userEmail && userPassword && userName && userPhone) {
      const result = await register(
        userName,
        userEmail,
        userPassword,
        userSalt,
        userPhone
      );
      if (result.status === 201) {
        handleLogin(result.data.id);
      } else {
        // handle failed registration
        if (result.status === 409) {
          setError("You already have an account");
        } else {
          setError("An error occurred");
        }
      }
    } else {
      setError("Please enter all fields");
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
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Typography>
          Already have an account?
          <Link onClick={() => navigate("/login")}>Sign In</Link>
        </Typography>
      </Container>
    </Grid>
  );
};

export default Register;
