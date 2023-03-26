import axios from "axios";
import { APP_ROUTES, POST_HEADERS } from "../APP/APP_ROUTES";

/**
 * This module hold all the request of Actions.
 */

//insert userProfile
export const createUserProfile = (email, userType, birthday, employment, smoking, pets, gender, alcohol, kosher, other, additonalInformation, facebook, instagram ) => {
    let url = APP_ROUTES.userProfile.createProfile;
    let data = {
        email:email,
        user_type:userType,
        Birthday_date: birthday,
        user_employment:employment,
        smoking: smoking,
        pets: pets,
        gender: gender,
        alcohol: alcohol,
        kosher: kosher,
        other: other,
        user_additonal_information:additonalInformation,
        user_facebook_link:facebook,
        user_instagram_link:instagram,
    };
    return axios
      .post(url, data, POST_HEADERS())
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  };