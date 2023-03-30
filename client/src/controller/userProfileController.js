import axios from "axios";
import { APP_ROUTES, POST_HEADERS } from "../APP/APP_ROUTES";

/**
 * This module hold all the request of Actions.
 */

//insert userProfile
export const createUserProfile = (userProfile) => {
  let url = APP_ROUTES.userProfile.createProfile;
  return axios
    .post(url, userProfile, POST_HEADERS())
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((err) => {
      return err;
    });
};
