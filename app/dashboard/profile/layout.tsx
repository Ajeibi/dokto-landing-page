"use client";

import { Button } from "@/components/ui/button";
import Heading3 from "@/components/ui/typography/heading3";
import { updateUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <>
      <div className="py-6 h-full">
        <div className="flex justify-between mb-7 sm:items-center">
          <Heading3 className="font-medium text-sm md:text-2xl">
            My Profile
          </Heading3>

          <Button
            onClick={() => router.push(updateUrl("edit", "true"))}
            className="text-xs md:text-sm"
          >
            Edit Profile
          </Button>
        </div>

        {children}
      </div>
    </>
  );
}
