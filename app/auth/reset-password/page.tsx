"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { useResetPassword } from "@/api/auth/reset-password";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter, useSearchParams } from "next/navigation";
import * as yup from "yup";
import { Flex } from "@/components/ui/flex";
import Link from "next/link";
import Image from "next/image";

const schema = yup.object({
  password: yup.string().required("Please enter password"),
   confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match")
    .required("Confirm password is required")
});

type FormValues = yup.InferType<typeof schema>;

export default function ResetPassword () {
  const form = useForm<FormValues>({ resolver: yupResolver(schema), defaultValues: { password: "", confirmPassword: "" } });
  const { isPending, mutateAsync: resetPassword } = useResetPassword();
  const router = useRouter();
  const searchParams = useSearchParams();
  const otpId = searchParams.get("code");
  const emailAddress = searchParams.get("email");

  console.log(otpId, "-->");
  

  async function onSubmit (data: FormValues) {
    try {
      await resetPassword({otp: otpId as string, ...data });
      router.push("/auth/login");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Card className="w-full flex justify-center items-center border-none shadow-none">
      <div className="w-[90%]  md:w-[70%] lg:w-[40%] flex flex-col justify-center items-center mt-[40px] md:mt-[50px]">

				<Flex className="justify-start w-full">
					<Link className="" href="/">
						<Image className="pl-4" src="/dokto-logo.svg" alt="" width={129.17} height={50} />
					</Link>
				</Flex>

        <CardHeader className="text-centerw-full">
        <CardTitle className="text-2xl font-semibold tracking-tight text-center">
          Set New Password

          {/* <p className="text-[11px] md:[13px] text-[#bdbfc1]">Reset your account password by entering a new password in the fields below and pressing the "Reset Password" button when finished.</p> */}
        </CardTitle>
        <CardDescription className="text-[11px] md:text-sm text-muted-foreground text-center text-[#4F5E71CC]">
        Reset your account password by entering a new password in the fields below and pressing the "Reset Password" button when finished.
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary-foreground">New Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter new password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary-foreground">Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter password again" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button isLoading={isPending} disabled={isPending} className="w-full rounded-[40px] ">Reset Password</Button>
          </form>
        </Form>

      </CardContent>
    </div>

    </Card>

  );
}
