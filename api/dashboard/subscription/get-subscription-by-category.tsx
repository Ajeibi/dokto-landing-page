import { API_ENDPOINTS } from "@/lib/api-endpoints";
import { GenericResponse } from "@/lib/generic-types";
import { getRequest } from "@/lib/http-helpers";
import { useQuery } from "@tanstack/react-query";

export type SubscriptionInfo = {
  _id: string;
  userType: "PATIENT" | "DOCTOR";
  name: string;
  description: string;
  category: "CONSULTATION" | "SUBSCRIPTION";
  status: "ACTIVE" | "INACTIVE";
  price: number;
  currency: string;
  duration: number;
  createdAt: string;
  updatedAt: string;
};

type SubscriptionResponse = {
  results: SubscriptionInfo[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
};

async function getSubscriptionsByCategory(query: { [k: string]: string }) {
  const category =
    query["tab"] || ("consultation" as "consultation" | "prescription");

  const page = parseInt(query["page"] || "1");

  const { data } = await getRequest<GenericResponse<SubscriptionResponse>>({
    url: API_ENDPOINTS.fetchSubscriptionByCategory(category, page),
  });

  return data;
}

export function useGetSubscriptionsByCategory(query: { [k: string]: string }) {
  return useQuery({
    queryKey: ["get-appointments", query],
    queryFn: () => getSubscriptionsByCategory(query),
  });
}
