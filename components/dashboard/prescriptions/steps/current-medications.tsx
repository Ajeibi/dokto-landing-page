import React from "react";
import { RefillStepsProps } from "./types";
import { z } from "zod";
import { usePrescriptionRefill } from "../context";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Paragraph from "@/components/ui/typography/paragraph";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

const formSchema = z.object({
  medications: z.array(
    z.object({
      item: z
        .string()
        .min(2, { message: "Please enter any current medications" }),
    })
  ),
});

type FormValues = z.infer<typeof formSchema>;

export function CurrentMedications({ setStep }: RefillStepsProps) {
  const { value, setValue } = usePrescriptionRefill();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      medications:
        value.currentMedications.length !== 0
          ? value.currentMedications.map((m) => ({
              item: m,
            }))
          : [{ item: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "medications",
    control,
  });

  function onSubmit(data: FormValues) {
    console.log(data);

    const medications = data.medications.map((medication) => {
      return medication.item;
    });

    setValue({ ...value, currentMedications: medications });
    setStep((prev) => prev + 1);
  }

  return (
    <>
      <Paragraph className="mb-2 text-text-subtle text-sm">
        Input the list of your current medication in the text box below
      </Paragraph>

      <form onSubmit={handleSubmit(onSubmit)}>
        <ul className="relative space-y-4">
          {fields.map((item, index) => (
            <li key={item.id} className="space-y-2 flex-col flex">
              <Input
                {...register(`medications.${index}.item`)}
                placeholder="Paracetamol"
                autoFocus={index === 0}
              />

              <div className="flex items-center justify-between">
                <Paragraph className="text-xs text-error">
                  {errors?.medications?.[index]?.item?.message ?? null}
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
              setValue({ ...value, currentMedications: [] });
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
    </>
  );
}
