"use client";


import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Flex } from "../ui/flex";
import { Button } from "../ui/button";
import Paragraph from "../ui/typography/paragraph";
import { cn } from "@/lib/utils";

interface IStatusModal
{
      open: boolean;
      setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
      mode: "success" | "error" | "warn";
      onBtnClick: () => void;
      label: string;
      subLabel: string;
      btnLabel: string;
}

export const StatusModal = ({
      open,
      setIsOpen,
      mode,
      onBtnClick,
      label,
      subLabel,
      btnLabel
}: IStatusModal) =>
{

      const isSuccess = (mode === "success")
      return (
            <Dialog open={open} onOpenChange={setIsOpen}>
                  <DialogContent className="max-w-[550px] p-8 pt-16">

                        <img src={!isSuccess ? "/red-error.svg" : "/green-check.svg"} alt="status image" className="animate-bounce mx-auto"/>

                        <Flex col className={cn("border rounded-[16px] p-8  border-stroke400", isSuccess ? "bg-primary-10" : "bg-error-subtle")}>

                              <Paragraph className="text-black text-3xl">{label}</Paragraph>

                              <Paragraph className="text-black text-sm font-[200] mt-4 text-center">{subLabel}</Paragraph>

                              <Button onClick={onBtnClick} variant={isSuccess ? "default" : "destructive"} className="w-full mt-2">
                                    {btnLabel}
                              </Button>
                        </Flex>
                  </DialogContent>
            </Dialog>
      );
};
