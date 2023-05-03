import Cookies from "js-cookie";
import { authContext } from "../APP/Utils";
import { useContext } from "react";

export const getUserToken = () => {
  return Cookies.get("app_us_tk");
};

export const setTokenAfterSignIn = (token, email) => {
  Cookies.set("app_us_tk", token);
  setUserEmail(email);
};

export const RemoveTokenAfterSignOut = () => {
  const { setUserRole } = useContext(authContext);
  Cookies.remove("app_us_tk");
  Cookies.remove("user_email");
  setUserRole(null);
};

export const setUserEmail = (email) => {
  Cookies.set("user_email", email);
};

export const getUserEmail = () => {
  return Cookies.get("user_email");
};
