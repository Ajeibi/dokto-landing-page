export type TDoctorInfo = {
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
