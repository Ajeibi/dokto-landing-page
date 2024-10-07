"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import Paragraph from "@/components/ui/typography/paragraph";
import { useMediaQuery } from "@/hooks/use-media-query";
import { updateUrl } from "@/lib/utils";
import { XIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { PrescriptionRefillProvider } from "./context";
import { refill_steps } from "./data";
import { Progress } from "@/components/ui/progress";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

export function StartPrescriptionRefill() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [isOpen, setIsOpen] = React.useState(false);

  const [step, setStep] = React.useState(0);

  const closeModal = () => {
    setIsOpen(false);
    setStep(0);
    localStorage.removeItem("start-refill");
    router.push(updateUrl("start-refill", "", ["start-refill"]));
  };

  React.useEffect(() => {
    setIsOpen(searchParams.get("start-refill") === "true");
  }, [searchParams]);

  if (!isOpen) {
    return null;
  }

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent className="px-0 max-w-xl">
          {step === refill_steps.length - 1 ? null : (
            <DialogHeader className="mb-6 px-4 md:px-6 lg:px-10">
              <DialogTitle>
                {refill_steps[step]?.title
                  ? refill_steps[step].title
                  : "Prescription Request"}
              </DialogTitle>
            </DialogHeader>
          )}

          <RefillSteps step={step} setStep={setStep} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} dismissible={false}>
      <DrawerContent
        className="h-[calc(100%-73px)]"
        showDragLine={false}
        showOverlay={false}
      >
        <ScrollArea className="h-full">
          <DrawerHeader className="relative  mb-6">
            {step === refill_steps.length - 1 ? null : (
              <DrawerTitle className="text-left text-text">
                {refill_steps[step]?.title
                  ? refill_steps[step].title
                  : "Prescription Request"}
              </DrawerTitle>
            )}
            <div
              className="absolute top-3 right-4 ring-1 ring-text rounded-md w-5 h-5 grid place-items-center p-0.5"
              onClick={closeModal}
            >
              <XIcon className="w-3 h-3" />
            </div>
          </DrawerHeader>

          <RefillSteps step={step} setStep={setStep} />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}

function RefillSteps({
  step,
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  step: number;
}) {
  const CurrentComponent = refill_steps[step]?.component;
  const stepsWithName = refill_steps.filter((s) => s.name);
  const showPreview = step > stepsWithName.length - 1;

  const percentage = ((step + 1) / stepsWithName.length) * 100;
  const clampedValue = Math.min(Math.max(percentage, 0), 100);

  return (
    <>
      {!showPreview && (
        <>
          <section className="space-y-2 md:space-y-2 pb-4 px-4 md:px-6 lg:px-10">
            <div className="flex items-center gap-2 md:gap-3 w-full">
              <Progress value={clampedValue} className="h-1" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant={"ghost"}
                  className="rounded-md p-1.5 grid place-items-center border border-text-sec disabled:opacity-20"
                  disabled={step === 0}
                  onClick={() => setStep((prev) => prev - 1)}
                >
                  <Icons.chevronLeftIcon className="w-2.5 h-2.5 text-text-sec" />
                </Button>
                <Paragraph className="text-xs text-text-sec">
                  {step + 1} of {stepsWithName.length}
                </Paragraph>
                <Button
                  variant={"ghost"}
                  className="rounded-md p-1.5 grid place-items-center border border-text-sec disabled:opacity-20"
                  disabled={step >= 0}
                  onClick={() => setStep((prev) => prev + 1)}
                >
                  <Icons.chevronRightIcon className="w-2.5 h-2.5 text-text-sec" />
                </Button>
              </div>
              <Paragraph className="text-xs text-text-sec">
                Progress Status
              </Paragraph>
            </div>
          </section>

          <div className="h-[52px] md:h-[60px] bg-[#FAFAFB] text-left flex items-center px-4 md:px-6 lg:px-10 mb-4">
            <Paragraph className="text-text text-sm ">
              {refill_steps[step].name}
            </Paragraph>
          </div>
        </>
      )}

      <PrescriptionRefillProvider>
        <div className="px-4 md:px-6 lg:px-10">
          {CurrentComponent && (
            <CurrentComponent key={step} setStep={setStep} />
          )}
        </div>
      </PrescriptionRefillProvider>
    </>
  );
}
