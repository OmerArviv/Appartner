import { getUserToken } from "./APP_AUTH";
/**
 * This module mapping all the http request of the UI.
 */

const AUTHENTICATION_ENPOINT = `${process.env.REACT_APP_SERVER_HOST}authentication`;

export const APP_ROUTES = {
  Authentication: {
    register: `${AUTHENTICATION_ENPOINT}/register`,
    login: `${AUTHENTICATION_ENPOINT}/login`,
    validateUserLoggedIn: `${AUTHENTICATION_ENPOINT}/login_test`,
  },
};

// HEADERS()
const headers = {
  "Content-Type": "application/json",
  "x-access-token": getUserToken(),
};

export const GET_HEADERS = () => {
  return {
    method: "GET",
    headers: headers,
  };
};

export const POST_HEADERS = () => {
  return {
    // method: 'post',
    headers: headers,
  };
};
