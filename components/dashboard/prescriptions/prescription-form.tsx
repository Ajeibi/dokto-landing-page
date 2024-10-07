"use client";

import { Icons } from "@/components/icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import Paragraph from "@/components/ui/typography/paragraph";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormEvent, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { PrescriptionPreview } from "./prescription-preview";

const prescriptionFormSchema = yup.object().shape({
  patientAllergies: yup.string().required("Enter the allergies being treated"),
  doctorNote: yup.string().required("Enter your note"),
  drug: yup.array().of(
    yup.object({
      name: yup.string().required("Enter name of drug"),
      duration: yup.string().required("Enter duration for this drug"),
      dosage: yup.string().required("Enter dosage for this drug"),
      id: yup.string(),
    })
  ),
  pharmacyName: yup.string().required("Enter name of pharmacy"),
  pharmacyAddress: yup.string().required("Enter address of pharmacy"),
  pharmacyNumber: yup.string().required("Enter phone number of pharmacy"),
});

export type PrescriptionData = yup.InferType<typeof prescriptionFormSchema>;

export function PrescriptionForm() {
  const [newDrugAdded, setNewDrugAdded] = useState<boolean>(false);
  const [drugDosage, setDrugDosage] = useState<string[]>([""]);
  const [showForm, setShowForm] = useState<boolean>(true);
  const [prescription, setPrescription] = useState<PrescriptionData>({
    patientAllergies: "",
    doctorNote: "",
    drug: [{ name: "", duration: "", dosage: "" }],
    pharmacyName: "",
    pharmacyAddress: "",
    pharmacyNumber: "",
  });

  const defaultValues: PrescriptionData = prescription;

  const form = useForm<PrescriptionData>({
    resolver: yupResolver(prescriptionFormSchema),
    defaultValues,
    mode: "all",
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    register,
  } = form;

  const { fields, append, remove } = useFieldArray({ control, name: "drug" });

  const addDrug = (e: FormEvent) => {
    e.preventDefault();
    setNewDrugAdded(true);
    append({ name: "", dosage: "", duration: "" });
  };

  const selectDosage = (dosage: string, index: number) => {
    const currentDosage = drugDosage;
    currentDosage[index] = dosage;
    setDrugDosage(currentDosage);
  };

  const onSubmit = async (values: PrescriptionData) => {
    const sortedDrugs = values.drug?.map((item, index) => ({
      name: item.name,
      duration: item.duration,
      dosage: drugDosage[index],
    }));

    const prescriptionData: PrescriptionData = {
      ...values,
      drug: sortedDrugs,
    };

    setPrescription(prescriptionData);
    setShowForm(false);
  };

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

  return (
    <>
      {showForm ? (
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1" className="mt-5">
                <AccordionTrigger className="text-[#4F5E71CC] text-xs font-medium">
                  Doctors Note & Patient Allergies
                </AccordionTrigger>

                <AccordionContent>
                  <Paragraph className="text-sm my-5 text-[#4F5E71CC]">
                    Attach a note for this patient below and their allergies
                    below.
                  </Paragraph>

                  <div className="space-y-4">
                    <FormField
                      control={control}
                      name="patientAllergies"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#4F5E71CC] text-sm font-normal">
                            Patient Allergies
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Input Allergies Here"
                              error={errors.patientAllergies?.message}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name="doctorNote"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#4F5E71CC] text-sm font-normal">
                            Doctors Note
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Input Your Note Here"
                              error={errors.doctorNote?.message}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="mt-5">
                <AccordionTrigger className="text-[#4F5E71CC] text-xs font-medium">
                  Input Medications
                </AccordionTrigger>

                <AccordionContent className="w-full">
                  <Paragraph className="text-sm mb-5 text-[#4F5E71CC]">
                    Type in the drugs you are prescribing for this patient, and
                    click on the drug to add it to their list{" "}
                  </Paragraph>

                  <div className="space-y-2">
                    <Label className="text-[#4F5E71CC] text-sm font-normal">
                      List of Drugs
                    </Label>
                    {fields.map((option, index) => (
                      <div
                        key={`${option.name}-${option.id}`}
                        className="space-y-2"
                      >
                        <FormField
                          control={control}
                          name={`drug.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...register(`drug.${index}.name` as const, {
                                    required: true,
                                  })}
                                  placeholder="Name of drug"
                                  error={errors?.drug?.[index]?.name?.message}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name={`drug.${index}.duration`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Select
                                  onChange={field.onChange}
                                  value={field.value}
                                  placeholder="Duration"
                                  options={durationsOptions}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <div className="flex gap-3">
                          <Button
                            variant={"outline"}
                            onClick={() => selectDosage("morning", index)}
                            className={`rounded-md ${
                              drugDosage[index] === "morning"
                                ? "bg-[#2CACDA] text-black"
                                : "bg-white"
                            }`}
                          >
                            Morning Dosage
                          </Button>
                          <Button
                            variant={"outline"}
                            onClick={() => selectDosage("afternoon", index)}
                            className={`rounded-md ${
                              drugDosage[index] === "afternoon"
                                ? "bg-[#2CACDA] text-black"
                                : "bg-white"
                            }`}
                          >
                            Afternoon Dosage
                          </Button>
                          <Button
                            variant={"outline"}
                            onClick={() => selectDosage("evening", index)}
                            className={`rounded-md ${
                              drugDosage[index] === "evening"
                                ? "bg-[#2CACDA] text-black"
                                : "bg-white"
                            }`}
                          >
                            Evening Dosage
                          </Button>
                        </div>

                        <div className="text-right">
                          {newDrugAdded ? (
                            <div className="space-x-3">
                              <Button
                                variant={"ghost"}
                                size={"icon"}
                                onClick={() => remove(index)}
                                className="py-0 px-0 w-auto h-auto"
                              >
                                <Icons.minusIcon />
                              </Button>

                              {index > 0 && (
                                <Button
                                  variant={"ghost"}
                                  size={"icon"}
                                  onClick={addDrug}
                                  className="py-0 px-0 w-auto h-auto"
                                >
                                  <Icons.plusIcon />
                                </Button>
                              )}
                            </div>
                          ) : (
                            <Button
                              variant={"ghost"}
                              size={"icon"}
                              onClick={addDrug}
                              className="py-0 w-auto h-auto"
                            >
                              <Icons.plusIcon />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="mt-5">
                <AccordionTrigger className="text-[#4F5E71CC] text-xs font-medium">
                  Input Medications
                </AccordionTrigger>

                <AccordionContent>
                  <Paragraph className="text-sm my-5 text-[#4F5E71CC]">
                    Type in the drugs you are prescribing for this patient, and
                    click on the drug to add it to their list{" "}
                  </Paragraph>

                  <Paragraph className="text-sm mb-5 text-[#4F5E71CC]">
                    Enter the name and address of the preferred pharmacy for
                    this user.
                  </Paragraph>

                  <div className="space-y-4 mb-9">
                    <FormField
                      control={control}
                      name="pharmacyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Pharmacy Name"
                              error={errors.pharmacyName?.message}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name="pharmacyAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Pharmacy Address"
                              error={errors.pharmacyAddress?.message}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name="pharmacyNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Fax / Telephone Number"
                              error={errors.pharmacyNumber?.message}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Button className="w-full" disabled={!isValid}>
              Preview and Send
            </Button>
          </form>
        </Form>
      ) : (
        <PrescriptionPreview
          showForm={() => setShowForm(true)}
          data={prescription}
        />
      )}
    </>
  );
}
