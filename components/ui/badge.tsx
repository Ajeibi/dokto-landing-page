import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm px-2 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        PENDING: "border-transparent bg-[#FFF9ED] text-[#FFA800]",
        APPROVED: "border-transparent bg-success-subtle text-success",
        DELIVERED: "border-transparent bg-success-subtle text-success-dark",
        PURCHASED: "border-transparent bg-[#E1EAED] text-[#04202A]",
        CANCELLED: "border-transparent bg-error-subtle text-error-dark",
        REJECTED: "border-transparent bg-error-subtle text-error-dark",
        FAILED: "border-transparent bg-error-subtle text-error-dark",
      },
    },
    defaultVariants: { variant: "PENDING" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, children, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        badgeVariants({ variant }),
        className,
        "space-x-1 capitalize"
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
