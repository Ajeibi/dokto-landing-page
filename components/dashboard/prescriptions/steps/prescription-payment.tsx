"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import Paragraph from "@/components/ui/typography/paragraph";
import Image from "next/image";
import * as React from "react";
import { usePrescriptionRefill } from "../context";
import { RefillStepsProps } from "./types";

const paymentOptions = [
  {
    title: "One Time Prescription",
    amount: 34.99,
  },
  {
    title: "Direct Subscription (Valid for 1 year)",
    amount: 299.99,
  },
];

export function PrescriptionPayment({ setStep }: RefillStepsProps) {
  const { value } = usePrescriptionRefill();

  const [selectedOption, setSelectedOption] = React.useState(0);

  const handlePayment = () => {
    console.log(paymentOptions[selectedOption]);

    setStep((prev) => prev + 1);
  };

  return (
    <>
      <div className="space-y-4 md:space-y-6">
        <div className="space-y-2 lg:space-y-4">
          <header className="text-xs lg:text-sm font-medium text-text-sec">
            No of Medication
          </header>

          <Paragraph className="text-xs lg:text-sm space-x-1.5 text-text-sec">
            <span>{value.medications.length}</span>
            <span>medications</span>
          </Paragraph>
        </div>

        <Separator />

        {paymentOptions.map((option, index) => (
          <React.Fragment key={index}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Paragraph className="text-[#4141A4] font-medium text-sm">
                  {option.title}
                </Paragraph>
                <Checkbox
                  checked={selectedOption === index}
                  onCheckedChange={() => setSelectedOption(index)}
                />
              </div>

              <div className="flex items-center justify-between *:text-text-sec *:text-sm">
                <Paragraph>Consultation Fee</Paragraph>
                <Paragraph>$ {option.amount}</Paragraph>
              </div>
            </div>

            {index === 0 && <Separator />}
          </React.Fragment>
        ))}

        <Separator />

        <div className="space-y-4">
          <header className="text-sm text-text-sec font-medium">
            Available Payment Option
          </header>

          <div className="py-2.5 flex items-center gap-2 px-4 rounded-lg border border-gray">
            <Image src={"/stripe.png"} alt="" width={20} height={20} />

            <span className="font-medium text-text-sec text-sm">
              Stripe Gateway
            </span>
          </div>
        </div>

        <div className="pt-5 md:pt-3">
          <Button className="w-full" onClick={handlePayment}>
            Make Payment (${paymentOptions[selectedOption].amount})
          </Button>
        </div>
      </div>
    </>
  );
}
