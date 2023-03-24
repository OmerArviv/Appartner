import axios from "axios";
import Cookies from "js-cookie";
import {setTokenAfterSignIn} from "../APP/APP_AUTH";
import { APP_ROUTES, POST_HEADERS } from "../APP/APP_ROUTES";


import { userState } from "../APP/Utils";

/**
 * This module hold all the request of Actions.
*/
export const signIn = (email, password) => {
  var data = { email: email, password: password };
  let url = APP_ROUTES.Authentication.login;
  return axios
    .post(url, data, POST_HEADERS())
    .then((result) => {
      setTokenAfterSignIn(result.data.token);
      return true;
    })
    .catch((err) => {
        return false;
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
