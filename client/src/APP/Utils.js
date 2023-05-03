import axios from "axios";
import React, { Children } from "react";
import { APP_ROUTES, POST_HEADERS } from "./APP_ROUTES";
import { APP_AUTH, getUserRole } from "./APP_AUTH";
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

  useEffect(async () => {
    checkLoggedIn();
  }, []);

  return (
    <authContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        getUserRole,
        setUserRole,
        userRole,
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
