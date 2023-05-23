import { getUserToken } from "./APP_AUTH";

/**
 * This module mapping all the http request of the UI.
 */

const AUTHENTICATION_ENPOINT = `${process.env.REACT_APP_SERVER_HOST}authentication`;
const USER_PROFILE_ENPOINT = `${process.env.REACT_APP_SERVER_HOST}userProfile`;
const USER_PROFILE_PREFERNCES_ENPOINT = `${process.env.REACT_APP_SERVER_HOST}userProfilePrefernces`;
const APPARTMENT_ENPOINT = `${process.env.REACT_APP_SERVER_HOST}appartment`;
const ROOMATE_REQUEST_ENPOINT = `${process.env.REACT_APP_SERVER_HOST}roomateRequest`;
const CHATGPT_ENPOINT = `${process.env.REACT_APP_SERVER_HOST}chatGpt`;
const CONVERSATION_ENPOINT = `${process.env.REACT_APP_SERVER_HOST}conversation`;
const MESSAGE_ENPOINT = `${process.env.REACT_APP_SERVER_HOST}message`;


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
 
    createUserVideo: `${USER_PROFILE_ENPOINT}/dalle`,
  },

  userProfilePrefernces: {
    createProfilePrefernces: `${USER_PROFILE_PREFERNCES_ENPOINT}/createProfilePrefernces`,
    updateProfilePrefernces: `${USER_PROFILE_PREFERNCES_ENPOINT}/updateProfilePrefernces`,
    getUserPreferncesByEmail: `${USER_PROFILE_PREFERNCES_ENPOINT}/getUserPreferncesByEmail`,
  },

  appartment: {
    createAppartment: `${APPARTMENT_ENPOINT}/createAppartment`,
    updateAppartment: `${APPARTMENT_ENPOINT}/updateAppartment`,
    getAppartmentByUserEmail: `${APPARTMENT_ENPOINT}/getAppartmentByUserEmail`,
    getAppartmentById: `${APPARTMENT_ENPOINT}/getAppartmentById`,
    getAllAppartments: `${APPARTMENT_ENPOINT}/getAllAppartments`,
    getAllAppartmentsAndRoomateDetails: `${APPARTMENT_ENPOINT}/getAllAppartmentsAndRoomateDetails`,
  },

  roomateRequest: {
    createRoomateRequest: `${ROOMATE_REQUEST_ENPOINT}/createRoomateRequest`,
    updateRoomateRequest: `${ROOMATE_REQUEST_ENPOINT}/updateRoomateRequest`,
    getRoomateRequestByUserEmail: `${ROOMATE_REQUEST_ENPOINT}/getRoomateRequestByUserEmail`,
    getRoomateRequestByAppartmentId: `${ROOMATE_REQUEST_ENPOINT}/getRoomateRequestByAppartmentId`,
    deleteRoomateRequestByUser: `${ROOMATE_REQUEST_ENPOINT}/deleteRoomateRequestByUser`,
  },
  chatGpt: {
    getBestMatches: `${CHATGPT_ENPOINT}/getBestMatches`,
    parseUserInput: `${CHATGPT_ENPOINT}/parse`,
  },
  conversation:{
    createConversation: `${CONVERSATION_ENPOINT}/createConversation`,
    getConversationById: `${CONVERSATION_ENPOINT}/getConversationById`,
    getConversationsByUserEmail: `${CONVERSATION_ENPOINT}/getConversationsByUserEmail`,
  },
  message:{
    createMessage:`${MESSAGE_ENPOINT}/createMessage`, 
    getConversationMessages:`${MESSAGE_ENPOINT}/getConversationMessages`, 
  }
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
