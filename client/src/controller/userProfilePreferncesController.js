import axios from "axios";
import { APP_ROUTES, POST_HEADERS } from "../APP/APP_ROUTES";

export const userProfileSetPrefernces = (email, ageRange, location, priceRange, gender, elevator, parking, smoking, numberOfRoomates) => {
    let url = APP_ROUTES.userProfile.userProfilePrefernces;
    let data = {
      email: email,
      ageRange: ageRange,
      location: location,
      priceRange: priceRange,
      gender: gender,
      elevator: elevator,
      parking: parking,
      smoking: smoking,
      numberOfRoomates: numberOfRoomates,
    };
    return axios
      .post(url, data, POST_HEADERS())
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
    }