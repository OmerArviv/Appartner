import axios from "axios";
import { APP_ROUTES, POST_HEADERS, GET_HEADERS } from "../APP/APP_ROUTES";

export const createMessage = (message) => {
  let url = APP_ROUTES.message.addMessage;
  return axios
    .post(url, message, POST_HEADERS())
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};