import { API_ENDPOINTS } from "@/lib/api-endpoints";
import { GenericResponse } from "@/lib/generic-types";
import { postRequest } from "@/lib/http-helpers";
import { displayErrorMessage, showSuccess } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { QueryError } from "@/lib/generic-types";

export type CreatePrescriptionPayload = {
  contact: {
    name: string;
    phone: string;
    dob: string;
    address: string;
  };
  allergies: string[];
  medicalHistory: string[];
  currentMedication: string[];
  medications: {
    name: string;
    duration: string;
  }[];
  complaints: string;
  medicationImage: string;
  deliveryMethod: string;
  pharmacy: {
    name: string;
    phone: string;
    address: string;
  };
};

type PrescriptionResponse = {
  contact: {
    name: string;
    phone: string;
    dob: string;
    address: string;
    _id: string;
  };
  allergies: string[];
  medicalHistory: string[];
  currentMedication: string[];
  medications: {
    name: string;
    price: number;
    _id: string;
  }[];
  complaints: string;
  medicationImage: string;
  deliveryMethod: string;
  status: string;
  reason: string;
  prescribedTo: string;
  isPaid: boolean;
  pharmacy: {
    name: string;
    phone: string;
    address: string;
    _id: string;
  };
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

async function createPrescription(payload: CreatePrescriptionPayload) {
  return postRequest<
    GenericResponse<PrescriptionResponse>,
    CreatePrescriptionPayload
  >(API_ENDPOINTS.createPrescription, payload);
}

export function useCreatePrescription() {
  return useMutation({
    mutationFn: createPrescription,
    mutationKey: ["create-prescription"],

    onSuccess(data) {
      showSuccess(data.data.message);
    },

    onError(error: QueryError) {
      displayErrorMessage(error);
    },
  });
}
