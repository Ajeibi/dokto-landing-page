import { CancelAppointmentReasonProps } from "@/components/modals/appointment/cancel-appointment-modal";
import { API_ENDPOINTS } from "@/lib/api-endpoints";
import { GenericResponse, QueryError } from "@/lib/generic-types";
import { patchRequest } from "@/lib/http-helpers";
import { displayErrorMessage, showSuccess } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface RejectAppointmentResponse {
  _id: string;
  doctorType: string;
  doctorAppointmentFee: number;
  patientId: string;
  doctorId: string;
  patientNotes: string;
  appointmentDate: Date;
  appointmentTime: string;
  medicalImage: string[];
  channelName: string;
  rating: number;
  status: string;
  isDoctorCompleted: boolean;
  isPatientCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  reasonForCancellation: string;
  id: string;
}

async function rejectAppointment(payload: CancelAppointmentReasonProps) {
  return patchRequest<
    GenericResponse<RejectAppointmentResponse>,
    CancelAppointmentReasonProps
  >(
    API_ENDPOINTS.practitioner.rejectAppointment(payload.appointmentId),
    payload
  );
}

export function useRejectAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectAppointment,
    onSuccess: (data) => {
      showSuccess(data.data.message);
      queryClient.invalidateQueries({
        queryKey: ["get-practitioner-appointments"],
      });
    },
    onError: (error: QueryError) => {
      displayErrorMessage(error);
    },
  });
}
