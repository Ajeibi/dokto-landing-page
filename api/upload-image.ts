import { API_ENDPOINTS } from "@/lib/api-endpoints";
import { GenericResponse, QueryError } from "@/lib/generic-types";
import { postRequest, uploadImageRequest } from "@/lib/http-helpers";
import { displayErrorMessage, showSuccess } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";

type UploadResponse = {
  url: string;
  public_id: string;
};

async function uploadImage(payload: FormData) {
  return uploadImageRequest<GenericResponse<UploadResponse>, FormData>({
    url: API_ENDPOINTS.uploadImage,
    payload,
  });
}

export function useUploadImage() {
  return useMutation({
    mutationFn: uploadImage,
    mutationKey: ["upload-image"],

    onSuccess(data) {
      showSuccess(data.message);
    },

    onError(error: QueryError) {
      displayErrorMessage(error);
    },
  });
}
