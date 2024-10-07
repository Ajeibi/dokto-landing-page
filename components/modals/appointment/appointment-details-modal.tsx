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
import { IDoctorDetails } from "@/components/virtual-call/waiting-screen";
import { useDoctor } from "@/context/doctor";
import { DialogProps } from "@/lib/generic-types";
import { formatDate } from "@/lib/utils";
import { CalendarDays, Clock5Icon, ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AppointmentDetailsModal({
  data,
  onOpenChange,
  open,
  openCancelModal,
}: DialogProps<AppointmentInfo> & { openCancelModal: typeof onOpenChange }) {
  const { setDoctor } = useDoctor();
  const router = useRouter();

  const doctor: IDoctorDetails = {
    name: `${data?.doctorId.personalInfo.firstName} ${data?.doctorId.personalInfo.lastName}`,
    image: data?.doctorId.personalInfo.imgUrl!,
    ratings: data?.doctorId.rating!,
    role: data?.doctorType!,
  };

  const handleJoinCall = () => {
    setDoctor(doctor);
    router.push(
      `/virtual-call?call=${data?.doctorId._id}&appointment=${data?._id}`
    );
  };

  let text = `This appointment is still waiting for approval from Dr ${data?.doctorId.personalInfo?.firstName}. Hold on a bit for approval`;

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="gap-7">
        <DialogHeader>
          <DialogTitle className="font-medium text-left text-base text-text ">
            Appointment Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 md:space-y-6 w-full overflow-x-hidden">
          {data?.status == "PENDING" && (
            <div className="bg-[#FCFAF6] h-14 rounded-lg py-4 px-5">
              <Paragraph
                className={`text-[#D78B07] text-sm whitespace-nowrap animate-[marquee_linear_infinite]`}
                style={{
                  animationDuration: `${5 + 0.1 * text.length}s`,
                }}
              >
                {text}
              </Paragraph>
            </div>
          )}
          <div className="space-y-4">
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

          <div className="space-y-2 lg:space-y-4">
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

          <div className="space-y-2 lg:space-y-4">
            <header className="text-xs lg:text-sm font-medium text-text-sec">
              Doctor Notes
            </header>
            <Paragraph className="text-text-subtle text-xs md:text-sm">
              {data?.patientNotes}
            </Paragraph>
          </div>

          <div className="space-y-2 lg:space-y-4">
            <header className="text-xs lg:text-sm font-medium text-text-sec">
              Uploaded Files
            </header>
            {data?.medicalImage?.map((image, index) =>
              image.length > 0 ? (
                <Link
                  key={index}
                  href={image}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={image} alt="image" width={50} height={50} />
                </Link>
              ) : null
            )}
          </div>

          <div className="pt-5 md:pt-3 space-y-3">
            {data?.status != "PENDING" && (
              <Button
                className="w-full"
                disabled={data?.status == "APPROVED"}
                onClick={handleJoinCall}
              >
                Join Appointment
              </Button>
            )}
            {data?.status == "COMPLETED" && (
              <Button className="w-full">Rate Doctor</Button>
            )}
            {data?.status != "COMPLETED" && (
              <Button
                className="w-full"
                variant={"tertiary"}
                onClick={() => {
                  onOpenChange(false);
                  openCancelModal(true);
                }}
              >
                Cancel Appointment
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
