"use client";

import { TGeneralPractitionerPrescriptionInfo } from "@/api/dashboard/prescription/get-doctor-prescription";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PrescribedPrescriptionsDetails } from "../dashboard/prescriptions/prescribed-prescriptions-details";
import { PrescriptionDetailsDoctor } from "../dashboard/prescriptions/prescription-details-doctor";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export const DoctorPrescriptionMenu = ({
  row,
}: {
  row: TGeneralPractitionerPrescriptionInfo;
}) => {
  const { status } = row;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="text-[#3E2464] text-xs px-2 py-1 bg-[#EFE9F8]"
        >
          View More
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full p-4 sm:p-6 md:max-w-2xl xl:max-w-[720px] bg-[#F7F5FA] sm:bg-white">
        <DialogHeader className="bg-[#F7F5FA] text-left p-6 -m-6">
          <DialogTitle className="text-sm sm:text-base font-normal sm:pl-4">
            Prescription {status !== "pending" ? "Details" : "Request"}
          </DialogTitle>
        </DialogHeader>

        <Badge
          variant={status.toUpperCase() as any}
          className="w-fit ml-auto mt-6 sm:mt-10 "
        >
          {status}
        </Badge>

        <div className="">
          {status != "prescribed" ? (
            <PrescriptionDetailsDoctor data={row} setIsOpen={setIsOpen} />
          ) : (
            <PrescribedPrescriptionsDetails data={row} setIsOpen={setIsOpen} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
