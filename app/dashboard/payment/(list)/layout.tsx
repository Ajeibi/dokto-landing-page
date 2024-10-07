"use client";

import { Button } from "@/components/ui/button";
import Heading3 from "@/components/ui/typography/heading3";
import Link from "next/link";
import React from "react";
import { useUser } from "@/context/user";

export default function SubscriptionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { User } = useUser();
  const isPatient = User?.role === "patient";

  return (
    <div className="py-6 h-full">
      <div className="flex justify-between mb-7 sm:items-center">
        <Heading3 className="font-medium text-sm md:text-2xl">
          {isPatient ? "Subscription" : "My Wallet"}
        </Heading3>

        {isPatient && (
          <Button asChild className="text-xs md:text-sm">
            <Link href={"payment/plans"}>New Subscription</Link>
          </Button>
        )}
      </div>

      {children}
    </div>
  );
}
