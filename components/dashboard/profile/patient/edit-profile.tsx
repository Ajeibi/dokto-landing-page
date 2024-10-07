"use client";

import {
  EditProfilePayload,
  useEditProfile,
} from "@/api/dashboard/profile/edit-profile";
import { useUploadImage } from "@/api/upload-image";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select } from "@/components/ui/select";
import Paragraph from "@/components/ui/typography/paragraph";
import { useMediaQuery } from "@/hooks/use-media-query";
import { DialogProps } from "@/lib/generic-types";
import { showSuccess } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  firstName: z.string({
    required_error: "First Name is required",
    message: "Please enter a valid First Name",
  }),
  middleName: z
    .string({
      required_error: "Middle Name is required",
      message: "Please enter a valid Middle Name",
    })
    .optional(),
  lastName: z.string({
    required_error: "Last Name is required",
    message: "Please enter a valid Last Name",
  }),
  dateOfBirth: z.string({
    required_error: "Date of Birth is required",
    message: "Please enter a valid Date of Birth",
  }),
  sex: z.string({
    required_error: "Sex is required",
    message: "Please enter a valid Sex",
  }),
  location: z.object({
    apartmentNo: z.string({
      required_error: "Apartment No is required",
      message: "Please enter a valid Apartment No",
    }),
    streetName: z.string({
      required_error: "Street Name is required",
      message: "Please enter a valid Street Name",
    }),
    city: z.string({
      required_error: "City is required",
      message: "Please enter a valid City",
    }),
    zipCode: z.string({
      required_error: "Zip Code is required",
      message: "Please enter a valid Zip Code",
    }),
    state: z.string({ required_error: "Please enter a valid State" }),
  }),
  phone: z.string({ required_error: "Please enter a valid Phone Number" }),
  email: z
    .string({ required_error: "Please enter a valid Email Address" })
    .email({ message: "Please enter a valid Email Address" }),
  allergies: z.array(
    z.string({ required_error: "Please enter a valid Allergy" }).optional()
  ),
  profilePic: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
    .optional(),
});

const sexOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

type FormType = z.infer<typeof formSchema>;

type TDefaultValues = FormType & {
  allergies?: string[];
  profilePhoto?: string;
};

export function EditPatientProfileModal({
  open,
  onOpenChange,
  data,
}: DialogProps<TDefaultValues>) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="px-0 max-w-xl">
          <DialogHeader className="mb-6 px-4 md:px-6 lg:px-10">
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <EditProfileForm props={data} onOpenChange={onOpenChange} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} dismissible={false}>
      <DrawerContent
        className="h-[calc(100%-73px)]"
        showDragLine={false}
        showOverlay={false}
      >
        <ScrollArea className="h-full">
          <DrawerHeader className="relative  mb-6">
            <DrawerTitle className="text-left text-text">
              Edit Profile
            </DrawerTitle>
            <div
              className="absolute top-3 right-4 ring-1 ring-text rounded-md w-5 h-5 grid place-items-center p-0.5"
              onClick={() => onOpenChange(false)}
            >
              <XIcon className="w-3 h-3" />
            </div>
          </DrawerHeader>
          <EditProfileForm props={data} onOpenChange={onOpenChange} />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}

