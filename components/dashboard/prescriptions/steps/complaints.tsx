import React from "react";
import { RefillStepsProps } from "./types";
import Paragraph from "@/components/ui/typography/paragraph";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { usePrescriptionRefill } from "../context";

const formSchema = z.object({
  complaints: z
    .string({ required_error: "Complaints are required" })
    .min(2, { message: "Complaints are required" }),
});

export function Complaints({ setStep }: RefillStepsProps) {
  const { value, setValue } = usePrescriptionRefill();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      complaints: value.complaints,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    setValue({
      ...value,
      complaints: values.complaints ? values.complaints : "",
    });
    setStep((prev) => prev + 1);
  }

  return (
    <>
      <Paragraph className="mb-5 md:mb-7 text-text-subtle text-sm">
        In order to process your medications, Provide the reasons why you will
        be needing this medications.
      </Paragraph>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col"
        >
          <FormField
            control={form.control}
            name="complaints"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-text-sec">
                  Explain reasons you need this medication
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Input Complaints Here"
                    {...field}
                    className="h-36"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-44 ml-auto mt-5 md:mt-12">
            Next
          </Button>
        </form>
      </Form>
    </>
  );
}
