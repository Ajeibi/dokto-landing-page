import { appointment_tabs } from "@/constants/appointments";
import { API_ENDPOINTS } from "@/lib/api-endpoints";
import { GenericResponse } from "@/lib/generic-types";
import { getRequest } from "@/lib/http-helpers";
import { parseAppointmentTabs } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export type AppointmentInfo = {
  _id: string;
  doctorType: string;
  doctorAppointmentFee: number;
  patientId: {
    _id: string;
    firstName: string;
    lastName: string;
    dob: string;
    sex: string;
    user: {
      _id: string;
      email: string;
      phone: string;
      password: string;
      role: string;
      isEmailVerified: boolean;
      isPhoneVerified: boolean;
      terms: boolean;
      createdAt: string;
      updatedAt: string;
      __v: number;
      id: string;
    };
    __v: number;
    profilePhoto: string;
  };
  doctorId: {
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
  patientNotes: string;
  appointmentDate: string;
  appointmentTime: string;
  medicalImage: string[];
  channelName: string;
  rating: number;
  status: "PENDING" | "APPROVED" | "CANCELLED" | "COMPLETED";
  isDoctorCompleted: boolean;
  isPatientCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type AppointmentResponse = {
  results: AppointmentInfo[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
};

async function getAppointments(query: { [k: string]: string }) {
  const tab =
    parseAppointmentTabs(appointment_tabs, query["tab"] || "approved") ||
    "approved";
  const page = parseInt(query["page"] || "1");

  let data;

  if (query["filter"] && query["filter"].length > 0) {
    const filter = query["filter"];

    data = await getRequest<GenericResponse<AppointmentInfo[]>>({
      url: API_ENDPOINTS.filterAppointments(filter),
    });
    // const { data } = await getRequest<GenericResponse<AppointmentResponse>>({
    //   url: API_ENDPOINTS.filterAppointments(filter),
    // });

    const filteredData = data.data.filter(
      (appointment) => appointment.status == tab.toUpperCase()
    );

    return {
      ...data,
      results: filteredData,
      totalPages: Math.ceil(filteredData.length / 10),
      currentPage: 1,
      totalItems: filteredData.length,
    };
  } else {
    data = await getRequest<GenericResponse<AppointmentResponse>>({
      url: API_ENDPOINTS.fetchAppointments(tab.toUpperCase(), page),
    });

    return data.data;
  }
}

export function useGetAppointments(query: { [k: string]: string }) {
  return useQuery({
    queryKey: ["get-appointments", query],
    queryFn: () => getAppointments(query),
  });
}
