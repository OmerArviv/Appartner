import axios from "axios";
import { APP_ROUTES, POST_HEADERS, GET_HEADERS } from "../APP/APP_ROUTES";

//add message to db
export const createMessage = (message) => {
  let url = APP_ROUTES.message.addMessage;
  console.log(message);
  return axios
    .post(url, message, POST_HEADERS())
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

//get the messages of the conversation by id(the id belong to the conversation)
export const getMessagesConversationById = (id) => {
  let url = APP_ROUTES.message.getConversationMessages;
  let data = { con_id: id };
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