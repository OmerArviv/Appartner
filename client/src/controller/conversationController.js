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
        console.log(err);
        return err;
      });
  };

  export const getConversationByid = (id) => {
    let url = APP_ROUTES.conversation.getConversationById;
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

  export const getConversationsByUserEmail = (email) => {
    let url = APP_ROUTES.conversation.getConversationsByUserEmail;
    let data = { user_email: email };
  
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