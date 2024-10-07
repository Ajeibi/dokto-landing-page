import { GenericResponse, QueryError } from "@/lib/generic-types";
import { patchRequest } from "@/lib/http-helpers";
import { RejectAppointmentResponse } from "./reject-appointment";
import { API_ENDPOINTS } from "@/lib/api-endpoints";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { displayErrorMessage, showSuccess } from "@/lib/utils";

async function approveAppointment(_id: string) {
  return patchRequest<GenericResponse<RejectAppointmentResponse>, string>(
    API_ENDPOINTS.practitioner.approveAppointment(_id)
  );
}

export function useApproveAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveAppointment,
    onSuccess: (data) => {
      showSuccess(data.data.message),
        queryClient.invalidateQueries({
          queryKey: ["get-practitioner-appointments"],
        });
    },
    onError: (error: QueryError) => {
      displayErrorMessage(error);
    },
  });
}
