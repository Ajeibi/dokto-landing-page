"use client";

import { TPrescriptionInfo } from "@/api/dashboard/prescription/get-prescriptions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import Paragraph from "@/components/ui/typography/paragraph";
import { formatDate } from "@/lib/utils";
import React from "react";

interface Props {
  data: TPrescriptionInfo;
}

export function PrescriptionDetailsAccordion({ data }: Props) {
  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1" className="mt-5">
        <AccordionTrigger className="text-[#4F5E71CC] text-xs font-medium">
          General
        </AccordionTrigger>
        <AccordionContent>
          <div className="mt-5 space-y-[10px] sm:space-y-3">
            <PrescriptionContent title={"Prescription ID:"} value={data._id} />
            <Separator />
            <PrescriptionContent
              title={"Prescription Type:"}
              value={data.deliveryMethod}
            />
            <Separator />
            <PrescriptionContent
              title={"Approved / Declined By:"}
              value={
                data.prescribedTo.firstName.length > 0
                  ? data.prescribedTo.firstName
                  : "--- ---"
              }
            />
            <Separator />
            <PrescriptionContent
              title={"No of Medications:"}
              value={`${data.medications.length} Medications`}
            />
            <Separator />
            <PrescriptionContent
              title={"Date of Prescription:"}
              value={formatDate(data.createdAt)}
            />
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2" className="mt-8">
        <AccordionTrigger className="text-[#4F5E71CC] text-xs font-medium">
          Medications
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

            {data.medications.map((medication, index) => (
              <React.Fragment key={medication._id}>
                <PrescriptionContent
                  title={medication.name}
                  value={medication.duration + " " + "days"}
                />

                {index < data.medications.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3" className="mt-8">
        <AccordionTrigger className="text-[#4F5E71CC] text-xs font-medium">
          Pharmacy Details
        </AccordionTrigger>
        <AccordionContent>
          <div className="mt-5 space-y-1">
            <Paragraph className="text-sm text-[#16111D] font-medium">
              Name: {data.pharmacy.name}
            </Paragraph>
            <Paragraph className="text-xs text-[#16111D]">
              Address: {data.pharmacy.address}
            </Paragraph>
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