function EditProfileForm({
  onOpenChange,
  props,
}: {
  props: TDefaultValues | undefined;
  onOpenChange: (open: boolean) => void;
}) {
  const [selectedImage, setSelectedImage] = React.useState<
    File | undefined | null
  >(null);

  const { mutateAsync: uploadImage, isPending: isUploading } = useUploadImage();
  const { mutateAsync: editProfile, isPending } = useEditProfile();

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...props,
      allergies:
        props?.allergies && props?.allergies.length > 0
          ? props?.allergies
          : [" "],
      middleName: props?.middleName ?? "",
      location: {
        state: props?.location.state ?? undefined,
        city: props?.location.city ?? undefined,
        streetName: props?.location.streetName ?? undefined,
        apartmentNo: props?.location.apartmentNo ?? undefined,
        zipCode: props?.location.zipCode ?? undefined,
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "allergies",
  });

  async function handleEditProfile(data: FormType) {
    let imageUrl = "";

    if (selectedImage) {
      const formData = new FormData();

      formData.append("image", selectedImage);

      await uploadImage(formData).then((res) => {
        showSuccess(res.message);
        imageUrl = res.data.url;
      });
    }

    const payload: EditProfilePayload = {
      firstName: data.firstName ?? "",
      lastName: data.lastName ?? "",
      middleName: data.middleName ?? "",
      dob: data.dateOfBirth ?? "",
      sex: data.sex ?? "",
      allergies:
        data.allergies?.filter(
          (allergy): allergy is string =>
            typeof allergy === "string" &&
            allergy.trim().length > 1 &&
            allergy !== " "
        ) ?? [],
      profilePhoto: imageUrl === "" ? data.profilePic : imageUrl,
      location: data.location ?? {},
    };

    await editProfile(payload).then(() => {
      onOpenChange(false);
    });
  }

  return (
    <Form {...form}>
      <form
        className="px-4 md:px-10 flex flex-col gap-9 md:gap-10"
        onSubmit={form.handleSubmit(handleEditProfile)}
      >
        <div className="space-y-4 md:space-y-5">
          <header className="text-sm text-text">Personal Information</header>

          <div className="flex items-center gap-5">
            <div className="w-16 h-16 md:w-20 md:h-20 relative">
              {props?.profilePhoto && !selectedImage ? (
                <Image
                  src={props?.profilePhoto}
                  alt="current"
                  fill
                  className="object-cover"
                />
              ) : selectedImage ? (
                <Image
                  src={URL.createObjectURL(selectedImage)}
                  alt="selectedImage"
                  fill
                  className="object-cover"
                />
              ) : (
                <Icons.user className="w-full h-full" />
              )}
            </div>
            <FormField
              control={form.control}
              name="profilePic"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center w-full gap-5">
                      <Button type="button" className="rounded-sm h-10" asChild>
                        <label htmlFor="file">
                          <input
                            type="file"
                            id="file"
                            className="hidden"
                            onBlur={field.onBlur}
                            name={field.name}
                            onChange={(e) => {
                              field.onChange(e.target.files);
                              setSelectedImage(e.target.files?.[0]);
                            }}
                            ref={field.ref}
                          />
                          Change Picture
                        </label>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4 md:space-y-5">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="middleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middle Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Middle Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input placeholder="Date of Birth" {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sex</FormLabel>
                  <FormControl>
                    <Select options={sexOptions} {...field} placeholder="Sex" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4 md:space-y-5">
          <header className="text-sm text-text">Location</header>

          <div className="space-y-4 md:space-y-5">
            <FormField
              control={form.control}
              name="location.apartmentNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apartment No</FormLabel>
                  <FormControl>
                    <Input placeholder="Apartment No" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location.streetName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Street Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location.zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input placeholder="123456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location.state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4 md:space-y-5">
          <header className="text-sm text-text">Contacts</header>

          <div className="space-y-4 md:space-y-5">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Email Address" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4 md:space-y-5">
          <header className="text-sm text-text">Allergies</header>

          <ul className="relative space-y-4">
            {fields.map((item, index) => (
              <li className="space-y-2 flex-col flex" key={item.id}>
                <Input
                  {...form.register(`allergies.${index}`)}
                  placeholder="Enter Allergy"
                  autoFocus={false}
                />

                <div className="flex items-center justify-between">
                  <Paragraph className="text-xs text-error">
                    {form.formState.errors?.allergies?.[index]?.message ?? null}
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
                      onClick={() => append("")}
                    >
                      <Icons.plusIcon />
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <Button
          type="submit"
          className="ml-auto w-44 mt-5"
          isLoading={isPending || isUploading}
        >
          Save
        </Button>
      </form>
    </Form>
  );
}
