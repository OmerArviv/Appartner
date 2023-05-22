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