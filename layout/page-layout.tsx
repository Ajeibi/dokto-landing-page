
import { cn } from "@/lib/utils";
import React from "react";

export default function Page({ children, className }: { children: React.ReactNode, className?: string })
{

      return (
            <div className={cn("w-full h-auto px-16", className)}>

                  <div className="w-full">
                        {children}
                  </div>

            </div>

      );
}

