import axios from "axios";
import { APP_ROUTES, POST_HEADERS, GET_HEADERS } from "../APP/APP_ROUTES";


export const parseData = async (data) => {
  let url = APP_ROUTES.chatGpt.parseUserInput;

  try {
    const res = await axios.post(url, {data} , POST_HEADERS());
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getBestMatchesCgptApi = async (data) => {
  let url = APP_ROUTES.chatGpt.getBestMatches;
  try {
    const res = await axios.post(
      url,
      { data },
      { headers: { "Content-Type": "application/json" } }
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const convWithChatGpt = async (data) => {

  let url = APP_ROUTES.chatGpt.convWithChat;
  try {
    const res = await axios.post(
      url,
      { data },
      { headers: { "Content-Type": "application/json" } }
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const shortcutWithChatGpt = async (data) => {

  let url = APP_ROUTES.chatGpt.shortcutWithChatGpt;
  try {
    const res = await axios.post(
      url,
      { data },
      { headers: { "Content-Type": "application/json" } }
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const summaryWithChatGpt = async (data) => {

  let url = APP_ROUTES.chatGpt.summaryWithChatGpt;
  try {
    const res = await axios.post(
      url,
      { data },
      { headers: { "Content-Type": "application/json" } }
    );
    return res;
  } catch (error) {
    throw error;
  }
};



