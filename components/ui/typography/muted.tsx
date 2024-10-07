import React from "react";
import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

const Muted = ({ children, className, ...props }: Props) => {
  return (
    <p className={cn("text-xs text-tertiary70 font-normal", className)} {...props}>
      {children}
    </p>
  );
};

export default Muted;
