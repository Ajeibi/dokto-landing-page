"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import Paragraph from "@/components/ui/typography/paragraph";
import Image from "next/image";
import React from "react";
import SubscriptionPending from "./pending";
import SubscriptionSuccessful from "./successful";
import { SubscriptionInfo } from "@/api/dashboard/subscription/get-subscription-by-category";

type PaymentProps = SubscriptionInfo & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SubscriptionPayment({
  open,
  onOpenChange,
  ...props
}: PaymentProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [status, setStatus] = React.useState("pending");

  const handlePayment = () => {
    setStatus("successful");
    setIsOpen(true);
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="gap-7 max-w-xl">
          <DialogHeader>
            <DialogTitle className="font-medium text-left text-base text-text ">
              Subscription Payment
            </DialogTitle>
            <DialogDescription className="hidden"></DialogDescription>
          </DialogHeader>
          <div className="space-y-4 md:space-y-6">
            <div className="space-y-4">
              <Paragraph className="font-medium text-text-sec text-sm">
                Selected Plan
              </Paragraph>
              <div className="space-y-2">
                <Paragraph className="text-sm capitalize md:text-base text-text font-medium">
                  {props.name}
                </Paragraph>
                <Paragraph className="text-text-sec text-xs md:text-sm">
                  Valid for {props.duration}
                </Paragraph>
              </div>
            </div>

            <Separator />

            <div className="space-y-2 lg:space-y-4">
              <header className="text-xs lg:text-sm font-medium text-text-sec">
                Payment Break Down
              </header>

              <div className="flex items-center justify-between *:text-text-sec *:text-sm">
                <Paragraph className="capitalize">
                  {props.category} Fee
                </Paragraph>
                <Paragraph>
                  {props.currency} {props.price}{" "}
                </Paragraph>
              </div>
            </div>

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
                Make Payment ({props.currency}
                {props.price})
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {isOpen && status === "pending" ? (
        <SubscriptionPending open={isOpen} onOpenChange={setIsOpen} />
      ) : (
        <SubscriptionSuccessful open={isOpen} onOpenChange={setIsOpen} />
      )}
    </>
  );
}
