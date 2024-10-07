"use client";

import Tabs from "@/components/ui/nav-tab";
import { ScrollArea } from "@/components/ui/scroll-area";
import Heading3 from "@/components/ui/typography/heading3";
import Paragraph from "@/components/ui/typography/paragraph";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import { useSearchParams } from "next/navigation";
import React from "react";

const subscription_plan_tabs = [
  {
    name: "For Consultation",
    href: "consultation",
  },
  {
    name: "For Prescription",
    href: "prescription",
  },
];

export default function SubscriptionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentTab = useSearchParams().get("tab") || "consultation";

  return (
    <div className="py-6 h-full">
      <Heading3 className="font-medium text-sm md:text-2xl mb-7">
        Subscription Plan
      </Heading3>

      <ScrollArea className="mb-4 md:mb-6">
        <Tabs tabs={subscription_plan_tabs} />
        <Scrollbar orientation="horizontal" className="pt-1" />
      </ScrollArea>

      <Paragraph className="p-5 text-sm text-[#4F5E71CC] max-w-6xl mx-auto bg-[#F9F6FD] rounded-2xl mb-6 md:mb-7">
        {currentTab === "consultation"
          ? "The consultation fee covers both the appointment and the prescriptions you for the period of time you have chosen. Kindly select your preferred subscription option to get started."
          : "Note: The prescription Fee only covers your prescription refill, and does not cover any appointment you might wish to make. Use the consultation plan if you would love to pay for both appointment and prescription"}
      </Paragraph>

      {children}
    </div>
  );
}
