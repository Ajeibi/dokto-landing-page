"use client";

import { AppointmentInfo } from "@/api/dashboard/appointments/get-appointments";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import Paragraph from "@/components/ui/typography/paragraph";
import { DialogProps } from "@/lib/generic-types";
import { formatDate } from "@/lib/utils";
import { CalendarDays, Clock5Icon, ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function AppointmentCancelledModal({
  data,
  onOpenChange,
  open,
}: DialogProps<AppointmentInfo>) {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="gap-7">
        <DialogHeader>
          <DialogTitle className="font-medium text-left text-base text-text ">
            Appointment Cancelled
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 md:space-y-6 w-full ">
          <div className="space-y-4 *:opacity-50">
            <Paragraph className="font-medium text-text-sec text-sm">
              Appointment with
            </Paragraph>
            <div className="flex items-center gap-3 lg:gap-4 h-16 lg:h-[6.25rem]">
              <div className="w-16 h-16 lg:w-[6.25rem] lg:h-[6.25rem] relative">
                {data?.doctorId.personalInfo.imgUrl ? (
                  <Image
                    src={data?.doctorId.personalInfo.imgUrl}
                    alt="doctor"
                    fill
                  />
                ) : (
                  <ImageIcon className="w-full h-full" />
                )}
              </div>

              <div className="flex flex-col justify-between h-full">
                <Paragraph className="font-medium text-sm capitalize text-text lg:text-base">
                  {data?.doctorId?.personalInfo.firstName}{" "}
                  {data?.doctorId?.personalInfo.lastName}
                </Paragraph>

                <div>
                  <Paragraph className="font-medium text-xs lg:text-sm">
                    {data?.doctorType}
                  </Paragraph>

                  <div className="flex items-center">
                    <Icons.stars />
                    <span className="text-text-sec font-normal text-xs lg:text-sm">
                      {data?.rating} Reviews
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2 lg:space-y-4 *:opacity-50">
            <header className="text-xs lg:text-sm font-medium text-text-sec">
              Appointment Information
            </header>

            <div className="flex items-center gap-6 *:text-xs *:lg:text-sm *:font-normal *:text-text-sec">
              <div className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4 lg:w-5 lg:h-5" />
                {formatDate(`${data?.appointmentDate}`)}
              </div>
              <div className="flex items-center gap-1">
                <Clock5Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                {data?.appointmentTime}
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2 lg:space-y-4 *:opacity-50">
            <header className="text-xs lg:text-sm font-medium text-text-sec">
              Doctor Notes
            </header>
            <Paragraph className="text-text-subtle text-xs md:text-sm">
              {data?.patientNotes}
            </Paragraph>
          </div>

          <div className="space-y-2 lg:space-y-4 *:opacity-50">
            <header className="text-xs lg:text-sm font-medium text-text-sec">
              Uploaded Files
            </header>
            <div>
              {data?.medicalImage.map((image, index) => (
                <div key={index} className="w-10 h-10 lg:w-12 lg:h-12 relative">
                  <Image src={image} alt="medical-image" fill />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-5 md:pt-3 w-full flex flex-col gap-3 lg:flex-row *:w-full">
            <Button
              variant={"outline"}
              onClick={() => {
                onOpenChange(false);
              }}
            >
              Back
            </Button>

            <Button asChild>
              <Link href={"/dashboard/appointment/doctors"}>
                Book Another Appointment
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
