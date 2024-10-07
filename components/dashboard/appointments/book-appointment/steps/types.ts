import { TDoctorInfo } from "@/api/dashboard/doctors/types";

export type CreateAppointmentProps = TDoctorInfo & {
  appointmentInfo: {
    date: Date;
    time: string;
  };
};
