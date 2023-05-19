import axios from "axios";
import { APP_ROUTES, POST_HEADERS, GET_HEADERS } from "../APP/APP_ROUTES";

export const createUserProfilePrefernces = (userProfile) => {
  let url = APP_ROUTES.userProfilePrefernces.createProfilePrefernces;
  return axios
    .post(url, userProfile, POST_HEADERS())
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

export const updateUserProfilePrefernces = (userProfile) => {
  let url = APP_ROUTES.userProfilePrefernces.updateProfilePrefernces;
  console.log(url);
  return axios
    .post(url, userProfile, POST_HEADERS())
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

export const getUserPreferncesByEmail = (email) => {
  console.log(email);
  let url = APP_ROUTES.userProfilePrefernces.getUserPreferncesByEmail;
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
