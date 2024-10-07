"use client";

import { AppointmentRatingsModal } from "./appointment-rating-modal";
import { Button } from "@/components/ui/button";
import { Flex } from "@/components/ui/flex";
import Heading3 from "@/components/ui/typography/heading3";
import { Icons } from "@/components/icons";
import Paragraph from "@/components/ui/typography/paragraph";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useUser } from "@/context/user";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
}

export const AppointmentCompletedModal = ({
  isOpen,
  setIsOpen,
  name,
}: Props) => {
  const [ratingModalOpen, setRatingModalOpen] = useState<boolean>(false);

  const router = useRouter();

  const { User } = useUser();

  const handleRateClick = () => {
    setIsOpen(false);
    setRatingModalOpen(true);
  };

  const handleCancelClick = () => {
    setIsOpen(false);
    router.push("/dashboard/appointment");
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[600px] p-6 pb-8 pt-[60px]">
          <Flex col className="text-center">
            <Icons.successTick />
            <Heading3 className="font-medium text-base text-[#232324] my-4">
              Appointment Completed!
            </Heading3>

            <Paragraph className="text-sm text-[#4F5E71] px-3">
              {" "}
              {User?.role === "patient"
                ? ` Your appointment with ${name} was successful. Use the rate doctor button to give a review on how satisfied you are with the services provided by Dr Jemimah, or press the cancel button to skip this process.`
                : "Congratulations on completing your appointments with your patients. Please check your dashboard to see if you have any other scheduled appointments."}
            </Paragraph>

            <div className="mt-9 w-full flex gap-4">
              {User?.role === "patient" ? (
                <>
                  <Button
                    variant={"outline"}
                    className="w-1/2 rounded-full"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </Button>

                  <Button
                    className="w-1/2 rounded-full bg-[#2CACDA] hover:bg-[#26a3d1]"
                    onClick={handleRateClick}
                  >
                    Rate Doctor
                  </Button>
                </>
              ) : (
                <Button
                  className="w-full rounded-full bg-[#2CACDA] hover:bg-[#26a3d1]"
                  onClick={() => setIsOpen(false)}
                >
                  Okay
                </Button>
              )}
            </div>
          </Flex>
        </DialogContent>
      </Dialog>

      <AppointmentRatingsModal
        isOpen={ratingModalOpen}
        setIsOpen={setRatingModalOpen}
        name={name}
      />
    </>
  );
};
