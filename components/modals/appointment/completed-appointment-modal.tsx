"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogProps } from "@/lib/generic-types";
import { useState } from "react";
import Paragraph from "@/components/ui/typography/paragraph";
import { Separator } from "@/components/ui/separator";
import { AppointmentAccordion } from "@/components/dashboard/appointments/appointment-accordion";
import {
  dummyPatientPrescription,
  dummyPendingPrescription,
} from "@/components/data/data";
import { AppointmentPrescription } from "@/components/dashboard/appointments/appointment-prescription";
import { PractitionerAppointmentInfo } from "@/api/dashboard/appointments/practitioner/get-practitioner-appointments";

export default function CompletedAppointmentModal({
  data,
  open,
  onOpenChange,
}: DialogProps<PractitionerAppointmentInfo>) {
  const [tab, setTab] = useState<string>("appointment");

  const pharmacyName = "Richards Pharmacy";

  const pharmacyAddress = "476 Colfax Avenue clifton Nj, 07013";

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="min-h-screen flex flex-col overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Details</DialogTitle>
        </DialogHeader>

        <div>
          <div className="relative font-medium text-left text-base text-text flex gap-4">
            <ParagraphWrapper
              tab={tab}
              title="appointment"
              switchFn={() => setTab("appointment")}
            >
              Appointment Details
            </ParagraphWrapper>
            <ParagraphWrapper
              tab={tab}
              title="prescription"
              switchFn={() => setTab("prescription")}
            >
              Prescription Details
            </ParagraphWrapper>

            <Separator className="absolute bottom-0" />
          </div>
        </div>

        <div className="overflow-y-auto h-screen">
          {tab === "appointment" ? (
            <AppointmentAccordion
              data={data!}
              medications={dummyPendingPrescription.medications}
              pharmacyName={pharmacyName}
              pharmacyAddress={pharmacyAddress}
            />
          ) : (
            <AppointmentPrescription data={dummyPatientPrescription} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ParagraphWrapper({
  children,
  switchFn,
  tab,
  title,
}: {
  children: React.ReactNode;
  switchFn: () => void;
  tab: string;
  title: string;
}) {
  return (
    <Paragraph
      onClick={switchFn}
      className={`text-sm px-3 py-[10px] border-b-[2px] hover:cursor-pointer ${
        tab === title ? "border-[#4141A4]" : "border-transparent"
      }`}
    >
      {children}
    </Paragraph>
  );
}
