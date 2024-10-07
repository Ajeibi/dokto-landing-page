"use client";

import { API_ENDPOINTS } from "@/lib/api-endpoints";
import api, { ErrorData } from "@/lib/http";
import { displayErrorMessage, showSuccess } from "@/lib/utils";
import { QueryResponse } from "@/types/query/auth";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useWhoAmI } from "./whoami";

const logIn = async (payload: LogInPayload) => {
  const { data } = await api.post<QueryResponse<LoginResponse>>(
    API_ENDPOINTS.AUTH.LOGIN,
    payload
  );

  return data;
};

export const useLogIn = (): UseMutationResult<
  QueryResponse<LoginResponse>,
  AxiosError<ErrorData>,
  LogInPayload
> => {
  const router = useRouter();
  const { fetchWhoAmI } = useWhoAmI();

  return useMutation({
    mutationFn: logIn,
    onSuccess: (data) => {
      showSuccess(data.message);

      const expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + 2);

      Cookies.set("dokto-token", data.data.token, {
        secure: true,
        sameSite: "Strict",
        expires: expirationDate,
      });

      fetchWhoAmI && fetchWhoAmI();
      router.push("/dashboard/overview");
    },
    onError: (error) => {
      console.log(error);
      displayErrorMessage(error);
    },
  });
};

type LogInPayload = {
  email: string;
  password: string;
};

export interface LoginResponse {
  _id: string;
  email: string;
  phone: string;
  role: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  terms: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  token: string;
}
