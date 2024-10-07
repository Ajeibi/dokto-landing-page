import { API_ENDPOINTS } from "@/lib/api-endpoints";
import { GenericResponse } from "@/lib/generic-types";
import { getRequest } from "@/lib/http-helpers";
import { useQuery } from "@tanstack/react-query";

export type SubscriptionInfo = {
  _id: string;
  planId: {
    _id: string;
    userType: "PATIENT" | "DOCTOR";
    name: string;
    description: string;
    category: "CONSULTATION" | string;
    status: "ACTIVE" | "INACTIVE";
    price: number;
    currency: string;
    duration: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  status: "PENDING" | "ACTIVE" | "CANCELLED";
  userId: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type SubscriptionResponse = {
  results: SubscriptionInfo[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
};

async function getSubscriptions(tab: string) {
  const { data } = await getRequest<GenericResponse<SubscriptionResponse>>({
    url: API_ENDPOINTS.fetchUserSubscriptions,
  });

  const filteredData =
    tab == "all"
      ? data.results
      : data.results.filter((sub) => sub.status === tab.toUpperCase());

  return {
    ...data,
    results: filteredData,
    totalPages: data.totalPages,
    currentPage: data.currentPage,
    totalItems: data.totalItems,
  };
}

export function useGetSubscriptions(query: { [k: string]: string }) {
  return useQuery({
    queryKey: ["get-appointments", query],
    queryFn: () => getSubscriptions(query["tab"]),
  });
}
