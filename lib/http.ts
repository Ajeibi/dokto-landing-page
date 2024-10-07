import { logoutUser } from "@/api/auth/logout";
import axios from "axios";
import { getToken } from "./get-token";

export type ErrorData = {
  message: string;
  validationErrors?: string | [string] | [{ description: string }];
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4300/v1",
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (config.url === "/user" && !token) {
      return Promise.reject(new Error("Token is required for /user endpoint"));
    }

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle unauthorized responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message;

    if (
      (error.response == "Invalid Authorization" &&
        error.response.status === 400) ||
      (message == "Unauthorized" && error.response.status === 401)
    ) {
      logoutUser();
    }
    return Promise.reject(error);
  }
);

export default api;
