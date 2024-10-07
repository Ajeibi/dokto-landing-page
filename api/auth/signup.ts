"use client";

import { API_ENDPOINTS } from "@/lib/api-endpoints";
import { ErrorData } from "@/lib/http";
import { postRequest } from "@/lib/http-helpers";
import { displayErrorMessage } from "@/lib/utils";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type SignUpPayload = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: string;
  phone: string;
  sex: "male" | "female" | "others";
};

const signUp = async (payload: SignUpPayload) => {
  const { data } = await postRequest<any, SignUpPayload>(
    API_ENDPOINTS.AUTH.REGISTER,
    payload
  );

  return data;
};

export const useSignUp = (): UseMutationResult<
  any,
  AxiosError<ErrorData>,
  SignUpPayload
> => {
  const router = useRouter();

  return useMutation({
    mutationFn: signUp,
    onSuccess: (data, variables) => {
      toast.success(data.message);
      router.push(`/auth/verify-email?email=${variables.email}`);
    },
    onError: (error) => {
      displayErrorMessage(error);
    },
  });
};
