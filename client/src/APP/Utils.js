import axios from "axios";
import React from "react";
import { APP_ROUTES, POST_HEADERS } from "./APP_ROUTES";
import { createContext } from "react";

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

export const userState = React.createContext(false);

export const authContext = createContext({
  authenticated: false,
  setAuthenticated: (auth) => {},
});
