import React from "react";
import { RefillStepsProps } from "./types";
import Paragraph from "@/components/ui/typography/paragraph";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePrescriptionRefill } from "../context";

const formSchema = z.object({
  dokto_pharmacyName: z
    .string({ required_error: "Please enter pharmacy name" })
    .min(3, { message: "Pharmacy name is required" }),
  dokto_pharmacyAddress: z
    .string({ required_error: "Please enter pharmacy address" })
    .min(3, { message: "Pharmacy address is required" }),
  dokto_pharmacyPhone: z
    .string({ required_error: "Please enter pharmacy fax or phone" })
    .min(3, { message: "Pharmacy fax or phone is required" }),
});

type FormType = z.infer<typeof formSchema>;

export function PharmacyInfo({ setStep }: RefillStepsProps) {
  const { value, setValue } = usePrescriptionRefill();

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dokto_pharmacyName: value.pharmacyInfo.name,
      dokto_pharmacyAddress: value.pharmacyInfo.address,
      dokto_pharmacyPhone: value.pharmacyInfo.phone,
    },
  });

  function onSubmit(data: FormType) {
    setValue({
      ...value,
      pharmacyInfo: {
        name: data.dokto_pharmacyName || "",
        address: data.dokto_pharmacyAddress || "",
        phone: data.dokto_pharmacyPhone || "",
      },
    });
    setStep((prev) => prev + 1);
  }

  return (
    <>
      <Paragraph className="mb-5 md:mb-7 text-text-subtle text-sm">
        Enter the name and address of your preferred pharmacy.
      </Paragraph>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 md:space-y-6 flex flex-col"
        >
          <FormField
            control={form.control}
            name="dokto_pharmacyName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Pharmacy Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dokto_pharmacyAddress"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Pharmacy Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dokto_pharmacyPhone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Fax / Telephone Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="ml-auto w-44">
            Preview
          </Button>
        </form>
      </Form>
    </>
  );
}
