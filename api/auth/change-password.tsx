import { API_ENDPOINTS } from "@/lib/api-endpoints";
import { GenericResponse, QueryError } from "@/lib/generic-types";
import { patchRequest } from "@/lib/http-helpers";
import { displayErrorMessage, showSuccess } from "@/lib/utils";
import { UseMutationResult, useMutation } from "@tanstack/react-query";

type ChangePasswordResponse = any;

export type ChangePasswordPayload = {
  password: string;
  newPassword: string;
};

const resetPassword = async (payload: ChangePasswordPayload) => {
  const { data } = await patchRequest<any, ChangePasswordPayload>(
    API_ENDPOINTS.AUTH.CHANGE_PASSWORD,
    payload
  );

  return data;
};

export const useChangePassword = (): UseMutationResult<
  GenericResponse<ChangePasswordResponse>,
  QueryError,
  ChangePasswordPayload
> => {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      showSuccess(data.message);
    },
    onError: (error) => {
      displayErrorMessage(error);
    },
  });
};
