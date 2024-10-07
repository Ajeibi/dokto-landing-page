"use client";

import { SubscriptionInfo } from "@/api/dashboard/subscription/get-subscriptions";
import { formatAmount, formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { DataTableColumnHeader } from "../ui/data-table/data-table-column-header";
import Paragraph from "../ui/typography/paragraph";

export const subscription_columns: ColumnDef<SubscriptionInfo>[] = [
  {
    accessorKey: "id",
    header: "Subscription ID",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <Paragraph className="capitalize max-w-32 truncate text-sm text-text-sec pl-5">
          {data._id}
        </Paragraph>
      );
    },
  },
  {
    accessorKey: "plan",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Selected Plan"
        sortItems={["1 Month", "One time"]}
      />
    ),
    cell: ({ row }) => {
      const data = row.original;

      return (
        <Paragraph className="capitalize min-w-32 text-sm text-text-sec">
          {data.planId.name}
        </Paragraph>
      );
    },
  },
  {
    accessorKey: "transactionDate",
    header: "Transaction Date",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <Paragraph className="text-sm font-medium  min-w-36  text-text-sec">
          {formatDate(data.createdAt)}
        </Paragraph>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount  Paid",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <Paragraph className="font-normal min-w-32 text-sm text-text-sec">
          ${formatAmount(data.planId.price)}
        </Paragraph>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Status"
        sortItems={["Approved", "Pending", "Failed"]}
      />
    ),
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="min-w-24">
          <Badge variant={data.status.toUpperCase() as any}>
            {data.status}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "daysLeft",
    header: "Days Left",
    cell: ({ row }) => {
      const data = row.original;

      const daysLeft = data.endDate
        ? Math.ceil((new Date(data.endDate).getTime() - Date.now()) / 86400000)
        : 0;

      return (
        <Paragraph className="text-sm text-text-sec min-w-max max-[1024px]:pr-5">
          {daysLeft} Days
        </Paragraph>
      );
    },
  },
];
