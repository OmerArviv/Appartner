import "./App.css";
import { useContext, useState } from "react";
import React from "react";
import { useEffect } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./Login";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { authContext, AuthProvider, PageTitleProvider } from "./APP/Utils";

import NavBar from "./components/NavBar";
import Register from "./Register";
import Home from "./Home";
import CreateProfile from './pages/CreateProfile';
import WhoAreYouProfile from './pages/WhoAreYouProfile';
import SetPrefernces from './pages/SetPreferncesProfile';

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
      contrastText: "black",
    },
  },
});

const MyThemeComponent = styled("div")(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));

function App() {
  const { authenticated } = useContext(authContext);

  return (
    <PageTitleProvider>
      <AuthProvider>
        <ThemeProvider theme={customTheme}>
          <MyThemeComponent>
            <BrowserRouter>
              <NavBar></NavBar>
              {authenticated ? (
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path='/create-profile' element={<CreateProfile/>}/>
                  <Route path='/create-profile/who-are-you' element={<WhoAreYouProfile/>}/>
                  <Route path='/create-profile/set-prefernces' element={<SetPrefernces/>}/>
                </Routes>
              ) : (
                <Routes>
                  {console.log("need login")}
                  <Route path="/" element={<Home />}></Route>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  {console.log(authenticated)}

                </Routes>
              )}
            </BrowserRouter>
          </MyThemeComponent>
        </ThemeProvider>
      </AuthProvider>
    </PageTitleProvider>
  );
}

export default App;
