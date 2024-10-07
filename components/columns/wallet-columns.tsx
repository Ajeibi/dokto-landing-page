"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatAmountWithCurrency, formatDate } from "@/lib/utils";
import Paragraph from "../ui/typography/paragraph";
import { Transaction } from "@/api/dashboard/wallet/get-wallet";

export const wallet_columns: ColumnDef<Transaction>[] = [
    {
        accessorKey: "transactionId",
        header: "Transaction ID",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <Paragraph className="capitalize min-w-32 text-sm text-text-sec pl-5">
                    {data.transactionId}
                </Paragraph>
            );
        },
    },
    {
        accessorKey: "amount",
        header: "Amount Paid",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <Paragraph className="font-normal min-w-32 text-sm text-text-sec">
                    {formatAmountWithCurrency(data.amount, "USD")}
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
                <Paragraph className="font-normal min-w-32 text-sm text-text-sec">
                    {formatDate(data.transactionDate)}
                </Paragraph>
            );
        },
    },
    {
        accessorKey: "source",
        header: "Source",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <Paragraph className="capitalize min-w-32 text-sm text-text-sec">
                    {data.source || "N/A"}
                </Paragraph>
            );
        },
    },
    {
        accessorKey: "transactionType",
        header: "Transaction Type",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <Paragraph className="capitalize min-w-32 text-sm text-text-sec">
                    {data.transactionType}
                </Paragraph>
            );
        },
    },
    {
        accessorKey: "state",
        header: "State",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <Paragraph className="capitalize min-w-32 text-sm text-text-sec">
                    {data.state}
                </Paragraph>
            );
        },
    },
];