import { getUserToken } from "./APP_AUTH";

/**
 * This module mapping all the http request of the UI.
 */

const AUTHENTICATION_ENPOINT = `${process.env.REACT_APP_SERVER_HOST}authentication`;
const USER_PROFILE_ENPOINT = `${process.env.REACT_APP_SERVER_HOST}userProfile`;
const USER_PROFILE_PREFERNCES_ENPOINT = `${process.env.REACT_APP_SERVER_HOST}userProfilePrefernces`;

export const APP_ROUTES = {
  Authentication: {
    register: `${AUTHENTICATION_ENPOINT}/register`,
    login: `${AUTHENTICATION_ENPOINT}/login`,
    validateUserLoggedIn: `${AUTHENTICATION_ENPOINT}/login_test`,
    getUserSalt: `${AUTHENTICATION_ENPOINT}/getUserSalt`,
    updateUserDetails: `${AUTHENTICATION_ENPOINT}/updateUserDetails`,
    getUserByEmail: `${AUTHENTICATION_ENPOINT}/getUserByEmail`,
  },

  userProfile: {
    createProfile: `${USER_PROFILE_ENPOINT}/createProfile`,
    updateProfile: `${USER_PROFILE_ENPOINT}/updateProfile`,
    getUserProfileByEmail: `${USER_PROFILE_ENPOINT}/getUserProfileByEmail`,
  },

  userProfilePrefernces: {
    createProfilePrefernces: `${USER_PROFILE_PREFERNCES_ENPOINT}/createProfilePrefernces`,
    updateProfilePrefernces: `${USER_PROFILE_PREFERNCES_ENPOINT}/updateProfilePrefernces`,
    getUserPreferncesByEmail: `${USER_PROFILE_PREFERNCES_ENPOINT}/getUserPreferncesByEmail`,
  },
};

// HEADERS()
const headers = {
  "Content-Type": "application/json",
  "x-access-token": getUserToken(),
};

export const GET_HEADERS = () => {
  return headers;
};

export const POST_HEADERS = () => {
  return {
    // method: 'post',
    headers: headers,
  };
};
