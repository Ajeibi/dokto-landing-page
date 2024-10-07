import React from "react";
import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const Heading4 = ({ children, className, ...props }: Props) =>
{
  return (
    <h4 className={cn("text-xl font-semibold tracking-tight text-black", className)} {...props}>
      {children}
    </h4>
  );
};

export default Heading4;
