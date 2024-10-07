import { useCreateAppointment } from "@/api/dashboard/appointments/create-appointment";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import Paragraph from "@/components/ui/typography/paragraph";
import { BookAppointmentDialogProps } from "@/lib/generic-types";
import { formatDate } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, Clock5Icon, ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreateAppointmentProps } from "./types";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "file/pdf",
  "application/pdf",
];

const formSchema = z.object({
  notes: z
    .string({ required_error: "Please enter notes for the doctor" })
    .min(5, {
      message:
        "Please enter what you would like the doctor to know about the appointment",
    }),
  file: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max File size is 5MB.`)
    .refine(
      (files) => ACCEPTED_TYPES.includes(files?.[0]?.type),
      "Only .pdf .jpg, .jpeg, .png and .webp formats are supported."
    )
    .optional(),
});

export function CompleteReservation({
  data,
  setStep,
  onOpenChange,
  open,
}: BookAppointmentDialogProps<CreateAppointmentProps>) {
  // const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedFile, setSelectedFile] = useState<File>();

  const { mutateAsync: uploadImage, isPending: isUploading } = useUploadImage();
  const { mutateAsync: createAppointment, isPending } = useCreateAppointment();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target.files;
  //   if (files && files.length > 0) {
  //     setSelectedFiles((prev) => [...prev, ...Array.from(files)]);
  //   }
  // };

  const handleCompleteReservation = async (
    values: z.infer<typeof formSchema>
  ) => {
    let image = "";

    if (selectedFile) {
      const formData = new FormData();

      formData.append("image", selectedFile);

      await uploadImage(formData).then((res) => {
        console.log(res.data.url);
        image = res.data.url;
      });
    }

    const payload = {
      doctorType: data?.doctorType!,
      doctorAppointmentFee: 200,
      doctorId: data?._id!,
      patientNotes: values.notes ? values.notes : " ",
      appointmentDate: data?.appointmentInfo.date!,
      appointmentTime: data?.appointmentInfo.time!,
      medicalImage: image,
      channelName: "",
    };

    console.log(payload);

    try {
      await createAppointment(payload);
    } catch (error) {
      console.error(error);
    }
    setStep("next");
    // onOpenChange(false);
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="gap-7 max-w-xl">
        <DialogHeader>
          <DialogTitle className="font-medium text-left text-base text-text ">
            Complete Reservation
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center gap-3 lg:gap-4 h-16 lg:h-[6.25rem]">
            <div className="w-16 h-16 lg:w-[6.25rem] lg:h-[6.25rem] relative">
              {data?.personalInfo.imgUrl ? (
                <Image src={data?.personalInfo.imgUrl} alt="doctor" fill />
              ) : (
                <ImageIcon className="w-full h-full" />
              )}
            </div>

            <div className="flex flex-col justify-between h-full">
              <Paragraph className="font-medium text-sm capitalize text-text lg:text-base">
                {data?.personalInfo.firstName} {data?.personalInfo.lastName}
              </Paragraph>

              <div>
                <Paragraph className="font-medium text-xs lg:text-sm">
                  {data?.doctorType}
                </Paragraph>

                <div className="flex items-center">
                  <Icons.stars />
                  <span className="text-text-sec font-normal text-xs lg:text-sm">
                    {data?.rating} Reviews
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2 lg:space-y-4">
            <header className="text-xs lg:text-sm font-medium text-text-sec">
              Appointment Information
            </header>

            <div className="flex items-center gap-6 *:text-xs *:lg:text-sm *:font-normal *:text-text-sec">
              <div className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4 lg:w-5 lg:h-5" />
                {formatDate(`${data?.appointmentInfo.date}`)}
              </div>
              <div className="flex items-center gap-1">
                <Clock5Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                {data?.appointmentInfo.time}
              </div>
            </div>
          </div>

          <Separator />

          <Form {...form}>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={form.handleSubmit(handleCompleteReservation)}
            >
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs lg:text-sm font-medium text-text-sec">
                      Doctor Notes
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Input anything you would love the doctor to know before the session"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs lg:text-sm font-medium text-text-sec">
                      Upload Files
                    </FormLabel>
                    <FormControl>
                      <Label
                        className="relative h-12 w-full ring ring-gray/30 p-1.5 flex items-center gap-2.5 cursor-pointer"
                        htmlFor="file"
                      >
                        <div className="h-full bg-[#E8EDF1] rounded-md p-2 flex items-center gap-1 *:text-black/70 min-w-max">
                          <Icons.file />
                          <span>Select file</span>
                        </div>
                        <Paragraph className="text-text-subtle font-normal text-xs md:text-sm truncate">
                          {selectedFile
                            ? selectedFile.name
                            : "No file selected"}
                        </Paragraph>
                        <input
                          type="file"
                          className="hidden appearance-none"
                          id="file"
                          onBlur={field.onBlur}
                          name={field.name}
                          onChange={(e) => {
                            field.onChange(e.target.files);
                            setSelectedFile(e.target?.files?.[0]);
                          }}
                          ref={field.ref}
                        />
                      </Label>
                    </FormControl>

                    <FormMessage />
                    {/* <ul className="text-text-subtle text-xs md:text-sm flex items-center gap-2 flex-wrap">
                      {selectedFiles.map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul> */}
                    <Paragraph className="text-text-subtle text-xs md:text-sm">
                      Upload png,jpegs,pdf...
                    </Paragraph>
                  </FormItem>
                )}
              />

              <div className="pt-5 md:pt-3">
                <Button
                  className="w-full"
                  type="submit"
                  isLoading={isPending || isUploading}
                >
                  Complete Reservation
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
