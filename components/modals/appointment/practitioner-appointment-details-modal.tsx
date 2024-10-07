"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Paragraph from "@/components/ui/typography/paragraph";
import { DialogProps } from "@/lib/generic-types";
import { useState } from "react";
import { PractitionerAcceptAppointmentModal } from "./practitioner-accept-appointment-modal";
import {
  RejectAppointmentData,
  RejectAppointmentModal,
} from "./reject-appointment-modal";
import { AppointmentDetails } from "@/components/dashboard/appointments/appointment-details";
import { useApproveAppointment } from "@/api/dashboard/appointments/practitioner/approve-appointment";
import { PractitionerAppointmentInfo } from "@/api/dashboard/appointments/practitioner/get-practitioner-appointments";
import { useRouter } from "next/navigation";

export interface IAppointmentData {
  name: string;
  appointmentDate: string;
  appointmentTime: string;
}

export function PractitionerAppointmentDetailsModal({
  data,
  onOpenChange,
  open,
  appointmentAvailable,
}: DialogProps<PractitionerAppointmentInfo> & {
  appointmentAvailable: boolean;
}) {
  const [acceptModalOpen, setAcceptModalOpen] = useState<boolean>(false);
  const [rejectModalOpen, setRejectModalOpen] = useState<boolean>(false);

  const router = useRouter();

  const { mutateAsync, isPending } = useApproveAppointment();

  const handleAcceptClick = async () => {
    try {
      const { _id } = data!;

      await mutateAsync(_id).then(() => {
        setAcceptModalOpen(true);
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleJoinCall = () => {
    router.push(
      `/virtual-call?call=${data?.doctorId._id}&appointment=${data?._id}`
    );
  };

  const patientName = data?.patientId
    ? `${data?.patientId.firstName} ${data?.patientId.lastName}`
    : "";

  const appointmentData: IAppointmentData = {
    name: patientName,
    appointmentDate: data?.appointmentDate!,
    appointmentTime: data?.appointmentTime!,
  };

  const rejectData: RejectAppointmentData = {
    name: patientName,
    appointmentId: data?._id!,
  };

  const text =
    "This appointment is still waiting for your approval. kindly  accept or reject this appointment.";

  return (
    <>
      <Dialog onOpenChange={onOpenChange} open={open}>
        <DialogContent className="gap-7">
          <DialogHeader>
            <DialogTitle className="font-medium text-left text-base text-text">
              Appointment Details
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 md:space-y-6 w-full overflow-x-hidden overflow-y-auto">
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

            <AppointmentDetails data={data} />

            <div className="pt-5 md:pt-3 space-y-3">
              {data?.status === "PENDING" ? (
                <div className="flex gap-5">
                  <Button
                    className="w-full"
                    variant={"tertiary"}
                    onClick={() => setRejectModalOpen(true)}
                  >
                    Reject Appointment
                  </Button>

                  <Button
                    className="w-full"
                    onClick={handleAcceptClick}
                    isLoading={isPending}
                  >
                    Accept Appointment
                  </Button>
                </div>
              ) : (
                <div className="w-full text-right">
                  <Button
                    disabled={appointmentAvailable}
                    onClick={handleJoinCall}
                  >
                    Join Appointment
                  </Button>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <PractitionerAcceptAppointmentModal
        data={appointmentData}
        isOpen={acceptModalOpen}
        setIsOpen={setAcceptModalOpen}
      />

      <RejectAppointmentModal
        data={rejectData}
        onOpenChange={setRejectModalOpen}
        open={rejectModalOpen}
      />
    </>
  );
}
