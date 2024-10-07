import { API_ENDPOINTS } from "@/lib/api-endpoints";
import { GenericResponse, QueryError } from "@/lib/generic-types";
import { patchRequest } from "@/lib/http-helpers";
import { displayErrorMessage, showSuccess } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type EditDoctorProfilePayload = {
  medicalInfo: {
    licenseNumber: string;
    nipNo: string;
    annualReview: string;
    expirationDate: string;
    specialty: string;
    licenseState: string;
    subSpecialty: string;
  };
  personalInfo: {
    firstName: string;
    middleName: string;
    lastName: string;
    dob: string;
    imgUrl: string;
    languages: string[];
    sex: string;
    email: string;
    phone: number;
  };
  location: {
    streetName: string;
    city: string;
    state: string;
    zipCode: string;
    apartmentNo: string;
  };
  bio: string;
  isAvailable: boolean;
  consultationFee: number;
};

type Response = {};

async function editDoctorProfile(
  payload: EditDoctorProfilePayload & { id: string }
) {
  return patchRequest<GenericResponse<Response>, EditDoctorProfilePayload>(
    API_ENDPOINTS.editProfileDoctor(payload.id),
    payload
  );
}

export function useEditDoctorProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editDoctorProfile,
    mutationKey: ["edit-doctor-profile"],

    onSuccess(data) {
      showSuccess(data.data.message);
      queryClient.invalidateQueries({
        queryKey: ["whoami"],
      });
    },

    onError(error: QueryError) {
      displayErrorMessage(error);
    },
  });
}
