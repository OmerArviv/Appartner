import Cookies from "js-cookie";

export const getUserToken = () => {
  return Cookies.get("app_us_tk");
};

export const setTokenAfterSignIn = (token, email) => {
  Cookies.set("app_us_tk", token);
  setUserEmail(email);
};

export const RemoveTokenAfterSignOut = () => {
  Cookies.remove("app_us_tk");
  Cookies.remove("user_email");
};

export const setUserEmail = (email) => {
  Cookies.set("user_email", email);
};

export const getUserEmail = () => {
  return Cookies.get("user_email");
};

export const setUserRole = (role) => {
  Cookies.set("user_role", role);
};

export const getUserRole = () => {
  return Cookies.get("user_role");
};
