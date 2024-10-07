import React from "react";
import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const Heading1 = ({ children, className, ...props }: Props) =>
{
  return (
    <h1 className={cn("text-4xl font-extrabold tracking-tight lg:text-5xl", className)} {...props}>
      {children}
    </h1>
  );
};

export default Heading1;
