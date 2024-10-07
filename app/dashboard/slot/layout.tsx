"use client";

import Loading from "@/components/loading";
import Paragraph from "@/components/ui/typography/paragraph";
import { useUser } from "@/context/user";
import { useRouter } from "next/navigation";
import React from "react";

export default function SlotManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { User } = useUser();
  const router = useRouter();

  if (User?.role === "patient") {
    router.back();
  }

  if (!User) return <Loading />;

  return (
    <div className="py-6 space-y-5  max-w-6xl mx-auto">
      <Paragraph className="font-medium">Slot Management</Paragraph>

      <div className="rounded-2xl bg-[#f9f6fd] p-5">
        <Paragraph className="text-sm text-[#4F5E71CC] ">
          Manage your appointment times by noting that any date marked with a
          purple indicator means you have set available slots for that day. The
          purple card displays the number of slots that have been booked. Click
          on a specific date to view more details about that day.
        </Paragraph>
      </div>

      {children}
    </div>
  );
}
