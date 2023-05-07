import axios from "axios";
import { APP_ROUTES, POST_HEADERS, GET_HEADERS } from "../APP/APP_ROUTES";

export const createAppartment = (appartment) => {
  let url = APP_ROUTES.appartment.createAppartment;
  return axios
    .post(url, appartment, POST_HEADERS())
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

export const updateAppartment = (appartment) => {
  let url = APP_ROUTES.appartment.updateAppartment;
  return axios
    .post(url, appartment, POST_HEADERS())
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

export const getAppartmentById = (id) => {
  let url = APP_ROUTES.appartment.getAppartmentById;
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

export const getAppartmentByUserEmail = (userEmail) => {
  let url = APP_ROUTES.appartment.getAppartmentByUserEmail;
  let data = { email: userEmail };
  return axios
    .get(url, {
      params: data,
      headers: GET_HEADERS(),
    })
    .then((result) => {
      if (result.data) {
        return result.data;
      } else {
        return null;
      }
    })
    .catch((err) => {
      return null;
    });
};

export const getAllAppartments = () => {
  let url = APP_ROUTES.appartment.getAllAppartments;
  return axios
    .get(url, {
      headers: GET_HEADERS(),
    })
    .then((result) => {
      if (result.data) {
        return result.data;
      } else {
        return null;
      }
    })
    .catch((err) => {
      return null;
    });
};
