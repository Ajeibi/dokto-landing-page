import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Paragraph from "@/components/ui/typography/paragraph";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { usePrescriptionRefill } from "../context";
import { defaultMedicalHistory } from "../data";
import { RefillStepsProps } from "./types";

const formSchema = z.object({
  medicalHistory: z.array(
    z.object({
      item: z
        .string({ required_error: "Please enter a medical history" })
        .optional(),
    })
  ),
});

type FormValues = z.infer<typeof formSchema>;

export function PastMedicalHistory({ setStep }: RefillStepsProps) {
  const { value, setValue } = usePrescriptionRefill();
  const [defaultConditions, setDefaultConditions] = React.useState(
    defaultMedicalHistory
  );

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      medicalHistory: [{ item: undefined }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "medicalHistory",
    control,
  });

  function onSubmit(data: FormValues) {
    console.log(data);
    console.log(defaultConditions);

    const defaults = defaultConditions
      .filter((item) => item.checked === true)
      .map((item) => item.item);

    // filter out any items that are not strings
    const fromData = data.medicalHistory
      ?.filter(
        (item): item is { item: string } =>
          typeof item.item === "string" && item.item.length > 0
      )
      .map((item) => item.item);

    const payload = [...defaults, ...fromData];

    setValue({ ...value, pastMedicalHistory: payload });
    setStep((prev) => prev + 1);
  }

  return (
    <section className="space-y-5 md:space-y-7">
      <div className="space-y-2.5 md:space-y-3">
        {defaultConditions.map((item, index) => (
          <React.Fragment key={item.item}>
            <div className="flex items-center justify-between">
              <Paragraph className="text-text text-sm">{item.item}</Paragraph>
              <Checkbox
                checked={item.checked}
                onCheckedChange={() => {
                  setDefaultConditions([
                    ...defaultConditions.slice(0, index),
                    { ...item, checked: !item.checked },
                    ...defaultConditions.slice(index + 1),
                  ]);
                }}
                className="rounded-md w-5 h-5"
              />
            </div>

            {index < defaultMedicalHistory.length - 1 ? <Separator /> : null}
          </React.Fragment>
        ))}
      </div>

      <div>
        <Paragraph className="mb-2 text-text-subtle text-sm">
          Input other medical conditions / surgical history you have had
        </Paragraph>

        <form onSubmit={handleSubmit(onSubmit)}>
          <ul className="relative space-y-4">
            {fields.map((item, index) => (
              <li key={item.id} className="space-y-2 flex-col flex">
                <Input
                  {...register(`medicalHistory.${index}.item`)}
                  placeholder="Enter other medical condition"
                  autoFocus={false}
                />

                <div className="flex items-center justify-between">
                  <Paragraph className="text-xs text-error">
                    {errors.medicalHistory?.[index]?.item?.message ?? null}
                  </Paragraph>

                  <div className="gap-4 flex items-center">
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
                      onClick={() => append({ item: "" })}
                    >
                      <Icons.plusIcon />
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="w-full flex mt-5 md:mt-12 gap-3 md:gap-5 *:w-full max-w-md ml-auto">
            <Button
              className="ml-auto"
              variant={"outline"}
              type="button"
              onClick={() => {
                setValue({ ...value, pastMedicalHistory: [] });
                setStep((prev) => prev + 1);
              }}
            >
              None
            </Button>
            <Button className="ml-auto" type="submit">
              Next
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
