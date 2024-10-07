"use client";

import { TPrescriptionInfo } from "@/api/dashboard/prescription/get-prescriptions";
import { PrescriptionDetailsAccordion } from "@/components/dashboard/prescriptions/prescription-details-accordion";
import { PrescriptionState } from "@/components/dashboard/prescriptions/prescription-state";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export const PrescriptionMenu = ({ row }: { row: TPrescriptionInfo }) => {
  const { status } = row;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="text-[#3E2464] text-xs px-2 py-1 rounded-sm bg-[#EFE9F8]"
        >
          View More
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full md:rounded-l-[36px] p-4 sm:p-6 md:max-w-2xl xl:max-w-[720px] bg-[#F7F5FA] sm:bg-white">
        <DialogHeader className="bg-[#F7F5FA] text-left md:rounded-tl-[36px] p-6 -m-6">
          <DialogTitle className="text-sm sm:text-base font-normal sm:pl-4">
            Prescription Details
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 sm:mt-10 sm:px-3">
          <PrescriptionState status={status} />

          <PrescriptionDetailsAccordion data={row} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
