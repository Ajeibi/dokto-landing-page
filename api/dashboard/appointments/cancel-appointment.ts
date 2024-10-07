import { CancelAppointmentReasonProps } from "@/components/modals/appointment/cancel-appointment-modal";
import { API_ENDPOINTS } from "@/lib/api-endpoints";
import { GenericResponse, QueryError } from "@/lib/generic-types";
import { patchRequest } from "@/lib/http-helpers";
import { displayErrorMessage, showSuccess } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function cancelAppointment(payload: CancelAppointmentReasonProps) {
  return patchRequest<GenericResponse<any>, CancelAppointmentReasonProps>(
    API_ENDPOINTS.cancelAppointment(payload.appointmentId),
    payload
  );
}

export function useCancelAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelAppointment,
    mutationKey: ["cancel-appointment"],

    onSuccess(data) {
      showSuccess(data.data.message);
      queryClient.invalidateQueries({
        queryKey: ["get-appointments"],
      });
    },

    onError(error: QueryError) {
      displayErrorMessage(error);
    },
  });
}
