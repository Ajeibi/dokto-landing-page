import { API_ENDPOINTS } from "@/lib/api-endpoints";
import { GenericQueryResponse, QueryError } from "@/lib/generic-types";
import { patchRequest } from "@/lib/http-helpers";
import { displayErrorMessage, showSuccess } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Payload = {
  reason: string;
};

function approvePrescription({ id, reason }: { id: string; reason: string }) {
  return patchRequest<GenericQueryResponse<any>, Payload>(
    API_ENDPOINTS.approvePrescription(id),
    {
      reason: reason,
    }
  );
}

export function useApprovePrescription() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: approvePrescription,
    onSuccess: ({ data }) => {
      showSuccess(data.message);
      queryClient.invalidateQueries({
        queryKey: ["get-prescriptions"],
      });
    },
    onError: (error: QueryError) => {
      displayErrorMessage(error);
    },
  });
}

function rejectPrescription({ id, reason }: { id: string; reason: string }) {
  return patchRequest<GenericQueryResponse<any>, Payload>(
    API_ENDPOINTS.rejectPrescription(id),
    {
      reason: reason,
    }
  );
}

export function useRejectPrescription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectPrescription,
    onSuccess: ({ data }) => {
      showSuccess(data.message);
      queryClient.invalidateQueries({
        queryKey: ["get-prescriptions"],
      });
    },
    onError: (error: QueryError) => {
      displayErrorMessage(error);
    },
  });
}
