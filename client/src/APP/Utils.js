import axios from "axios";
import React, { Children } from "react";
import { APP_ROUTES, POST_HEADERS } from "./APP_ROUTES";
import {
  APP_AUTH,
  RemoveTokenAfterSignOut,
  getUserRole,
  setTokenAfterSignIn,
} from "./APP_AUTH";
import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const validateUserLoggedIn = () => {
  let url = APP_ROUTES.Authentication.validateUserLoggedIn;
  return axios
    .post(url, {}, POST_HEADERS())
    .then((result) => {
      return true;
    })
    .catch((err) => {
      return false;
    });
};

export const userState = createContext(false);

export const authContext = createContext("");

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [userRole, setRole] = useState(Cookies.get("user_role"));
  const [userId, setId] = useState(Cookies.get("user_id"));
  const [userEmail, setEmail] = useState(Cookies.get("user_email"));
  const [navBarStatus, setNavBarStatus] = useState(false);

  const setUserDetailsAfterLogIn = (user_id, user_email) => {
    setAuthenticated(true);
    setUserId(user_id);
    setUserEmail(user_email);
  };

  const removeUserDetailsAfterSignout = () => {
    setAuthenticated(false);
    setUserId(null);
    setUserEmail(null);
    RemoveTokenAfterSignOut();
    removeUserRole();
  };

  const removeUserRole = () => {
    Cookies.remove("user_role");
    setRole(null);
  };

  const setUserId = (id) => {
    //Welcomer / Looker
    if (id) {
      Cookies.set("user_id", id);
    } else {
      Cookies.remove("user_id");
    }
    setId(id);
  };

  const setUserEmail = (email) => {
    //Welcomer / Looker
    if (email) {
      Cookies.set("user_email", email);
    } else {
      Cookies.remove("user_email");
    }
    setEmail(email);
  };

  const setUserRole = (role) => {
    //Welcomer / Looker
    if (role) {
      Cookies.set("user_role", role);
    } else {
      Cookies.remove("user_role");
    }
    setRole(role);
  };

  const getUserRole = () => {
    if (Cookies.get("user_role") != userRole) {
      setUserRole(Cookies.get("user_role"));
    }
    return userRole;
  };

  async function checkLoggedIn() {
    let res = await validateUserLoggedIn();
    setAuthenticated(res);
  }

  useEffect(() => {
    // checkLoggedIn();
    if (Cookies.get("user_id")) {
      setAuthenticated(true);
    }
  }, []);

  return (
    <authContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        getUserRole,
        setUserRole,
        userRole,
        setUserId,
        userId,
        setUserDetailsAfterLogIn,
        userEmail,
        removeUserDetailsAfterSignout,
        setNavBarStatus,
        navBarStatus,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export const pageTitleContext = createContext("");

export function PageTitleProvider({ children }) {
  const [pageTitle, setPageTitle] = useState("");

  return (
    <pageTitleContext.Provider value={{ pageTitle, setPageTitle }}>
      {children}
    </pageTitleContext.Provider>
  );
}
