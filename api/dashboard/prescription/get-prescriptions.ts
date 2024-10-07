import { prescriptions_tabs } from "@/constants/prescriptions";
import { API_ENDPOINTS } from "@/lib/api-endpoints";
import { GenericResponse } from "@/lib/generic-types";
import { getRequest } from "@/lib/http-helpers";
import { parseTabs } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export type TPrescriptionInfo = {
  _id: string;
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
    duration: string;
    _id: string;
  }[];
  complaints: string;
  medicationImage: string;
  deliveryMethod: string;
  status: string;
  reason: string;
  notes: string;
  rejectedReason: string;
  prescribedTo: {
    _id: string;
    firstName: string;
    lastName: string;
    dob: string;
    sex: string;
    user: string;
    __v: number;
    allergies: string[];
    location: {
      streetName: string;
      city: string;
      state: string;
      zipCode: string;
      apartmentNo: string;
      _id: string;
    };
    middleName: string;
    profilePhoto: string;
  };
  isPaid: boolean;
  pharmacy: {
    name: string;
    phone: string;
    address: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
};

type PrescriptionResponse = {
  results: TPrescriptionInfo[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
};

async function getPrescriptions(tab: string, page: number) {
  return getRequest<GenericResponse<PrescriptionResponse>>({
    url: API_ENDPOINTS.fetchPrescriptions(tab.toUpperCase(), page),
  });
}

export function useGetPrescriptions(query: { [k: string]: string }) {
  const tab = parseTabs(prescriptions_tabs, query["tab"] || "prescribed");
  const page = parseInt(query["page"] || "1");

  return useQuery({
    queryKey: ["get-prescriptions", query],
    queryFn: () => getPrescriptions(tab, page),
  });
}
