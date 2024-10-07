import React from "react";
import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const Heading3 = ({ children, className, ...props }: Props) =>
{
  return (
    <h3 className={cn("text-2xl font-semibold tracking-tight", className)} {...props}>
      {children}
    </h3>
  );
};

export default Heading3;
