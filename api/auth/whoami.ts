import { API_ENDPOINTS } from "@/lib/api-endpoints";
import { GenericResponse } from "@/lib/generic-types";
import { getRequest } from "@/lib/http-helpers";
import { useQuery } from "@tanstack/react-query";

type User = {
  _id: string;
  email: string;
  phone: string;
  role: "DOCTOR" | "patient" | "doctor";
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  terms: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
};

type DoctorProfile = {
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

type PatientProfile = {
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

export type WhoAmIResponse = User & {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  languages: string[];
  dateOfBirth: string;
  sex: string | undefined;
  user: string;
  middleName: string | undefined;
  profilePhoto: string;
  speciality: string;
  subSpecialty: string;
  licenseNumber: string;
  licenseState: string;
  dateOfExpiration: string;
  npiNumber: string;
  hospitalName: string;
  annualReview: string;
  bio: string;
  streetName: string;
  city: string;
  state: string;
  zipCode: string;
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
  allergies: string[];
  location: PatientProfile["location"];
};

export type WhoAmIDoctorResponse = {
  user: User;
  profile: DoctorProfile;
};

export type WhoAmIPatientResponse = {
  user: User;
  profile: PatientProfile;
};

async function whoAmI() {
  return getRequest<
    GenericResponse<WhoAmIDoctorResponse | WhoAmIPatientResponse>
  >({
    url: API_ENDPOINTS.whoAmI,
  });
}

export function useWhoAmI() {
  const { data, isLoading, refetch } = useQuery({
    queryFn: whoAmI,
    queryKey: ["whoami"],
  });

  if (data?.data) {
    const { profile, user } = data.data;
    const role = user.role;

    const userInfo = {
      _id: user._id,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
      isPhoneVerified: user.isPhoneVerified,
    };

    let profileInfo;

    if (
      (role === "DOCTOR" || role === "doctor") &&
      "personalInfo" in profile &&
      "medicalInfo" in profile
    ) {
      profileInfo = {
        _id: profile._id,
        firstName: profile.personalInfo.firstName,
        lastName: profile.personalInfo.lastName,
        languages: profile.personalInfo.languages,
        dateOfBirth: undefined,
        sex: undefined,
        user: profile.user,
        middleName: undefined,
        profilePhoto: profile.personalInfo.imgUrl,
        speciality: profile.medicalInfo.specialty,
        subSpecialty: profile.medicalInfo.subSpecialty,
        licenseNumber: profile.medicalInfo.licenseNumber,
        hospitalName: profile.medicalInfo.hospitalName,
        annualReview: profile.medicalInfo.annualReview,
        bio: profile.bio,
        isAvailable: profile.isAvailable,
        consultationFee: profile.consultationFee,
        yearsofExperience: profile.yearsofExperience,
        rating: profile.rating,
        noOfAppointments: profile.noOfAppointments,
        doctorType: profile.doctorType,
        adminApproved: profile.adminApproved,
        terms: profile.terms,
        reviews: profile.reviews,
        availableSlots: profile.availableSlots,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
      };
    } else if (role === "patient") {
      const patientProfile = profile as PatientProfile;
      profileInfo = {
        _id: patientProfile._id,
        firstName: patientProfile.firstName,
        middleName: patientProfile.middleName,
        lastName: patientProfile.lastName,
        dateOfBirth: patientProfile.dob,
        sex: patientProfile.sex,
        user: patientProfile.user,
        allergies: patientProfile.allergies,
        location: patientProfile.location,
        profilePhoto: patientProfile.profilePhoto,
      };
    }

    const payload = {
      ...userInfo,
      ...profileInfo,
    };

    return {
      data: payload as WhoAmIResponse,
      isLoading,
    };
  } else {
    return {
      data: null,
      isLoading,
      fetchWhoAmI: refetch,
    };
  }
}
