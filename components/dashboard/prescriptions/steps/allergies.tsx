import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Paragraph from "@/components/ui/typography/paragraph";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { usePrescriptionRefill } from "../context";
import { RefillStepsProps } from "./types";

export function Allergies({ setStep }: RefillStepsProps) {
  const [showForm, setShowForm] = React.useState(false);
  const { value, setValue } = usePrescriptionRefill();

  return (
    <>
      {showForm ? (
        <AllergiesForm setShowForm={setShowForm} setStep={setStep} />
      ) : (
        <>
          <div className="space-y-2">
            <header className="text-text text-sm">
              Do you have any allergy
            </header>
            <Paragraph className="text-text-subtle text-sm">
              An allergy is where your body reacts to something that's normally
              harmless like pollen, dust or animal fur. The symptoms can be
              mild, but for some people they can be very serious.
            </Paragraph>
          </div>

          <div className="w-full flex mt-5 md:mt-12 gap-3 md:gap-5 *:w-full max-w-md ml-auto">
            <Button
              variant={"outline"}
              onClick={() => {
                setValue({ ...value, allergies: [] });
                setStep((prev) => prev + 1);
              }}
            >
              I don’t
            </Button>
            <Button onClick={() => setShowForm(true)}>Yes, I do</Button>
          </div>
        </>
      )}
    </>
  );
}

const formSchema = z.object({
  allergies: z.array(
    z.object({
      item: z.string().min(2, { message: "Please enter an allergy" }),
    })
  ),
});

type FormValues = z.infer<typeof formSchema>;

function AllergiesForm({
  setShowForm,
  setStep,
}: {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { value, setValue } = usePrescriptionRefill();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      allergies:
        value.allergies.length !== 0
          ? value.allergies.map((allergy) => ({
              item: allergy,
            }))
          : [{ item: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "allergies",
    control,
  });

  function onSubmit(data: FormValues) {
    console.log(data);

    const allergies = data.allergies.map((allergy) => {
      return allergy.item;
    });

    setValue({ ...value, allergies: allergies });
    setStep((prev) => prev + 1);
    setShowForm(false);
  }

  return (
    <>
      <Paragraph className="mb-2 text-text-subtle text-sm">
        Input the list of allergies you have in the input field below
      </Paragraph>

      <form onSubmit={handleSubmit(onSubmit)}>
        <ul className="relative space-y-4">
          {fields.map((item, index) => (
            <li className="space-y-2 flex-col flex" key={item.id}>
              <Input
                {...register(`allergies.${index}.item`)}
                placeholder="Enter Allergy"
                autoFocus={index === 0}
              />

              <div className="flex items-center justify-between">
                <Paragraph className="text-xs text-error">
                  {errors?.allergies?.[index]?.item?.message ?? null}
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

        <div className="w-full flex mt-5 md:mt-12  *:w-44">
          <Button className="ml-auto" type="submit">
            Next
          </Button>
        </div>
      </form>
    </>
  );
}
