"use client";

import { Button } from "@/components/ui/button";
import Paragraph from "@/components/ui/typography/paragraph";
import { CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { RefillStepsProps } from "./types";

export function SuccessfulRefill({ setStep }: RefillStepsProps) {
  const router = useRouter();
  return (
    <>
      <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-[#004BA6] grid place-items-center mx-auto mb-5">
        <CheckIcon
          className="w-5 h-5 md:w-10 md:h-10 text-white"
          strokeWidth={4}
        />
      </div>

      <div className="space-y-2 *:text-center mb-8 md:mb-9">
        <header className="font-medium  text-sm md:text-base">
          Successful!
        </header>
        <Paragraph className="text-xs md:text-sm text-text-subtle ">
          You have successfully made payment for your medication.
        </Paragraph>
        <Paragraph className="text-xs md:text-sm text-text-subtle ">
          To download the receipt of this transaction, check your transaction
          history.
        </Paragraph>
        <Paragraph className="text-xs md:text-sm text-text-subtle ">
          Proceed to your dashboard to begin a new journey.
        </Paragraph>
      </div>

      <Button
        onClick={() => {
          router.push("/dashboard/prescription?tab=request");
          setStep(0);
        }}
        className="w-full"
      >
        Okay
      </Button>
    </>
  );
}
