import { API_ENDPOINTS } from "@/lib/api-endpoints";
import { GenericResponse } from "@/lib/generic-types";
import { getRequest } from "@/lib/http-helpers";
import { useQuery } from "@tanstack/react-query";

type DrugResponse = {
  results: {
    drugId: string;
    productName: string;
    brandName: string;
  }[];
};

async function getDrugs() {
  const { data } = await getRequest<GenericResponse<DrugResponse>>({
    url: API_ENDPOINTS.getDrugs,
  });

  return data;
}

export function useGetDrugs() {
  const { data, isLoading } = useQuery({
    queryKey: ["get-drugs"],
    queryFn: getDrugs,
  });

  const drugs = Array.from(
    new Set(data?.results.map((item) => item.productName))
  ).map((item) => ({
    label: item,
    value: item,
  }));

  return {
    drugs,
    isLoading,
  };
}
