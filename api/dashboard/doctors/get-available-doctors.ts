import { API_ENDPOINTS } from "@/lib/api-endpoints";
import { GenericResponse } from "@/lib/generic-types";
import { getRequest } from "@/lib/http-helpers";
import { useQuery } from "@tanstack/react-query";

export type TAvailableDoctor = {
  _id: string;
  user: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    imgUrl: string;
    languages: string[];
    _id: string;
  };
  medicalInfo: {
    specialty: string;
    subSpecialty: string;
    licenseNumber: string;
    hospitalName: string;
    annualReview: string;
    _id: string;
  };
  bio: string;
  isAvailable: boolean;
  consultationFee: number;
  yearsofExperience: number;
  rating: number;
  noOfAppointments: number;
  doctorType: string;
  adminApproved: boolean;
  terms: boolean;
  reviews: any[];
  availableSlots: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type ResultsData = {
  results: TAvailableDoctor[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
};

async function getAvailableDoctors() {
  return getRequest<GenericResponse<ResultsData>>({
    url: API_ENDPOINTS.availableDoctors,
  });
}

export function useGetAvailableDoctors() {
  return useQuery({
    queryFn: getAvailableDoctors,
    queryKey: ["get-available-doctors"],
  });
}
