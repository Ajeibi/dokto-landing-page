import * as React from "react";
import { cn } from "@/lib/utils";

interface IFlex extends React.HTMLAttributes<HTMLDivElement>
{
  gap?: number;
  between?: boolean;
  col?: boolean;
  full?: boolean;
}

export const Flex = React.forwardRef<HTMLDivElement, IFlex>(
  ({ className, gap, between, col, full, ...props }, ref) => (
    <div ref={ref} {...props} className={cn(col ? "flex-col" : "flex-row", `flex items-center ${between ? "justify-between" : ""}`, gap ? `gap-${gap}` : "", full ? "w-full" : "w-auto", className)}>
      {props.children}
    </div>
  )
);

Flex.displayName = "flex";
