"use client";

import { TPrescriptionInfo } from "@/api/dashboard/prescription/get-prescriptions";
import { formatAmount } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { PrescriptionMenu } from "../menu/prescription-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { DataTableColumnHeader } from "../ui/data-table/data-table-column-header";
import Paragraph from "../ui/typography/paragraph";

export const prescription_columns: ColumnDef<TPrescriptionInfo>[] = [
  {
    accessorKey: "id",
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
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Type"
        sortItems={["all", "self-request", "prescribed"]}
      />
    ),
    cell: ({ row }) => {
      const data = row.original;

      return (
        <Paragraph className="capitalize min-w-32 text-sm text-text-sec">
          {data.contact.name}
        </Paragraph>
      );
    },
  },
  {
    accessorKey: "profile",
    header: "Prescribed by",
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
    accessorKey: "number",
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
        <Badge variant={data.status.toUpperCase() as any}>{data.status}</Badge>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <Paragraph className="text-sm text-text-sec min-w-max max-[1024px]:pr-5">
          ${formatAmount(Number(0))}
        </Paragraph>
      );
    },
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

      return <PrescriptionMenu row={data} />;
    },
  },
];

export const prescription_columns_request: ColumnDef<TPrescriptionInfo>[] = [
  {
    accessorKey: "id",
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
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Type"
        sortItems={["all", "self-request", "prescribed"]}
      />
    ),
    cell: ({ row }) => {
      const data = row.original;

      return (
        <Paragraph className="capitalize min-w-32 text-sm text-text-sec">
          {data.contact.name}
        </Paragraph>
      );
    },
  },
  {
    accessorKey: "profile",
    header: "Prescribed by",
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
    accessorKey: "number",
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
        <Badge variant={data.status.toUpperCase() as any}>{data.status}</Badge>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <Paragraph className="text-sm text-text-sec min-w-max max-[1024px]:pr-5">
          ${formatAmount(Number(0))}
        </Paragraph>
      );
    },
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

      return <PrescriptionMenu row={data} />;
    },
  },
];
