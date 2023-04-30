import axios from "axios";
import { APP_ROUTES, POST_HEADERS, GET_HEADERS } from "../APP/APP_ROUTES";

/**
 * This module hold all the request of Actions.
 */

//insert userProfile
export const createUserProfile = (userProfile) => {
  let url = APP_ROUTES.userProfile.createProfile;
  return axios
    .post(url, userProfile, POST_HEADERS())
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

export const getUserProfileByEmail = (email) => {
  let url = APP_ROUTES.userProfile.getUserProfileByEmail;
  let data = { email: email };
  return axios
    .get(url, {
      params: data,
      headers: GET_HEADERS(),
    })
    .then((result) => {
      if (result.data) {
        return result.data;
      } else {
        return null;
      }
    })
    .catch((err) => {
      return null;
    });
};
