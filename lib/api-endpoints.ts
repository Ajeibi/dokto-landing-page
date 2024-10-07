export const API_ENDPOINTS = {
  whoAmI: "/user",
  // profile
  editProfile: "/user/patient/profile",
  editProfileDoctor: (id: string) => `/user/doctor/${id}`,

  // AUTH: "auth",
  AUTH: {
    RESET: "auth/reset",
    LOGIN: "auth/login",
    REGISTER: "auth/register",
    GOOGLE: "auth/google",
    CHANGE_PASSWORD: "auth/update-user-password",
    UPDATE_ROLE: "/auth/update-user-role",
  },

  // appointments
  createAppointment: "/appointment",
  fetchAppointments: (type: string, page: number) =>
    `/appointment?type=${type}&page=${page}&size=10`,
  filterAppointments: (type: string) => `/appointment/filter/?type=${type}`,
  SearchAppointment: (query: string) =>
    `/appointment/search/?searchBy=${query}`,
  cancelAppointment: (id: string) => `/appointment/cancel/${id}`,

  generateMeetingToken: (appointmentId: string) => `/appointment/meeting/${appointmentId}`,

  // prescriptions
  fetchPrescriptions: (type: string, page: number) =>
    `/prescription?type=${type}&page=${page}&size=10`,
  createPrescription: "/prescription",
  getDrugs: "/drugs",

  // doctor prescriptions
  fetchDoctorPrescriptions: (filter: string, type: string, page: number) =>
    `/prescription/doctor/prescriptions?type=${filter}&prescription=${type}&page=${page}&size=10`,
  approvePrescription: (id: string) => `/prescription/approve/${id}`,
  rejectPrescription: (id: string) => `/prescription/reject/${id}`,

  // doctors
  availableDoctors: "/user/doctors?isAvailable=true",
  allDoctors: (page?: number) => `/user/doctors?page=${page || 1}&size=10`,
  searchByName: (name: string) => `/user/doctors?searchBy=${name}`,
  fetchSpecialists: (type: string, page?: number) =>
    `/user/doctors?type=${type || "physicians"}&page=${page || 1}&size=10`,
  fetchSingleDoctor: (id: string) => `/user/doctor/${id}`,

  // upload
  uploadImage: "/media/image",

  //practitioner appointments
  practitioner: {
    fetchAppointments: (type: string, page: number) =>
      `/appointment/doctor/appointments?type=${type}&page=${page}&size=10`,
    rejectAppointment: (id: string) => `/appointment/reject/${id}`,
    approveAppointment: (id: string) => `/appointment/approve/${id}`,
    completeAppointment: (id: string) => `/appointment/complete/${id}`,
  },

  //wallet
  createWallet: "/wallet/create",
  fetchWallet: "/wallet",

  // subscriptions
  fetchSubscriptions: "/subscription",
  fetchUserSubscriptions: "/subscription/user",
  fetchSubscriptionByCategory: (category: string, page: number) =>
    `/subscription?category=${category}&page=${page}&size=10`,
};
