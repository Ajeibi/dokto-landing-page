import { API_ENDPOINTS } from "@/lib/api-endpoints";
import { GenericResponse, QueryError } from "@/lib/generic-types";
import api from "@/lib/http";
import { displayErrorMessage } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

function updateRole(payload: { token: string }) {
  return api.patch<GenericResponse<any>>(
    API_ENDPOINTS.AUTH.UPDATE_ROLE,
    payload,
    {
      headers: {
        Authorization: `Bearer ${payload.token}`,
      },
    }
  );
}

export function useUpdateRole() {
  const router = useRouter();

  return useMutation({
    mutationFn: updateRole,
    mutationKey: ["update user role"],

    onError(error: QueryError) {
      displayErrorMessage(error);
      router.replace("/auth/login");
    },
  });
}
