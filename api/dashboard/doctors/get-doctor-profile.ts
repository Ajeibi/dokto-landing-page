import { API_ENDPOINTS } from "@/lib/api-endpoints";
import { getRequest } from "@/lib/http-helpers";
import { useQuery } from "@tanstack/react-query";
import { TDoctorInfo } from "./types";
import { GenericResponse } from "@/lib/generic-types";

type Props = GenericResponse<TDoctorInfo>;

async function getDoctorProfile(id: string) {
  return getRequest<Props>({
    url: API_ENDPOINTS.fetchSingleDoctor(id),
  });
}

export function useGetDoctorProfile(id: string) {
  return useQuery({
    queryKey: ["get-doctor-profile", id],
    queryFn: () => getDoctorProfile(id),
  });
}
