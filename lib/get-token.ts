import Cookies from "js-cookie";

export const getToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return Cookies.get("dokto-token");
};

export const getUserId = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return Cookies.get("dokto-userId");
};
