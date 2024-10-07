"use client";

import { DialogProps } from "@/lib/generic-types";
import { parseAppointmentStep, updateUrl } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { AppointmentPayment } from "./steps/appointment-payment";
import { CompleteReservation } from "./steps/complete-reservation";
import { SuccessfulReservation } from "./steps/successful-reservation";
import { CreateAppointmentProps } from "./steps/types";

const appointmentSteps = [
  {
    component: AppointmentPayment,
    step: 0,
  },
  {
    component: CompleteReservation,
    step: 1,
  },
  {
    component: SuccessfulReservation,
    step: 2,
  },
];

export function BookAppointmentModal({
  onOpenChange,
  open,
  data,
}: DialogProps<CreateAppointmentProps>) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentStep = parseAppointmentStep(searchParams.get("step") || "0");

  // const isDesktop = useMediaQuery("(min-width: 768px)");

  const CurrentComponent = appointmentSteps.find(
    (step) => step.step === currentStep
  )?.component;

  const setStep = (direction: "prev" | "next") => {
    router.push(
      updateUrl(
        "step",
        direction === "next" ? currentStep + 1 : currentStep - 1
      )
    );
    // onOpenChange(true);
  };

  return (
    <>
      {CurrentComponent && (
        <CurrentComponent
          setStep={setStep}
          onOpenChange={onOpenChange}
          open={open}
          data={data}
        />
      )}
    </>
  );
}
