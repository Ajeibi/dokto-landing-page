import { API_ENDPOINTS } from "@/lib/api-endpoints";
import { AxiosError } from "axios";
import { GenericResponse } from "@/lib/generic-types";
import { displayErrorMessage } from "@/lib/utils";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import api, { ErrorData } from "@/lib/http";
import { useRouter } from "next/navigation";
import { notify } from "@/components/ui/toast";
import { toast } from "sonner";

type ResetPasswordPayload = {
  email: string;
  isResend?: boolean;
  isResetting?: boolean;
};

export interface ResetPasswordResponse {
  id: string;
}

const sendVerificationLink = async (payload: ResetPasswordPayload) => {
  const { data } = await api.post<any>(`/auth/resend-email`, payload);

  return data;
};

export const useSendVerificationLink = (): UseMutationResult<any, AxiosError<ErrorData>, ResetPasswordPayload> => {
  const router = useRouter();


  return useMutation({
    mutationFn: sendVerificationLink,
    onSuccess(data)
    {
      toast.success(data.message)
    },
    onError: (error) => {    
      displayErrorMessage(error);
    }
  });
};
