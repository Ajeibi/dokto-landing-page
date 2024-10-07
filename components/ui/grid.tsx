import  * as React from "react";
import { cn } from "@/lib/utils";

interface IGrid extends React.HTMLAttributes<HTMLDivElement> {
  gap?: number;
  cols?:number;
}

export const Grid = React.forwardRef<HTMLDivElement, IGrid>(
  ({ className, gap, cols, ...props }, ref) => (
    <div ref={ref} {...props} className={cn("grid",cols ? `grid-cols-${cols}` : "", gap ? `gap-${gap}` : "", className)}>
      {props.children}
    </div>
  )
);

Grid.displayName = "grid";
