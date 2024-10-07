"use client";

import { useApprovePrescription } from "@/api/dashboard/prescription/doctor-prescription";
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
import { useState } from "react";

export function ApprovePrescriptionModal({
  data,
  onOpenChange,
  open,
  closeModal,
}: DialogProps<{ id: string }> & { closeModal: () => void }) {
  const [reason, setReason] = useState<string | undefined>(undefined);

  const { mutateAsync: approvePrescription, isPending: isApproving } =
    useApprovePrescription();

  const handleSubmitReason = async () => {
    const payload = {
      reason: reason!,
      id: data?.id ? data.id : "",
    };

    approvePrescription(payload).then(() => {
      onOpenChange(false);

      closeModal();
    });
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="gap-7">
        <DialogHeader>
          <DialogTitle className="text-left flex flex-col gap-2">
            <span className="font-medium text-base">
              APPROVE PRESCRIPTION REQUEST
            </span>

            <span className="font-normal text-sm text-[#727A8B]">
              To process prescription, please provide the reasons you choose to
              approve this prescription
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="w-full overflow-x-hidden">
          <div className="space-y-2 mb-12 px-3">
            <Label
              htmlFor="reason"
              className="text-[#727A8B] font-normal text-sm "
            >
              Enter the reason for approving this drug
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
              className="w-1/2 rounded-full"
              onClick={handleSubmitReason}
              isLoading={isApproving}
            >
              Approve
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
