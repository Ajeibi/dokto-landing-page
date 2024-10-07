"use client";

import { cn, updateUrl } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { IconProps } from "../icons";

export interface TabTypes {
  name: string;
  href: string;
  icon?: (props: IconProps) => JSX.Element;
}

interface Props {
  tabs: TabTypes[];
}

export default function Tabs({ tabs }: Props) {
  const currentTab = useSearchParams().get("tab") || tabs[0].href;
  const router = useRouter();

  return (
    <div className="border-b border-gray-100 bg-white py-4 px-3 rounded-md drop-shadow-[0_4px_24px_0px_rgba(0,0,0,0.8)]">
      <nav className="-mb-px flex space-x-8 " aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() =>
              router.push(
                updateUrl("tab", tab.href, ["query", "specialist", "page"])
              )
            }
            className={cn(
              tab.href === currentTab
                ? "border-[#4141A4] border-b-4 text-[#4141A4]"
                : "text-[#4F5E71CC]",
              "group inline-flex gap-3 items-center py-1 px-1 text-[15px] font-normal transition-all duration-200 ease-in-out cursor-pointer whitespace-nowrap"
            )}
          >
            {tab.icon && (
              <tab.icon
                className={cn(tab.href === currentTab ? "!fill-[#4141A4]" : "")}
              />
            )}
            <span>{tab.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
