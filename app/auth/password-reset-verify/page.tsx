"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Paragraph from "@/components/ui/typography/paragraph";
import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Flex } from "@/components/ui/flex";
import { MdMarkEmailRead } from "react-icons/md";


export default function PasswordResetVerify()
{

  return (
    <div className="w-full p-4 md:p-8 lg:p-12 h-auto centered">
      <Card className="w-full md:w-[70%] lg:w-[45%]    sm:min-w-ful border-none shadow-none p-8 space-y-6 flex flex-col items-center text-tertiary90">
        
				<Flex className="justify-start w-full">
					<Link className="" href="/">
						<Image className="pl-4" src="/dokto-logo.svg" alt="" width={129.17} height={50} />
					</Link>
				</Flex>

        <h5 className="text-[20px] font-bold md:text-[27px]">Reset Your Password</h5>

        <p className="text-[11px] text-center md:text-[14px] md:w-[70% lg:w-[60% text-[#b3b8bd]">We have sent a password resst link to your email (amo****@gmail.com). Click on the link provided in your mail. If you haven't received the password reset link, you can click the resend buttons.</p>

        <div className="text-[40px] md:text-[50px] text-primary bg-gray-200 p-2 rounded-full">
          <MdMarkEmailRead />
        </div>

        {/* <Paragraph className="font-[300] text-center">A Link has been sent to your Email</Paragraph> */}
        <Link href={"/auth/login"} className="w-full">
          <Button className="w-full tracking-[0.5%]  rounded-[40px]">Resend Link</Button>
        </Link>
      </Card>
    </div>

  );
}
