"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { updateUrl } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { specialists } from "./data";

export default function SpecialistsFilter() {
  const specialistType = useSearchParams().get("specialist") || "physicians";
  const router = useRouter();

  return (
    <ScrollArea className="w-full pl-1">
      <div className="w-full flex items-center gap-5 ">
        {specialists.map((item) => {
          const Icon = item.icon;
          const isActive = specialistType === item.value;

          return (
            <Button
              variant={"ghost"}
              onClick={() => router.push(updateUrl("specialist", item.value))}
              className={`flex flex-col items-center gap-px text-xs md:text-sm font-normal p-0 ${
                !isActive ? "text-[#4F5E7180]" : "text-[#574274]"
              }`}
            >
              <Icon className="w-10 h-10" />
              <span>{item.label}</span>
            </Button>
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" className="pt-2" />
    </ScrollArea>
  );
}
