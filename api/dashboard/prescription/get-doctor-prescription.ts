import { doctor_prescriptions_tabs } from "@/constants/prescriptions";
import { API_ENDPOINTS } from "@/lib/api-endpoints";
import { GenericResponse } from "@/lib/generic-types";
import { getRequest } from "@/lib/http-helpers";
import { parseTabs } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

type Contact = {
  _id: string;
  name: string;
  phone: string;
  dob: string;
  address: string;
};

type Medications = {
  name: string;
  price: number;
  duration: string;
  _id: string;
};

type PersonalInfo = {
  firstName: string;
  lastName: string;
  email: string;
  imgUrl: string;
  languages: string[];
  _id: string;
};

type MedicalInfo = {
  specialty: string;
  subSpecialty: string;
  licenseNumber: string;
  hospitalName: string;
  annualReview: string;
  _id: string;
};

type Patient = {
  _id: string;
  firstName: string;
  lastName: string;
  dob: string;
  sex: string;
  user: string;
  __v: number;
};

type Pharmacy = {
  _id: string;
  name: string;
  phone: string;
  address: string;
};

type Doctor = {
  _id: string;
  user: string;
  personalInfo: PersonalInfo;
  medicalInfo: MedicalInfo;
  bio: string;
  isAvailable: boolean;
  consultationFee: number;
  yearsofExperience: number;
  rating: number;
  noOfAppointments: number;
  doctorType: string;
  adminApproved: boolean;
  terms: boolean;
  reviews: string[];
  availableSlots: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TDoctorPrescriptionInfo = {
  _id: string;
  contact: Contact;
  allergies: string[];
  medicalHistory: string[];
  currentMedication: string[];
  medications: Medications[];
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
  pharmacy: Pharmacy;
  createdAt: string;
  updatedAt: string;
};

export type TPrescribedPrescriptionInfo = {
  _id: string;
  contact: Contact;
  allergies: string[];
  medicalHistory: string[];
  currentMedication: string[];
  medications: Medications[];
  deliveryMethod: string;
  status: string;
  reason: string;
  notes: string;
  approvedBy: Doctor;
  rejectedReason: string;
  prescribedTo: Patient;
  prescribedBy: Doctor;
  isPaid: boolean;
  pharmacy: Pharmacy;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TGeneralPractitionerPrescriptionInfo = TDoctorPrescriptionInfo &
  TPrescribedPrescriptionInfo;

type PrescriptionResponse = {
  results: TGeneralPractitionerPrescriptionInfo[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
};

async function getDoctorPrescriptions(
  filter: string,
  tab: string,
  page: number
) {
  return getRequest<GenericResponse<PrescriptionResponse>>({
    url: API_ENDPOINTS.fetchDoctorPrescriptions(
      filter.toUpperCase(),
      tab,
      page
    ),
  });
}

export function useGetDoctorPrescriptions(query: { [k: string]: string }) {
  const tab = parseTabs(doctor_prescriptions_tabs, query["tab"] || "all");
  const page = parseInt(query["page"] || "1");
  const filter = query["filter"] || "ASC";

  return useQuery({
    queryKey: ["get-prescriptions", query],
    queryFn: () => getDoctorPrescriptions(filter, tab, page),
  });
}
