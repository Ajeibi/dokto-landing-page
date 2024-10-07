import { API_ENDPOINTS } from "@/lib/api-endpoints";
import { GenericResponse } from "@/lib/generic-types";
import { postRequest } from "@/lib/http-helpers";
import { displayErrorMessage, showSuccess } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { QueryError } from "@/lib/generic-types";

type CreateAppointmentPayload = {
  doctorType: string;
  doctorAppointmentFee: number;
  doctorId: string;
  patientNotes: string;
  appointmentDate: string | Date;
  appointmentTime: string | Date;
  medicalImage: string;
  channelName: string;
};

type AppointmentResponseData = {
  doctorType: string;
  doctorAppointmentFee: number;
  patientId: string;
  doctorId: string;
  patientNotes: string;
  appointmentDate: string; // or Date if you plan to parse this as a Date object
  appointmentTime: string;
  medicalImage: string[];
  channelName: string;
  rating: number;
  status: string;
  isDoctorCompleted: boolean;
  isPatientCompleted: boolean;
  _id: string;
  createdAt: string; // or Date if you plan to parse this as a Date object
  updatedAt: string; // or Date if you plan to parse this as a Date object
};

async function createAppointment(payload: CreateAppointmentPayload) {
  return postRequest<
    GenericResponse<AppointmentResponseData>,
    CreateAppointmentPayload
  >(API_ENDPOINTS.createAppointment, payload);
}

export function useCreateAppointment() {
  return useMutation({
    mutationFn: createAppointment,
    mutationKey: ["create-appointment"],

    onSuccess(data) {
      showSuccess(data.data.message);
    },

    onError(error: QueryError) {
      displayErrorMessage(error);
    },
  });
}
