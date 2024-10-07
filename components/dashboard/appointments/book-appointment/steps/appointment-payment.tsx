"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import Paragraph from "@/components/ui/typography/paragraph";
import { BookAppointmentDialogProps } from "@/lib/generic-types";
import { formatDate } from "@/lib/utils";
import { CalendarDays, Clock5Icon, ImageIcon } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import { CreateAppointmentProps } from "./types";

const paymentOptions = [
  {
    title: "One Time Consultation",
    amount: 34.99,
  },
  {
    title: "Monthly subscription",
    amount: 34.99,
  },
];

export function AppointmentPayment({
  data,
  setStep,
  onOpenChange,
  open,
}: BookAppointmentDialogProps<CreateAppointmentProps>) {
  const [selectedOption, setSelectedOption] = React.useState(0);

  const handlePayment = () => {
    console.log(paymentOptions[selectedOption]);

    setStep("next");
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="gap-7 max-w-xl">
        <DialogHeader>
          <DialogTitle className="font-medium text-left text-base text-text ">
            Consultation Fee
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 md:space-y-6">
          <div className="space-y-4">
            <Paragraph className="font-medium text-text-sec text-sm">
              Appointment with
            </Paragraph>
            <div className="flex items-center gap-3 lg:gap-4 h-16 lg:h-[6.25rem]">
              <div className="w-16 h-16 lg:w-[6.25rem] lg:h-[6.25rem] relative">
                {data?.personalInfo.imgUrl ? (
                  <Image src={data?.personalInfo.imgUrl} alt="doctor" fill />
                ) : (
                  <ImageIcon className="w-full h-full" />
                )}
              </div>

              <div className="flex flex-col justify-between h-full">
                <Paragraph className="font-medium text-sm capitalize text-text lg:text-base">
                  {data?.personalInfo.firstName} {data?.personalInfo.lastName}
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
                {formatDate(`${data?.appointmentInfo.date}`)}
              </div>
              <div className="flex items-center gap-1">
                <Clock5Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                {data?.appointmentInfo.time}
              </div>
            </div>
          </div>

          <Separator />

          {paymentOptions.map((option, index) => (
            <React.Fragment key={index}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Paragraph className="text-[#4141A4] font-medium text-sm">
                    {option.title}
                  </Paragraph>
                  <Checkbox
                    checked={selectedOption === index}
                    onCheckedChange={() => setSelectedOption(index)}
                  />
                </div>

                <div className="flex items-center justify-between *:text-text-sec *:text-sm">
                  <Paragraph>Consultation Fee</Paragraph>
                  <Paragraph>${option.amount}</Paragraph>
                </div>
              </div>

              {index === 0 && <Separator />}
            </React.Fragment>
          ))}

          <Separator />

          <div className="space-y-4">
            <header className="text-sm text-text-sec font-medium">
              Available Payment Option
            </header>

            <div className="py-2.5 flex items-center gap-2 px-4 rounded-lg border border-gray">
              <Image src={"/stripe.png"} alt="" width={20} height={20} />

              <span className="font-medium text-text-sec text-sm">
                Stripe Gateway
              </span>
            </div>
          </div>

          <div className="pt-5 md:pt-3">
            <Button className="w-full" onClick={handlePayment}>
              Make Payment (${paymentOptions[selectedOption].amount})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
