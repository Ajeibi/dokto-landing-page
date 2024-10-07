import { API_ENDPOINTS } from "@/lib/api-endpoints";
import { AxiosError } from "axios";
import { GenericResponse } from "@/lib/generic-types";
import { displayErrorMessage } from "@/lib/utils";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import api, { ErrorData } from "@/lib/http";

type VerifyOtpPayload = {
  otpCode: string;
  id: string;
};

export interface VerifyOtpResponse { // update to proper response
  id: string;
}

const verifyOtp = async (payload: VerifyOtpPayload) => {
  const { data } = await api.post<GenericResponse<VerifyOtpResponse>>(`${API_ENDPOINTS.AUTH}/otp/verify`, payload);

  return data;
};

export const useVerifyOtp = (): UseMutationResult<GenericResponse<VerifyOtpResponse>, AxiosError<ErrorData>, VerifyOtpPayload> => {
  return useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data) => {
      console.log("data: ", data);
    },
    onError: (error) => {
      displayErrorMessage(error);
    }
  });
};
