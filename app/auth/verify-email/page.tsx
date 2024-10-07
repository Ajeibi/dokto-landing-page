"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Paragraph from "@/components/ui/typography/paragraph";
import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";


import { useRouter, useSearchParams } from "next/navigation";
import { Flex } from "@/components/ui/flex";

export default function VerifyEmail()
{

  const router = useRouter();
  const searchParams = useSearchParams();
  const [seconds, setSeconds] = React.useState<number>(59);
  const [minutes, setMinutes] = React.useState<number>(1);

  const email = searchParams.get("email")

  function handleRedirect(){
    setTimeout(() => {
      router.push("/auth/login")
    }, 20000);
  }

  React.useEffect(() => {
    
  handleRedirect()
 
  }, [])

  React.useEffect(() =>
    {
      const interval = setInterval(() =>
      {
        if (seconds > 0)
        {
          setSeconds(seconds - 1);
        }
  
        if (seconds === 0)
        {
          if (minutes === 0)
          {
            clearInterval(interval);
          } else
          {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
  
      return () =>
      {
        clearInterval(interval);
      };
    });

  return (
    <div className="w-full p-4 md:p-8 lg:p-12 h-auto centered">
      <Flex col className="min-w-full md:min-w-[660px] lg:max-w-[540px]  p-1 md:p-5 md:px-8 space-y-6 flex flex-col items-center text-tertiary90">
				<Flex className="justify-start w-full">
					<Link className="" href="/">
						<Image className="pl-4" src="/dokto-logo.svg" alt="" width={129.17} height={50} />
					</Link>
				</Flex>

        <Flex col between className="w-full h-[180px] md:h-[250px]  p-2 px-8 md:p-8 md:px-[84px] fade-in-30 rounded bg-primary-10 border-[0.5px] border-stroke400">
          <Paragraph className="text-2xl md:text-3xl">Verification Link Sent</Paragraph>
          <Paragraph className="font-normal">We've sent an email to <b className="text-primary">{email}</b> with a verification link. </Paragraph>

          {/* <Link className="w-full" href={"/auth/verification-complete"}> */}
            <Button className="w-full tracking-[0.5%]">Resend Verification Link</Button>
          {/* </Link> */}

          <Flex between className="w-full md:flex-row flex-col">

            <Paragraph className="font-light text-xs">Link expires in <b className="text-primary"> {`${minutes}:${seconds}s`}</b></Paragraph>
     
            <Paragraph role="button" onClick={() => router.back()} className="font-light text-xs">Incorrect email address?</Paragraph>

          </Flex>
        </Flex>

      </Flex>
    </div>
  );
}
