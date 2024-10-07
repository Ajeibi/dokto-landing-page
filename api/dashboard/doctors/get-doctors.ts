import { API_ENDPOINTS } from "@/lib/api-endpoints";
import { GenericResponse } from "@/lib/generic-types";
import { getRequest } from "@/lib/http-helpers";
import { useQuery } from "@tanstack/react-query";
import { TDoctorInfo } from "./types";

type DoctorResponse = {
  results: TDoctorInfo[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
};

type Response = GenericResponse<DoctorResponse>;

async function getDoctors(query: { [k: string]: string }) {
  if (query["tab"] === "practitioner" || !query["tab"]) {
    if (query["query"] && query["query"].length !== 0) {
      return getRequest<Response>({
        url: API_ENDPOINTS.searchByName(query["query"]),
      });
    }

    return getRequest<Response>({
      url: API_ENDPOINTS.allDoctors(parseInt(query["page"])),
    });
  } else if (query["tab"] === "specialists") {
    if (query["query"] && query["query"].length !== 0) {
      return getRequest<Response>({
        url: API_ENDPOINTS.searchByName(query["query"]),
      });
    }

    if (query["specialist"] == "") {
      return getRequest<Response>({
        url: API_ENDPOINTS.fetchSpecialists(
          query["specialist"] || "physician",
          parseInt(query["page"])
        ),
      });
    }

    return getRequest<Response>({
      url: API_ENDPOINTS.fetchSpecialists(
        query["specialist"],
        parseInt(query["page"])
      ),
    });
  }
}

export function useGetDoctors(query: { [k: string]: string }) {
  return useQuery({
    queryFn: () => getDoctors(query),
    queryKey: ["get-doctors", query],
  });
}
