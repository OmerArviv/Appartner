import axios from "axios";
import { APP_ROUTES, POST_HEADERS, GET_HEADERS } from "../APP/APP_ROUTES";
import { getAppartmentByUserEmail } from "../controller/appartmentController";

export const createRoomateRequest = (roomateRequest) => {
  let url = APP_ROUTES.roomateRequest.createRoomateRequest;
  return axios
    .post(url, roomateRequest, POST_HEADERS())
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

export const updateRoomateRequest = (roomateRequest) => {
  let url = APP_ROUTES.roomateRequest.updateRoomateRequest;
  return axios
    .post(url, roomateRequest, POST_HEADERS())
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

export const getRoomateRequestByAppartmentId = (id) => {
  let url = APP_ROUTES.roomateRequest.getRoomateRequestByAppartmentId;
  let data = { id: id };
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

export const getRoomateRequestByUserEmail = (userEmail) => {
  let url = APP_ROUTES.RoomateRequest.getRoomateRequestByUserEmail;
  let data = { user_email: userEmail };
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

export const getRoomateRequestByAppartmentUserEmail = async (userEmail) => {
  const res = await getAppartmentByUserEmail(userEmail);
  var requests = [];
  if (res) {
    if (res.status == 200) {
      const appartments = res.data;
      for (let i = 0; i < appartments.length; i++) {
        const req = await getRoomateRequestByAppartmentId(appartments[i]._id);
        if (req && req.status == 200) {
          requests = requests.concat(req.data);
        }
      }
      return requests;
    }
  }
  return null;
};
