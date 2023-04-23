import axios from "axios";
import { APP_ROUTES, POST_HEADERS } from "../APP/APP_ROUTES";

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
