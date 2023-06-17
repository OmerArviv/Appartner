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

export const getNewAppartments = (date) => {
  let url = APP_ROUTES.appartment.getAllAppartments;
  return axios
    .get(url, {
      headers: GET_HEADERS(),
    })
    .then((result) => {
      if (result.data) {
        const appartments = result.data.filter((i) => i.publish_time > date);
        return appartments;
      } else {
        return null;
      }
    })
    .catch((err) => {
      return null;
    });
};

export const getAllAppartmentsAndRoomateDetails = () => {
  let url = APP_ROUTES.appartment.getAllAppartmentsAndRoomateDetails;
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

export const calculateDistance = (pos1, pos2) => {
  const R = 6371000;

  // convert decimal degrees to radians
  const lat1Rad = (pos1.lat * Math.PI) / 180;
  const lon1Rad = (pos1.lng * Math.PI) / 180;
  const lat2Rad = (pos2.lat * Math.PI) / 180;
  const lon2Rad = (pos2.lng * Math.PI) / 180;

  // calculate the differences between the latitudes and longitudes
  const deltaLat = lat2Rad - lat1Rad;
  const deltaLon = lon2Rad - lon1Rad;

  // apply the Haversine formula
  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // calculate the distance
  const calculatedDistance = R * c;
  return calculatedDistance;
};
