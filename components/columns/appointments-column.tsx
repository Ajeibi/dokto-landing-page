"use client";

import { AppointmentInfo } from "@/api/dashboard/appointments/get-appointments";
import { PractitionerAppointmentInfo } from "@/api/dashboard/appointments/practitioner/get-practitioner-appointments";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { CalendarDays, Clock4Icon } from "lucide-react";
import { AppointmentsMenu } from "../menu/appointments-menu";
import { PractitionerAppointmentsMenu } from "../modals/appointment/practitioner-appoinments-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Paragraph from "../ui/typography/paragraph";

export const appointments_columns: ColumnDef<
  AppointmentInfo | PractitionerAppointmentInfo
>[] = [
  {
    accessorKey: "doctor.name",
    header: "Doctor",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="border-r-2 border-white pl-2 pr-6 flex items-center gap-2 min-w-64">
          <Avatar className="w-[50px] h-[50px]">
            <AvatarImage
              src={data.doctorId ? data.doctorId.personalInfo.imgUrl : ""}
            />
            <AvatarFallback className="uppercase">
              {data.doctorId
                ? data.doctorId.personalInfo.firstName.charAt(0)
                : ""}
              {data.doctorId
                ? data.doctorId.personalInfo.lastName.charAt(0)
                : ""}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-1 capitalize">
            <Paragraph className="text-sm font-medium">
              {data.doctorId ? data.doctorId.personalInfo.firstName : ""}{" "}
              {data.doctorId ? data.doctorId.personalInfo.lastName : ""}
            </Paragraph>
            <Paragraph className="text-xs font-normal">
              {data.doctorId ? data.doctorId.medicalInfo.specialty : ""}
            </Paragraph>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Descriptions",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <Paragraph className="text-sm pl-2 font-normal line-clamp-2 pr-8 w-[19.0625rem] break-words">
          {data.patientNotes}
        </Paragraph>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <Paragraph className="text-sm font-normal flex items-center gap-1 w-32">
          <CalendarDays /> {formatDate(data.appointmentDate.toString())}
        </Paragraph>
      );
    },
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <Paragraph className="text-sm font-normal flex items-center gap-1 w-32">
          <Clock4Icon /> {data.appointmentTime.toString()}
        </Paragraph>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;

      return <AppointmentsMenu row={data as AppointmentInfo} />;
    },
  },
];

export const practitioner_appointments_columns: ColumnDef<
  PractitionerAppointmentInfo | AppointmentInfo
>[] = [
  {
    accessorKey: "doctor.name",
    header: "Doctor",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="border-r-2 border-white pl-2 pr-6 flex items-center gap-2 min-w-64">
          <Avatar className="w-[50px] h-[50px]">
            <AvatarImage
              src={data.patientId ? data.patientId.profilePhoto! : ""}
            />
            <AvatarFallback className="uppercase">
              {data.patientId ? data.patientId.firstName.charAt(0) : ""}
              {data.patientId ? data.patientId.lastName.charAt(0) : ""}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-1 capitalize">
            <Paragraph className="text-sm font-medium">
              {data.patientId
                ? `${data.patientId.firstName} ${data.patientId.lastName}`
                : ""}
            </Paragraph>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Descriptions",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <Paragraph className="text-sm pl-2 font-normal line-clamp-2 pr-8 w-[19.0625rem] break-words">
          {data.patientNotes}
        </Paragraph>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <Paragraph className="text-sm font-normal flex items-center gap-1 w-32">
          <CalendarDays /> {formatDate(data.appointmentDate.toString())}
        </Paragraph>
      );
    },
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <Paragraph className="text-sm font-normal flex items-center gap-1 w-32">
          <Clock4Icon /> {data.appointmentTime.toString()}
        </Paragraph>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <PractitionerAppointmentsMenu
          row={data as PractitionerAppointmentInfo}
        />
      );
    },
  },
];
