"use client"

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Flex } from "@/components/ui/flex";

export default function AuthLayout({ children }: { children: React.ReactNode })
{
  return (
    <div className="auth_layout relative min-h-screen">
				{/* <Flex className="justify-start w-full">
					<Link className="" href="/">
						<Image className="pl-4" src="/dokto-logo.svg" alt="" width={129.17} height={50} />
					</Link>
				</Flex> */}
      
      <main className="relative w-full">
        {children}
      </main>

      <style jsx>
        {`
        .auth_layout{
          background-image: url(/grid-lines.png);
          background-size: cover;
          background-repeat: no-repeat;
        }
`}
      </style>
    </div>
  );
}
