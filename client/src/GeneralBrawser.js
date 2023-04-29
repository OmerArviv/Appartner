import "./App.css";
import { useContext, useState } from "react";
import React from "react";
import { useEffect } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { authContext, AuthProvider, PageTitleProvider } from "./APP/Utils";

import NavBar from "./components/NavBar";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CreateProfile from "./pages/CreateProfile";
import WhoAreYouProfile from "./pages/WhoAreYouProfile";
import SetPrefernces from "./pages/SetPreferncesProfile";
import SpeechToText from "./components/Speechtotextapi/Speechtotext";
import Apartment from "./pages/Apartment";
import UserProfile from "./pages/UserProfile";
import CreateApartment from "./pages/CreateApartment";
import LookerHomePage from "./pages/LookerHomePage";

function GeneralBrawser() {
  const { authenticated } = useContext(authContext);

  return (
    <BrowserRouter>
      <NavBar></NavBar>
      {authenticated ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-profile" element={<CreateProfile />} />
          <Route
            path="/create-profile/who-are-you"
            element={<WhoAreYouProfile />}
          />
          <Route
            path="/create-profile/set-prefernces"
            element={<SetPrefernces />}
          />
          <Route path="/create-profile" element={<CreateProfile />} />
          <Route path="/create-apartment" element={<CreateApartment />} />
          <Route path="/speach-to-text" element={<SpeechToText />} />
          <Route path="/looker-home-page" element={<LookerHomePage />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/apartment" element={<Apartment />} />
          <Route path="/userProfile" element={<UserProfile />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default GeneralBrawser;
