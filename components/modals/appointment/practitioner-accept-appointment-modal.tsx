"use client";

import { Button } from "@/components/ui/button";
import { Flex } from "@/components/ui/flex";
import Heading3 from "@/components/ui/typography/heading3";
import { Icons } from "@/components/icons";
import Paragraph from "@/components/ui/typography/paragraph";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { formatDate, formatTime } from "@/lib/utils";
import { IAppointmentData } from "./practitioner-appointment-details-modal";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: IAppointmentData;
}

export const PractitionerAcceptAppointmentModal = ({
  isOpen,
  setIsOpen,
  data,
}: Props) => {
  const router = useRouter();

  const handleOkayClick = () => {
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
              Appointment Accepted!
            </Heading3>

            <Paragraph className="text-sm text-[#4F5E71] px-3">
              You have successfully accepted the appointment with{" "}
              <span className="capitalize">{data.name}</span> for{" "}
              {formatDate(data.appointmentDate)}, at{" "}
              {formatTime(data.appointmentTime)}.
            </Paragraph>

            <Button
              className="w-full rounded-full mt-9"
              onClick={handleOkayClick}
            >
              Okay
            </Button>
          </Flex>
        </DialogContent>
      </Dialog>
    </>
  );
};
