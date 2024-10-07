import { useGetDrugs } from "@/api/dashboard/prescription/get-drugs";
import { Icons } from "@/components/icons";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select } from "@/components/ui/select";
import { SelectInput } from "@/components/ui/select-input";
import Paragraph from "@/components/ui/typography/paragraph";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { usePrescriptionRefill } from "../context";
import { RefillStepsProps } from "./types";

const formSchema = z.object({
  drugList: z.array(
    z.object({
      name: z.string().min(2, { message: "Please enter medication name" }),
      duration: z
        .string({ required_error: "Please select duration" })
        .min(1, { message: "Please select duration" }),
    })
  ),
});

const durationsOptions = [
  {
    label: "30 Days",
    value: "30",
  },
  {
    label: "60 Days",
    value: "60",
  },
  {
    label: "90 Days",
    value: "90",
  },
];

type FormValues = z.infer<typeof formSchema>;

export function Medication({ setStep }: RefillStepsProps) {
  const { drugs, isLoading } = useGetDrugs();

  const { value, setValue } = usePrescriptionRefill();
  const [drugList, setDrugList] = React.useState<
    {
      label: string;
      value: string;
    }[]
  >(drugs);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      drugList:
        value.medications.length !== 0
          ? value.medications.map((m) => ({
              name: m.name,
              duration: m.duration,
            }))
          : [{ name: "", duration: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "drugList",
    control: form.control,
  });

  function onSubmit(data: FormValues) {
    const list = data.drugList.map((item) => {
      return item;
    });

    setValue({ ...value, medications: list });
    setStep((prev) => prev + 1);
  }

  function handleAddNewDrug(drug: string) {
    setDrugList((prevDrugList) => [
      ...prevDrugList,
      { label: drug, value: drug },
    ]);
  }

  useEffect(() => {
    if (drugs && drugList.length === 0) {
      setDrugList(drugs);
    }
  }, [drugs]);

  if (isLoading || !drugs) return <Loading />;

  return (
    <section className="flex flex-col">
      <Paragraph className="mb-5 md:mb-7 text-text-subtle text-sm">
        State the medications you want to get below and provide all the
        necessary information required here
      </Paragraph>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ul className="relative space-y-4">
            {fields.map((item, index) => (
              <li key={item.id} className="gap-2 flex-col flex w-full">
                <div className="space-y-2 w-full relative">
                  <FormField
                    control={form.control}
                    name={`drugList.${index}.name` as const}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Drug Name</FormLabel>
                        <FormControl>
                          <SelectInput
                            options={drugList}
                            {...field}
                            placeholder="Select Drug"
                            key={index + Math.random()}
                            handleAddNewOption={handleAddNewDrug}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-1 w-full">
                  <FormField
                    control={form.control}
                    name={`drugList.${index}.duration` as const}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <FormControl>
                          <Select
                            options={durationsOptions}
                            {...field}
                            placeholder="Number of days"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex ">
                  <div className="gap-4 ml-auto flex items-center">
                    {index > 0 ? (
                      <Button
                        variant={"ghost"}
                        className="p-0"
                        type="button"
                        onClick={() => remove(index)}
                      >
                        <Icons.minusIcon />
                      </Button>
                    ) : null}
                    <Button
                      variant={"ghost"}
                      className="p-0"
                      type="button"
                      onClick={() => append({ name: "", duration: "" })}
                    >
                      <Icons.plusIcon />
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="w-full flex mt-5 md:mt-12  *:w-44">
            <Button className="ml-auto" type="submit">
              Next
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
