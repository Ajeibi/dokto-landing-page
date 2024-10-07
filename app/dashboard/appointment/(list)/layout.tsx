"use client";

import { Button } from "@/components/ui/button";
import Tabs from "@/components/ui/nav-tab";
import { ScrollArea } from "@/components/ui/scroll-area";
import Heading3 from "@/components/ui/typography/heading3";
import { useUser } from "@/context/user";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import Link from "next/link";
import React from "react";

const appointment_tabs = [
  {
    name: "Approved Appointments",
    href: "approved",
  },
  {
    name: "Pending Appointments",
    href: "pending",
  },
  {
    name: "Completed Appointments",
    href: "completed",
  },
  {
    name: "Cancelled Appointments",
    href: "cancelled",
  },
];

const practitioner_appointment_tabs = [
  {
    name: "Pending Approval",
    href: "pending",
  },
  {
    name: "Upcoming Appointments",
    href: "approved",
  },
  {
    name: "Previous Appointments",
    href: "completed",
  },
  {
    name: "Cancelled Appointments",
    href: "cancelled",
  },
];

export default function AppointmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { User } = useUser();

  return (
    <div className="py-6 h-full lg:mr-10">
      <div className="flex justify-between mb-7 sm:items-center">
        <Heading3 className="font-medium text-sm md:text-2xl">
          Appointment
        </Heading3>

        {User?.role === "patient" && (
          <Button asChild className="text-xs md:text-sm">
            <Link href={"appointment/doctors"}>Book Appointment</Link>
          </Button>
        )}
      </div>

      <ScrollArea className="mb-6">
        <Tabs
          tabs={
            User?.role === "patient"
              ? appointment_tabs
              : practitioner_appointment_tabs
          }
        />
        <Scrollbar orientation="horizontal" className="pt-1" />
      </ScrollArea>

      {children}
    </div>
  );
}
