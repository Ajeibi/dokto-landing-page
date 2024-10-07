"use client";

import { useCancelAppointment } from "@/api/dashboard/appointments/cancel-appointment";
import { AppointmentInfo } from "@/api/dashboard/appointments/get-appointments";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import Paragraph from "@/components/ui/typography/paragraph";
import { DialogProps } from "@/lib/generic-types";
import { formatDate } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, Clock5Icon, ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  reason: z.string({ required_error: "Please enter a reason" }).min(10, {
    message: "Please enter a reason",
  }),
});

export type CancelAppointmentReasonProps = {
  reasonForCancellation: string;
  appointmentId: string;
};

export function CancelAppointmentsModal({
  data,
  onOpenChange,
  open,
  setOpenCancelledAppointmentModal,
}: DialogProps<AppointmentInfo> & {
  setOpenCancelledAppointmentModal: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}) {
  const { mutateAsync: cancelAppointment, isPending } = useCancelAppointment();

  const [showCancellationReason, setShowCancellationReason] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async ({ reason }: z.infer<typeof formSchema>) => {
    const payload = {
      reasonForCancellation: reason,
      appointmentId: data?._id!,
    };

    cancelAppointment(payload).then(() => {
      setOpenCancelledAppointmentModal(true);
      onOpenChange(false);
    });
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="gap-7">
        <DialogHeader>
          <DialogTitle className="font-medium text-left text-base text-text ">
            Cancel Appointment
          </DialogTitle>
        </DialogHeader>

        {showCancellationReason ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-9">
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-sm">
                      Reason for Canceling Appointment
                      <span className="text-error">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea placeholder="Input reason here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col lg:flex-row gap-5 w-full *:w-full">
                <Button
                  variant={"outline"}
                  type="button"
                  onClick={() => setShowCancellationReason(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!form.formState.isValid || isPending}
                  isLoading={isPending}
                >
                  Send
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div className="space-y-4 md:space-y-6 w-full overflow-x-hidden">
            <div className="space-y-4">
              <Paragraph className="font-medium text-text-sec text-sm">
                Appointment with
              </Paragraph>
              <div className="flex items-center gap-3 lg:gap-4 h-16 lg:h-[6.25rem]">
                <div className="w-16 h-16 lg:w-[6.25rem] lg:h-[6.25rem] relative">
                  {data?.doctorId?.personalInfo.imgUrl ? (
                    <Image
                      src={data?.doctorId?.personalInfo.imgUrl}
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
              {data?.medicalImage?.map((image, index) => (
                <Link
                  key={index}
                  href={image}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={image} alt="image" width={50} height={50} />
                </Link>
              ))}
            </div>

            <div className="pt-5 md:pt-3 w-full flex flex-col gap-3 lg:flex-row-reverse">
              <Button
                className="w-full"
                variant={"destructive"}
                onClick={() => setShowCancellationReason(true)}
              >
                Cancel Appointment
              </Button>

              <Button
                className="w-full"
                variant={"outline"}
                onClick={() => {
                  onOpenChange(false);
                }}
              >
                Back
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
