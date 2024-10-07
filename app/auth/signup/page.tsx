"use client";

import { useSignUp } from "@/api/auth/signup";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Select } from "@/components/ui/select";
import { notify } from "@/components/ui/toast";
import Paragraph from "@/components/ui/typography/paragraph";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInputWithCountrySelect, {
  type Value,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import * as yup from "yup";
import "./styles.css";
import GoogleSignIn from "@/components/auth/google";

const signUpSchema = yup.object({
  firstName: yup.string().required("Please enter first name"),
  lastName: yup.string().required("Please enter last name"),
  email: yup
    .string()
    .email()
    .required("Please enter email address")
    .matches(
      /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
      "Email must have a valid domain"
    ),
  phone: yup.string().required("Phone Number is required"),
  dob: yup.string().required("Date of Birth is required"),
  sex: yup
    .string()
    .oneOf(["male", "female", "others"], "Invalid sex")
    .required("Sex is required"),
  role: yup
    .string()
    .oneOf(["patient", "doctor"], "Invalid role")
    .required("Role is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

type SignUpType = yup.InferType<typeof signUpSchema>;

export default function SignUpPage() {
  const { isPending, mutate } = useSignUp();
  const [hasAgreed, setHasAgreed] = useState<boolean>(false);

  const form = useForm<SignUpType>({
    resolver: yupResolver(signUpSchema),
  });

  function onSubmit(values: SignUpType) {
    if (!hasAgreed) return notify.error("Agree to Terms and conditions");

    console.log(values);

    const payload = {
      ...values,
      terms: true,
    };
    mutate(payload);
  }

  return (
    <div className="w-full centered p-4 md:p-8 lg:p-12 h-auto">
      <Card className="w-full md:w-[500px]  sm:min-w-full lg:min-w-[540px] lg:max-w-[550px] p-0 md:p-5 md:px-4">
        <Flex className="justify-start w-full">
          <Link href="/">
            <Image
              className="pl-4"
              src="/dokto-logo.svg"
              alt=""
              width={129.17}
              height={50}
            />
          </Link>
        </Flex>

        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Create Profile
          </CardTitle>
          <CardDescription className="text-[12px]">
            Enter your information as it appears on your health insurance or pay
            stub.
          </CardDescription>

          <GoogleSignIn />
        </CardHeader>

        <div className="w-full flex justify-between items-center  p-5">
          <hr className="w-[45%] border-[1px] border-[#e7e6e8]" />
          <h6 className="text-[12px] md:text-[14px] text-[#000000]">or</h6>
          <hr className="w-[45%] border-[1px] border-[#e7e6e8]" />
        </div>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <div className="w-full flex flex-col md:flex-row gap-3  md:justify-between">
                <div className="w-full md:w-[48%]">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Legal First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-full md:w-[48%]">
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Legal Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="mikey@agrilif.org"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem id="role">
                    <FormLabel htmlFor="state">I am Registering as</FormLabel>

                    <FormControl>
                      <Select
                        onChange={field.onChange}
                        value={field.value}
                        placeholder={"Select"}
                        options={roles}
                        label={"Select Role"}
                        className="border border-tertiary40 p-[14px] rounded-lg"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <PhoneInputWithCountrySelect
                        defaultCountry="US"
                        id="phone"
                        value={form.getValues().phone as Value}
                        onChange={(value: any) => form.setValue("phone", value)}
                        name="phone"
                        placeholder="+1 8812 888 8"
                        className="border border-tertiary40 py-[10px] px-[14px] rounded-lg hover:outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full">
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl className="w-full">
                      <Input
                        className="date-input"
                        type="date"
                        placeholder="Date"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sex"
                render={({ field }) => (
                  <FormItem id="sex">
                    <FormLabel htmlFor="state">Sex</FormLabel>

                    <FormControl>
                      <Select
                        onChange={field.onChange}
                        value={field.value}
                        placeholder={"Select"}
                        options={gender}
                        label={"Select Sex"}
                        className="border border-tertiary40 p-[14px] rounded-lg"
                      />
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
                    <FormControl className=" outline-none">
                      <PasswordInput
                        placeholder="Password"
                        {...field}
                        className=" outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Flex gap={2} className="w-full centered mt-2">
                <Checkbox
                  onClick={() => setHasAgreed(!hasAgreed)}
                  className="border-primary *:bg-primary *:text-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary rounded-sm"
                />
                <Paragraph className="font-[300] text-tertiary90 text-sm">
                  I agree to the{" "}
                  <Link className="text-primary font-bold" href={""}>
                    Terms of Service
                  </Link>{" "}
                  &{" "}
                  <Link className="text-primary font-bold" href={""}>
                    Privacy Policy
                  </Link>{" "}
                </Paragraph>
              </Flex>

              <Button
                isLoading={isPending}
                disabled={isPending}
                className="w-full mt-2 rounded-[25px] "
              >
                Proceed
              </Button>
            </form>
          </Form>

          <Flex gap={2} className="mt-6 w-full centered text-[12px]">
            <span>Already have an account?</span>
            <Link href="/auth/login">
              <Paragraph className="text-primary text-[12px]">Log in</Paragraph>
            </Link>
          </Flex>
        </CardContent>
      </Card>
    </div>
  );
}

const gender = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Others",
    value: "others",
  },
];

const roles = [
  {
    label: "Patient",
    value: "patient",
  },
  {
    label: "Doctor",
    value: "doctor",
  },
];
