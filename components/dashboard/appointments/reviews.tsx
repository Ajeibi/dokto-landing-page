import { Icons } from "@/components/icons";
import Paragraph from "@/components/ui/typography/paragraph";
import Image from "next/image";
import React from "react";

export default function AppointmentsReviews() {
  return (
    <div className="space-y-1 lg:space-x-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 md:w-[3.125rem] md:h-[3.125rem] relative">
            <Image src="/avatar.png" alt="" fill />
          </div>

          <div className="">
            <Paragraph className="text-xs lg:text-sm font-medium text-text-sec">
              Dawn Mbang
            </Paragraph>
            <Paragraph className="text-xs text-text-subtle">
              21-09-2024
            </Paragraph>
          </div>
        </div>
        <Icons.stars />
      </div>
      <Paragraph className="text-text-subtle text-xs md:text-sm">
        I have been seeing Dr. Jemimah Aubert for the past year, and I cannot
        express enough how grateful I am for her support and expert advice. From
        the very first session, Dr. Aubert made me feel comfortable and
        understood.
      </Paragraph>
    </div>
  );
}
