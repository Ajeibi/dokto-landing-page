"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Paragraph from "@/components/ui/typography/paragraph";
import React, { useEffect } from "react";
import Image from "next/image";
// import { Card } from "@/components/ui/card";
import { RiVerifiedBadgeLine } from "react-icons/ri";

import { useRouter, useSearchParams } from "next/navigation";
import { Flex } from "@/components/ui/flex";

export default function VerifyComplete() {

  // const [seconds, setSeconds] = React.useState<number>(4);
  // const [minutes, setMinutes] = React.useState<number>(0);
  const router = useRouter();
  // const searchParams = useSearchParams();

  function handleRedirect(){
    setTimeout(() => {
      router.push("/auth/login")
    }, );
  }

  useEffect(() => {
    
  handleRedirect()
 
  }, [])
  
  // useEffect(() =>
  //   {
  //     const interval = setInterval(() =>
  //     {
  //       if (seconds > 0)
  //       {
  //         setSeconds(seconds - 1);
  //       }
  
  //       if (seconds === 0)
  //       {
  //         if (minutes === 0)
  //         {
  //           clearInterval(interval);
  //         } else
  //         {
  //           setMinutes(minutes - 1);
  //           setSeconds(59);
  //         }
  //       }
  //     }, 1000);
  
  //     return () =>
  //     {
  //       clearInterval(interval);
  //     };
  //   });


  return (
    <div className="w-full h-screen p-4 md:p-8 lg:p-12 centered">
      <Flex col  className="w-[90%] md:w-[80%] lg:w-[70%] p-1 md:p-5 md:px-8  space-y-6 flex flex-col items-center text-tertiary90">
        <div className="text-[60px] md:text-[100px] text-primary">
          <RiVerifiedBadgeLine />
        </div>

        <Flex col between  className="w-full bg-white  p-4 px-8 md:p-8 md:px-[84px] fade-in-30 rounded-[32px]">
          <Paragraph className="text-[14px]  md:text-[18px] text-center">Account Verification Successful</Paragraph>
          <Paragraph className="font-normal text-[12px] md:text-[14px] mt-4 text-center text-[#5c6a7b]">We have successfully verified your account. Please proceed to your dashboard by clicking the button below, and enjoy your stay with Dokto. 
            {/* <b className="text-primary">{`${minutes}:${seconds}s`}</b> */}

                <Button className="text-white  rounded-[25px] w-full h-[40px] mt-[30px]">
                    Okay
                </Button>
            </Paragraph>
        </Flex>

      </Flex>
    </div>
  );
}