"use client";

import Paragraph from "@/components/ui/typography/paragraph";
import React from "react";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AppointmentDetails } from "./appointment-details";
import { Medication } from "../prescriptions/types";
import { PractitionerAppointmentInfo } from "@/api/dashboard/appointments/practitioner/get-practitioner-appointments";

interface Props {
  data: PractitionerAppointmentInfo;
  medications: Medication[];
  pharmacyName: string;
  pharmacyAddress: string;
}

export function AppointmentAccordion({
  data,
  medications,
  pharmacyAddress,
  pharmacyName,
}: Props) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="mt-5">
        <AccordionTrigger className="text-[#4F5E71CC] text-xs font-medium mb-5">
          Appointment Details
        </AccordionTrigger>
        <AccordionContent>
          <AppointmentDetails data={data} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2" className="mt-8">
        <AccordionTrigger className="text-[#4F5E71CC] text-xs font-medium">
          Doctors Note & Patient Allergies
        </AccordionTrigger>
        <AccordionContent>
          <div className="mt-5 space-y-[10px] sm:space-y-4">
            <div className="space-y-2">
              <Paragraph className="text-[#4F5E71] text-sm font-normal">
                Doctors Note
              </Paragraph>
              <Paragraph className="text-[#4F5E71B2] text-xs font-normal">
                {data.doctorNotes}
              </Paragraph>
            </div>

            <div className="space-y-2">
              <Paragraph className="text-[#4F5E71] text-sm font-normal">
                Patient Allergies
              </Paragraph>
              <Paragraph className="text-[#232324] text-sm font-normal">
                {data.patientNotes}
              </Paragraph>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3" className="mt-8">
        <AccordionTrigger className="text-[#4F5E71CC] text-xs font-medium">
          Doctors Note & Patient Allergies
        </AccordionTrigger>
        <AccordionContent>
          <div className="mt-5 space-y-[10px] sm:space-y-3">
            <div className="flex justify-between">
              <Paragraph className="text-xs sm:text-sm text-[#16111D] font-medium">
                Medication Name
              </Paragraph>
              <Paragraph className="text-xs sm:text-sm text-[#16111D] font-medium">
                Dosage
              </Paragraph>
            </div>

            {medications.map((medication, index) => (
              <React.Fragment key={medication.id}>
                <PrescriptionContent
                  title={medication.medicationName}
                  value={medication.dosage}
                />

                {index < medications.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4" className="mt-8">
        <AccordionTrigger className="text-[#4F5E71CC] text-xs font-medium">
          Pharmacy Details
        </AccordionTrigger>
        <AccordionContent>
          <div className="mt-5 space-y-8">
            <PrescriptionContent title="Pharmacy Name" value={pharmacyName} />
            <PrescriptionContent
              title="Pharmacy Address"
              value={pharmacyAddress}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function PrescriptionContent({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="flex justify-between">
      <Paragraph className="text-xs sm:text-sm text-[#727A8B]">
        {title}
      </Paragraph>
      <Paragraph className="text-xs sm:text-sm text-[#232324]">
        {value}
      </Paragraph>
    </div>
  );
}
