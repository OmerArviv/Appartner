import axios from "axios";
import { APP_ROUTES, POST_HEADERS, GET_HEADERS } from "../APP/APP_ROUTES";

export const createConversation = (conversation) => {
    let url = APP_ROUTES.conversation.createConversation;
    return axios
      .post(url, conversation, POST_HEADERS())
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  };

  export const getUserConversations = (id) => {
    let url = APP_ROUTES.conversation.getConversation;
    let data = { _id: id };
  
    return axios
      .get(url, {
        params: data,
        headers: GET_HEADERS(),
      })
      .then((result) => {
        if (result) {
          return result;
        } else {
          return null;
        }
      })
      .catch((err) => {
        return null;
      });
  };

  export const getConversationsByUserId = (id) => {
    let url = APP_ROUTES.conversation.getConversationsByUserId;
    let data = { _id: id };
  
    return axios
      .get(url, {
        params: data,
        headers: GET_HEADERS(),
      })
      .then((result) => {
        if (result) {
          return result;
        } else {
          return null;
        }
      })
      .catch((err) => {
        return null;
      });
  };