"use client";

import { useLogIn } from "@/api/auth/login";
import GoogleSignIn from "@/components/auth/google";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Flex } from "@/components/ui/flex";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, PasswordInput } from "@/components/ui/input";
import Paragraph from "@/components/ui/typography/paragraph";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const loginSchema = yup.object({
  email: yup.string().email().required("Please enter email address"),
  password: yup.string().required("Please enter password"),
});

type LoginType = yup.InferType<typeof loginSchema>;

export default function LoginPage() {
  const form = useForm<LoginType>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  const { isPending, mutate: loginUser } = useLogIn();

  function onSubmit(data: LoginType) {
    loginUser(data);
  }

  return (
    <div className="w-full centered p-4 md:p-8 lg:p-12 h-auto">
      <Card className="w-full border-none shadow-none md:max-w-[520px]  sm:min-w-full lg:min-w-[540px] lg:max-w-[550px] p-0 md:p-5 md:px-4">
        <Flex className="justify-start w-full">
          <Link className="" href="/">
            <Image
              className="p-4"
              src="/dokto-logo.svg"
              alt=""
              width={129.17}
              height={50}
            />
          </Link>
        </Flex>

        <CardContent className=" space-y-4">
          <Paragraph className="w-full text-center">
            Sign in to your account.
          </Paragraph>

          <GoogleSignIn />

          <div className="w-full flex justify-between items-center  p-">
            <hr className="w-[45%] border-[1px] border-[#e7e6e8]" />
            <h6 className="text-[12px] md:text-[14px] text-[#000000]">or</h6>
            <hr className="w-[45%] border-[1px] border-[#e7e6e8]" />
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Flex className="justify-end">
                <Link href="/auth/forgot-password">
                  <Paragraph className="text-sm text-primary mt-[7px]">
                    Forgot Password?
                  </Paragraph>
                </Link>
              </Flex>

              <Flex gap={2} className="mt-6 w-full centered">
                <Paragraph className="text-[11px] md:text-[13px] text-justify mb-[10px]">
                  By clicking "Continue", you are agreeing to the Dokto
                  <Link href="/auth/signup">
                    <span className="text-primary">
                      Terms of Service, Privacy Policy  & Dokto Consent Policy
                    </span>
                  </Link>
                </Paragraph>
              </Flex>

              <Button
                isLoading={isPending}
                disabled={isPending}
                className="w-full rounded-[25px]"
              >
                Continue
              </Button>

              <Flex gap={2} className="mt-6 w-full centered">
                <Paragraph className="text-[11px] md:text-[13px] text-justify mb-[10px]">
                  Don’t have an account?
                  <Link href="/auth/signup">
                    <span className="text-primary"> Create an account</span>
                  </Link>
                </Paragraph>
              </Flex>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
