import axios from "axios";
import React, { Children } from "react";
import { APP_ROUTES, POST_HEADERS } from "./APP_ROUTES";
import { createContext, useState, useEffect } from "react";

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

  async function checkLoggedIn() {
    let res = await validateUserLoggedIn();
    setAuthenticated(res);
  }

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <authContext.Provider value={{ authenticated, setAuthenticated }}>
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
