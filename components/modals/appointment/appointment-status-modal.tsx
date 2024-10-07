"use client";

import { AppointmentCompletedModal } from "@/components/modals/appointment/appointment-completed-modal";
import { AppointmentUncompletedModal } from "@/components/modals/appointment/appointment-uncompleted-modal";
import { Button } from "@/components/ui/button";
import { Flex } from "@/components/ui/flex";
import Heading3 from "@/components/ui/typography/heading3";
import { Icons } from "@/components/icons";
import Paragraph from "@/components/ui/typography/paragraph";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { useUser } from "@/context/user";
import { useComepleteAppointment } from "@/api/dashboard/appointments/practitioner/complete-appointment";
import { RejectAppointmentData } from "./reject-appointment-modal";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: RejectAppointmentData;
}

export const AppointmentStatusModal = ({ isOpen, setIsOpen, data }: Props) => {
  const [completeModalOpen, setCompleteModalOpen] = useState<boolean>(false);
  const [uncompleteModalOpen, setUncompleteModalOpen] =
    useState<boolean>(false);

  const { User } = useUser();

  const { mutateAsync, isPending } = useComepleteAppointment();

  const handleCompleteClick = async () => {
    try {
      await mutateAsync(data.appointmentId);
      setIsOpen(false);
      setCompleteModalOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUncompleteClick = () => {
    setIsOpen(false);
    setUncompleteModalOpen(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[600px] p-6 pb-8 pt-[60px]">
          <Flex col className="text-center">
            <Icons.calendarIcon />
            <Heading3 className="font-medium text-base text-[#232324] my-4">
              Appointment Status
            </Heading3>

            <Paragraph className="text-sm text-[#4F5E71] px-8">
              {User?.role === "patient"
                ? `Have you successfully concluded your appointment with ${name}? Your response will help us determine the outcome of your medical session and ensure your needs were met.`
                : "Please provide an update on whether you have finished all your scheduled patient appointments for today."}
            </Paragraph>

            <div className="mt-9 w-full flex gap-4">
              <Button
                variant={"outline"}
                className="w-1/2 rounded-full"
                onClick={handleUncompleteClick}
              >
                No
              </Button>
              <Button
                className="w-1/2 rounded-full bg-[#2CACDA] hover:bg-[#26a3d1]"
                onClick={handleCompleteClick}
                isLoading={isPending}
              >
                Yes
              </Button>
            </div>
          </Flex>
        </DialogContent>
      </Dialog>

      <AppointmentCompletedModal
        isOpen={completeModalOpen}
        setIsOpen={setCompleteModalOpen}
        name={data.name}
      />

      <AppointmentUncompletedModal
        isOpen={uncompleteModalOpen}
        setIsOpen={setUncompleteModalOpen}
      />
    </>
  );
};
