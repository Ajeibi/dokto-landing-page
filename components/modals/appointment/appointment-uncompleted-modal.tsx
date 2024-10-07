"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUser } from "@/context/user";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppointmentUncompletedModal = ({ isOpen, setIsOpen }: Props) => {
  const [review, setReview] = useState<string | undefined>(undefined);

  const router = useRouter();

  const { User } = useUser();

  const handleSubmitReview = () => {
    console.log(review);
    if (User?.role === "patient") {
      //todo implement when endpoint is ready for patient
    } else {
      //todo implement when endpoint is ready for doctor
    }
    router.push("/dashboard/appointment");
  };

  const handleCancelClick = () => {
    setIsOpen(false);
    router.push("/dashboard/appointment");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[600px] p-6 pb-8">
        <DialogHeader>
          <DialogTitle className="font-medium text-base text-[#232324]">
            Appointment not Completed
          </DialogTitle>
        </DialogHeader>

        <div className="text-left mt-5">
          <Label
            htmlFor="feedback"
            className="font-medium text-sm text-[#4F5E71] mb-3"
          >
            State the reason below <span className="text-[#FF0000]">*</span>
          </Label>

          <Textarea
            id="feedback"
            placeholder="Input reason here"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="border-[#CCCCCC4D] placeholder:text-[#4F5E71B2] placeholder:text-xs"
          />

          <div className="mt-9 w-full flex gap-4">
            <Button
              variant={"outline"}
              className="w-1/2 rounded-full"
              onClick={handleCancelClick}
            >
              Cancel
            </Button>

            <Button
              className="w-1/2 rounded-full bg-[#2CACDA] hover:bg-[#26a3d1]"
              onClick={handleSubmitReview}
              disabled={!review}
            >
              Send
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
