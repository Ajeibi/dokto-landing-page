"use client";

import { TDoctorPrescriptionInfo } from "@/api/dashboard/prescription/get-doctor-prescription";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { DoctorPrescriptionMenu } from "../menu/doctor-prescription-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import Paragraph from "../ui/typography/paragraph";

export const doctor_prescription_columns: ColumnDef<TDoctorPrescriptionInfo>[] =
  [
    {
      accessorKey: "_id",
      header: "Prescription ID",
      cell: ({ row }) => {
        const data = row.original;

        return (
          <Paragraph className="capitalize min-w-32 text-sm text-text-sec">
            {data._id}
          </Paragraph>
        );
      },
    },
    {
      accessorKey: "prescribedTo",
      header: "Request By",
      cell: ({ row }) => {
        const data = row.original;

        return (
          <div className="flex items-center gap-2 min-w-40 max-[768px]:pr-7">
            <Avatar className="w-[35px] h-[35px]">
              <AvatarImage
                src={data.prescribedTo ? data.prescribedTo.profilePhoto : ""}
              />
              <AvatarFallback>
                {data.prescribedTo ? data.prescribedTo.firstName.charAt(0) : ""}
              </AvatarFallback>
            </Avatar>

            <Paragraph className="text-sm font-medium text-text-sec">
              {data.prescribedTo
                ? `${data.prescribedTo?.firstName} ${data.prescribedTo?.lastName}`
                : data.contact.name}
            </Paragraph>
          </div>
        );
      },
    },
    {
      accessorKey: "medications",
      header: "No of Medication",
      cell: ({ row }) => {
        const data = row.original;

        return (
          <Paragraph className="font-normal min-w-32 text-sm text-text-sec">
            {data.medications.length} Medicines
          </Paragraph>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const data = row.original;

        return (
          <Badge variant={data.status.toUpperCase() as any}>
            {data.status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Date of Request",
      accessorFn: (row) => formatDate(row.createdAt),
    },
    {
      id: "actions",
      header(props) {
        return (
          <Paragraph className="text-end text-text text-sm">Actions</Paragraph>
        );
      },
      cell: ({ row }) => {
        const data = row.original;

        // @ts-ignore
        return <DoctorPrescriptionMenu row={data} />;
      },
    },
  ];

export const doctor_prescription_prescribed_columns: ColumnDef<TDoctorPrescriptionInfo>[] =
  [
    {
      accessorKey: "_id",
      header: "Prescription ID",
      cell: ({ row }) => {
        const data = row.original;

        return (
          <Paragraph className="capitalize min-w-32 text-sm text-text-sec">
            {data._id}
          </Paragraph>
        );
      },
    },

    {
      accessorKey: "prescribedTo",
      header: "Prescribed To",
      cell: ({ row }) => {
        const data = row.original;

        return (
          <div className="flex items-center gap-2 min-w-40 max-[768px]:pr-7">
            <Avatar className="w-[35px] h-[35px]">
              <AvatarImage
                src={data.prescribedTo ? data.prescribedTo.profilePhoto : ""}
              />
              <AvatarFallback>
                {data.prescribedTo ? data.prescribedTo.firstName.charAt(0) : ""}
              </AvatarFallback>
            </Avatar>

            <Paragraph className="text-sm font-medium text-text-sec">
              {data.prescribedTo
                ? `${data.prescribedTo.firstName} ${data.prescribedTo.lastName}`
                : ""}
            </Paragraph>
          </div>
        );
      },
    },
    {
      accessorKey: "medications",
      header: "No of Medication",
      cell: ({ row }) => {
        const data = row.original;

        return (
          <Paragraph className="font-normal min-w-32 text-sm text-text-sec">
            {data.medications.length} Medicines
          </Paragraph>
        );
      },
    },
    {
      accessorKey: "date",
      header: "Appointment Date",
      cell: ({ row }) => {
        const data = row.original;

        return (
          <Paragraph className="font-normal min-w-32 text-sm text-text-sec">
            Achu is owing me appointment date
          </Paragraph>
        );
      },
    },
    {
      accessorKey: "updatedAt",
      header: "Date Prescribed",
      accessorFn: (row) => formatDate(row.updatedAt),
    },
    {
      id: "actions",
      header(props) {
        return (
          <Paragraph className="text-end text-text text-sm">Actions</Paragraph>
        );
      },
      cell: ({ row }) => {
        const data = row.original;

        // @ts-ignore
        return <DoctorPrescriptionMenu row={data} />;
      },
    },
  ];
