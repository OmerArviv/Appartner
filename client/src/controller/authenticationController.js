import axios from "axios";
import { setTokenAfterSignIn } from "../APP/APP_AUTH";
import { APP_ROUTES, POST_HEADERS, GET_HEADERS } from "../APP/APP_ROUTES";

/**
 * This module hold all the request of Actions.
 */
export const signIn = (email, password) => {
  var data = { email: email, password: password };
  let url = APP_ROUTES.Authentication.login;
  return axios
    .post(url, data, POST_HEADERS())
    .then((result) => {
      setTokenAfterSignIn(result.data.token, email);
      return true;
    })
    .catch((err) => {
      return err;
    });
};

export const register = (name, email, password, salt, phone) => {
  var data = {
    full_name: name,
    email: email,
    password: password,
    salt: salt,
    phone_number: phone,
  };
  let url = APP_ROUTES.Authentication.register;
  return axios
    .post(url, data, POST_HEADERS())
    .then((result) => {
      setTokenAfterSignIn(result.data.token, email);
      return true;
    })
    .catch((err) => {
      return err;
    });
};

// login test

export const loginTest = () => {
  let url = APP_ROUTES.Authentication.loginTest;
  let data = {};
  return axios
    .post(url, data, POST_HEADERS())
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

export const getSalt = (email) => {
  let url = APP_ROUTES.Authentication.getUserSalt;
  let data = { email: email };
  return axios
    .get(url, {
      params: data,
      headers: GET_HEADERS(),
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

export const updateUserDetails = (user) => {
  let url = APP_ROUTES.Authentication.updateUserDetails;
  let data = { user: user };
  return axios
    .post(url, data, POST_HEADERS())
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};
