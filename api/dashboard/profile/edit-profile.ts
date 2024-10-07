import { API_ENDPOINTS } from "@/lib/api-endpoints";
import { GenericResponse, QueryError } from "@/lib/generic-types";
import { patchRequest } from "@/lib/http-helpers";
import { displayErrorMessage, showSuccess } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type EditProfilePayload = {
  firstName: string;
  lastName: string;
  middleName: string;
  dob: string;
  sex: string;
  profilePhoto: string;
  allergies: string[];
  location: {
    streetName: string;
    city: string;
    state: string;
    zipCode: string;
    apartmentNo: string;
  };
};

type PrescriptionResponse = {};

async function editProfile(payload: EditProfilePayload) {
  return patchRequest<
    GenericResponse<PrescriptionResponse>,
    EditProfilePayload
  >(API_ENDPOINTS.editProfile, payload);
}

export function useEditProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editProfile,
    mutationKey: ["editProfile"],

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
