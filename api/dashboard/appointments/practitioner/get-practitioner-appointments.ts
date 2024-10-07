import { appointment_tabs } from "@/constants/appointments";
import { API_ENDPOINTS } from "@/lib/api-endpoints";
import { GenericResponse } from "@/lib/generic-types";
import { getRequest } from "@/lib/http-helpers";
import { parseAppointmentTabs } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

interface AppointmentResponse {
  results: PractitionerAppointmentInfo[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

export interface PractitionerAppointmentInfo {
  email: string | null;
  doctorNotes: string | null;
  review: string | null;
  meetingLink: string | null;
  reasonForCancellation: string | null;
  _id: string;
  doctorType: string;
  doctorAppointmentFee: number;
  patientId: PatientID;
  doctorId: DoctorID;
  patientNotes: string;
  appointmentDate: string;
  appointmentTime: string;
  medicalImage: string[];
  channelName: string;
  rating: number;
  status: string;
  isDoctorCompleted: boolean;
  isPatientCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

interface DoctorID {
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
  reviews: any[];
  availableSlots: any[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

interface MedicalInfo {
  specialty: string;
  subSpecialty: string;
  licenseNumber: string;
  hospitalName: string;
  annualReview: string;
  _id: string;
}

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  imgUrl: string;
  languages: string[];
  _id: string;
}

export interface PatientID {
  middleName: string | null;
  profilePhoto: string | null;
  allergies: any[];
  location: Location;
  _id: string;
  firstName: string;
  lastName: string;
  dob: Date;
  sex: string;
  user: User;
  __v: number;
}

interface Location {
  streetName: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  apartmentNo: string | null;
  _id: string;
}

interface User {
  _id: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  terms: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}

async function getPractitionerAppointments(query: { [k: string]: string }) {
  const tab =
    parseAppointmentTabs(appointment_tabs, query["tab"] || "pending") ||
    "pending";

  const page = parseInt(query["page"] || "1");

  if (query["filter"] && query["filter"].length > 0) {
    const filter = query["filter"];

    const { data } = await getRequest<GenericResponse<AppointmentResponse>>({
      url: API_ENDPOINTS.practitioner.fetchAppointments(filter, page),
    });

    const filteredData = data.results.filter(
      (appointment) => appointment.status === tab.toUpperCase()
    );

    return {
      ...data,
      results: filteredData,
      totalPages: Math.ceil(filteredData.length / 10),
      currentPage: data.currentPage,
      totalItems: filteredData.length,
    };
  }

  const { data } = await getRequest<GenericResponse<AppointmentResponse>>({
    url: API_ENDPOINTS.practitioner.fetchAppointments(tab.toUpperCase(), page),
  });

  return data;
}

export function useGetPractitionerAppointments(query: { [k: string]: string }) {
  return useQuery({
    queryKey: ["get-practitioner-appointments", query],
    queryFn: () => getPractitionerAppointments(query),
  });
}
