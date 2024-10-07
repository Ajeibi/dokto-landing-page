"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Paragraph from "@/components/ui/typography/paragraph";
import { BookAppointmentDialogProps } from "@/lib/generic-types";
import { CheckIcon } from "lucide-react";
import Link from "next/link";
import { CreateAppointmentProps } from "./types";

export function SuccessfulReservation({
  data,
  onOpenChange,
  open,
}: BookAppointmentDialogProps<CreateAppointmentProps>) {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="gap-7">
        <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-[#004BA6] grid place-items-center mx-auto mb-5">
          <CheckIcon
            className="w-5 h-5 md:w-10 md:h-10 text-white"
            strokeWidth={4}
          />
        </div>

        <div className="space-y-2 *:text-center mb-8 md:mb-9">
          <header className="font-medium  text-sm md:text-base">
            Reservation Request Received
          </header>
          <Paragraph className="text-xs md:text-sm text-text-subtle ">
            Your appointment request has been received. You will receive a
            confirmation notice shortly.
          </Paragraph>
        </div>

        <Button className="w-full" asChild>
          <Link href={"/dashboard/appointment?tab=pending"}>
            View Appointment Details
          </Link>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
