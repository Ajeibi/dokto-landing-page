"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Paragraph from "@/components/ui/typography/paragraph";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import
{
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import
{
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as yup from "yup";
import { Flex } from "@/components/ui/flex";
import { useRouter } from "next/navigation";
import { useSendVerificationLink } from "@/api/auth/send-verification-link";
import Image from "next/image";

const loginSchema = yup.object({
  email: yup.string().email()
    .required("Please enter email address"),
});

type LoginType = yup.InferType<typeof loginSchema>;

export default function ForgotPassword()
{
  const form = useForm<LoginType>({ resolver: yupResolver(loginSchema), defaultValues: { email: "" } });
  const { isPending, mutate } = useSendVerificationLink();
  const router = useRouter()

  function onSubmit(values: LoginType)
  {
    mutate({
      email: values.email,
      // isResetting: true
    },{
      onSuccess(data)
      {
      router.push(`/auth/email-sent?email=${values.email}`)
        
      },
    });

  }
  console.log(form.formState.errors);

  return (
    <div className="w-full centered p-4 md:p-8 lg:p-12 h-auto border-none shadow-none">
    <Card className="w-full md:w-[70%] lg:w-[45%]  sm:min-w-ful lg:min-w-[540px p-0 md:p-5 md:px-4">
				<Flex className="justify-start w-full">
					<Link className="" href="/">
						<Image className="p-4" src="/dokto-logo.svg" alt="" width={129.17} height={50} />
					</Link>
				</Flex>

        <CardHeader className="text-center">
        
          <CardTitle className="text-2xl font-semibold tracking-tight text-left md:text-center">
            Forgot your Password
          </CardTitle>
          <CardDescription className="text-left md:text-center text-[#b0b7bf]">
            Enter your email address below and press the send password reset link button to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-secondary-foreground">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="mikey@agrilif.org" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <p className="text-[10px] md:text-[13px] text-left md:text-center text-[#b0b7bf]">Note: This only applies to Users who have created a Dokto account.</p>

              <Button isLoading={isPending} disabled={isPending} className="w-full tracking-[0.5%] rounded-[30px] bg-primary">Send Password Reset Link </Button>
            </form>
          </Form>

          <Flex className="mt-6 w-full justify-center">
            <Paragraph className="text-[10px] md:text-[12px] text-left md:text-center text-[#b0b7bf]">Remember your password? Go back to
            {/* <Link className="hidden md:flex" href="/auth/signup">
              <Paragraph className="text-primary">Sign up</Paragraph>
            </Link> */}
            {/* <Paragraph className="hidden md:flex">page</Paragraph> */}
            <Link href="/auth/login">
            <span  className="md:hidde text-primary  no-underline ml-[3px]">Login into your account</span>
            </Link></Paragraph>
          </Flex>

        

        </CardContent>

      </Card>
    </div>

  );
}
