"use client";

import { StartPrescriptionRefill } from "@/components/dashboard/prescriptions/start-refill";
import { Button } from "@/components/ui/button";
import Tabs from "@/components/ui/nav-tab";
import { ScrollArea } from "@/components/ui/scroll-area";
import Heading3 from "@/components/ui/typography/heading3";
import { useUser } from "@/context/user";
import { updateUrl } from "@/lib/utils";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import { useRouter } from "next/navigation";
import React from "react";

const prescription_tabs = [
  {
    name: "Prescribed Drugs",
    href: "prescribed",
  },
  {
    name: "Prescription Request",
    href: "request",
  },
];

const doctor_prescription_tabs = [
  {
    name: "Prescription Request",
    href: "pending",
  },
  {
    name: "Approved Prescription Requests",
    href: "approved",
  },
  {
    name: "Declined Prescription Requests",
    href: "rejected",
  },
  {
    name: "Prescribed Drug",
    href: "prescribedBy",
  },
];

export default function PrescriptionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { User } = useUser();

  return (
    <>
      <div className="py-6 h-full lg:mr-10">
        <div className="flex justify-between mb-7 sm:items-center">
          <Heading3 className="font-medium text-sm md:text-2xl">
            Prescription{" "}
          </Heading3>

          {User?.role === "patient" && (
            <Button
              onClick={() => router.push(updateUrl("start-refill", "true"))}
              className="text-xs md:text-sm"
            >
              Request Prescription
            </Button>
          )}
        </div>

        <ScrollArea className="mb-6">
          <Tabs
            tabs={
              User?.role === "patient"
                ? prescription_tabs
                : doctor_prescription_tabs
            }
          />
          <Scrollbar orientation="horizontal" className="pt-1" />
        </ScrollArea>

        {children}
      </div>
      <StartPrescriptionRefill />
    </>
  );
}
