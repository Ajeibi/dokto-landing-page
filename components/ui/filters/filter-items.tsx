import * as React from "react";

import { Icons } from "@/components/icons";
import { updateUrl } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";

interface FilterProps {
  title?: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  urlParam: string;
}

export function FilterItems({ title, options, urlParam }: FilterProps) {
  const filter = useSearchParams().get("filter");
  const router = useRouter();
  const currVal = options.find((item) => item.value == filter);

  const [currentOption, setCurrentOption] = React.useState(
    currVal?.label || options[0]?.label
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 border border-gray-300 bg-transparent rounded-full pl-5 pr-3 py-2 gap-3"
        >
          <span className="capitalize hidden md:flex text-[#4F5E71] font-normal">
            {title}:
          </span>
          <span className="capitalize text-[#4F5E71] font-normal">
            {currentOption}
          </span>
          <Icons.chevronDownIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-full md:w-[200px] p-2" align="start">
        {options.map((option) => {
          return (
            <DropdownMenuItem
              key={option.value}
              onSelect={() => {
                setCurrentOption(option.label);
                router.push(updateUrl(urlParam, option.value));
              }}
            >
              {option.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
