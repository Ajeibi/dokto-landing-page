"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DialogProps } from "@/lib/generic-types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CancelAppointmentReasonProps } from "./cancel-appointment-modal";
import { useRejectAppointment } from "@/api/dashboard/appointments/practitioner/reject-appointment";

export interface RejectAppointmentData {
  name: string;
  appointmentId: string;
}

export function RejectAppointmentModal({
  data,
  onOpenChange,
  open,
}: DialogProps<RejectAppointmentData>) {
  const [reason, setReason] = useState<string | undefined>(undefined);

  const router = useRouter();

  const { mutateAsync, isPending } = useRejectAppointment();

  const handleClose = () => {
    onOpenChange(false);
    // openDetailsModal(true);
  };

  const handleSubmitReason = async () => {
    const payload: CancelAppointmentReasonProps = {
      reasonForCancellation: reason!,
      appointmentId: data?.appointmentId!,
    };

    try {
      await mutateAsync(payload);
      router.push("/dashboard/appointment");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog onOpenChange={handleClose} open={open}>
      <DialogContent className="gap-7">
        <DialogHeader>
          <DialogTitle className="text-left flex flex-col gap-2">
            <span className="font-medium text-base text-[#FF0000]">
              REJECT APPOINTMENT
            </span>

            <span className="font-normal text-sm text-[#727A8B]">
              You are about to reject this appointment request from{" "}
              <span className="capitalize">{data?.name}</span>, Use the close
              icon to go back
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="w-full overflow-x-hidden">
          <div className="space-y-2 mb-12 px-3">
            <Label
              htmlFor="reason"
              className="text-[#727A8B] font-normal text-sm "
            >
              Enter the reason for rejecting this appointment
            </Label>
            <Textarea
              id="reason"
              placeholder="Reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="border-[#CCCCCC4D] placeholder:text-[#4F5E71B2] placeholder:text-xs"
            />
          </div>
          <div className="w-full text-right">
            <Button
              variant={"tertiary"}
              className="w-1/2 rounded-full"
              onClick={handleSubmitReason}
              isLoading={isPending}
            >
              Reject Appointment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
