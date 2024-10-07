import Paragraph from "@/components/ui/typography/paragraph";
import { formatDate, formatTime } from "@/lib/utils";
import { CalendarDays, Clock5Icon, ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { PractitionerAppointmentInfo } from "@/api/dashboard/appointments/practitioner/get-practitioner-appointments";

interface Props {
  data?: PractitionerAppointmentInfo;
}

export function AppointmentDetails({ data }: Props) {
  console.log(data?.medicalImage[0]);

  return (
    <>
      <div className="space-y-4">
        <Paragraph className="font-medium text-text-sec text-sm">
          Appointment with
        </Paragraph>
        <div className="flex items-center gap-3 lg:gap-4 h-16 lg:h-[6.25rem]">
          <div className="w-16 h-16 lg:w-[6.25rem] lg:h-[6.25rem] relative">
            {data?.patientId.profilePhoto ? (
              <Image
                src={data?.patientId.profilePhoto}
                alt="patient profile photo"
                fill
              />
            ) : (
              <ImageIcon className="w-full h-full" />
            )}
          </div>

          <div className="flex flex-col justify-between">
            <Paragraph className="font-medium text-sm capitalize text-text lg:text-base">
              {`${data?.patientId.firstName} ${data?.patientId.lastName}`}
            </Paragraph>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="space-y-2 lg:space-y-4">
        <header className="text-xs lg:text-sm font-medium text-text-sec">
          Appointment Information
        </header>

        <div className="flex items-center gap-6 *:text-xs *:lg:text-sm *:font-normal *:text-text-sec">
          <div className="flex items-center gap-1">
            <CalendarDays className="w-4 h-4 lg:w-5 lg:h-5" />
            {formatDate(`${data?.appointmentDate}`)}
          </div>
          <div className="flex items-center gap-1">
            <Clock5Icon className="w-4 h-4 lg:w-5 lg:h-5" />
            {formatTime(data?.appointmentTime!)}
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="space-y-2 lg:space-y-4 mb-5">
        <header className="text-xs lg:text-sm font-medium text-text-sec">
          Patient Notes
        </header>
        <Paragraph className="text-text-subtle text-xs md:text-sm">
          {data?.patientNotes ? data.patientNotes : "-"}
        </Paragraph>
      </div>

      <div className="space-y-2 lg:space-y-4">
        <header className="text-xs lg:text-sm font-medium text-text-sec">
          Uploaded Files
        </header>
        {data?.medicalImage.length! > 0
          ? data?.medicalImage.map((image) =>
              image.toLowerCase().endsWith(".pdf") ? (
                <a href={image} target="_blank" rel="noopener noreferrer">
                  Open Pdf
                </a>
              ) : (
                <Link
                  key={image}
                  href={image}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={image} alt="image" width={50} height={50} />
                </Link>
              )
            )
          : "-"}
      </div>
    </>
  );
}
