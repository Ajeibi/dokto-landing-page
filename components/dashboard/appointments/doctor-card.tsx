import { TDoctorInfo } from "@/api/dashboard/doctors/types";
import { Icons } from "@/components/icons";
import { Rating } from "@/components/rating";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Paragraph from "@/components/ui/typography/paragraph";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const weekDays = ["sun", "mon", "tue", "wed", "thr", "fri", "sat"];

export default function DoctorCard(props: TDoctorInfo) {
  const { personalInfo, medicalInfo } = props;
  return (
    <Card className="min-[1280px]:w-[366px] max-w-[366px] w-full p-5 bg-white">
      <CardHeader className="space-y-2 p-0 mb-2 md:mb-3">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <div className="relative w-14 h-14 md:w-[6.25rem] md:h-[6.25rem]">
              {personalInfo?.imgUrl ? (
                <Image
                  src={personalInfo.imgUrl}
                  alt="doctor"
                  fill
                  className="rounded-md"
                />
              ) : (
                <ImageIcon className="w-full h-full" />
              )}
            </div>

            <div className="space-y-1 max-w-[135px]">
              <CardTitle className="text-sm capitalize md:text-base font-medium leading-6">
                {personalInfo.firstName} {personalInfo.lastName}
              </CardTitle>

              <div className="*:capitalize">
                <Paragraph className="text-xs md:text-sm font-medium">
                  {props.doctorType}
                </Paragraph>
                <Paragraph className="text-[11px] md:text-xs font-normal opacity-70">
                  {personalInfo.languages.map((lang, idx) => (
                    <span key={lang}>
                      {lang} {idx !== personalInfo.languages.length - 1 && ", "}
                    </span>
                  ))}
                </Paragraph>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Paragraph className="font-normal text-xs md:text-sm">
              {props.rating}
            </Paragraph>
            <Icons.star fill="#d78b07" className="fill-[#d78b07] stroke-none" />
            {/* <Rating totalStars={5} /> */}
          </div>
        </div>
        <CardDescription className="text-[#4F5E71] font-normal text-xs md:text-sm">
          {props.bio}
        </CardDescription>
      </CardHeader>

      <CardContent className="mb-4 md:mb-6 p-0 gap-1">
        <Paragraph className="text-xs md:text-sm font-medium mb-1 text-[#4F5E71] font-jakarta">
          Availability this week:
        </Paragraph>

        <div className="flex items-center justify-between">
          {weekDays.map((day, idx) => {
            const isDisabled = idx % 2 === 0;
            return (
              <div key={idx} className=" flex items-center flex-col gap-1">
                <Paragraph className="text-xs md:text-sm font-normal text-zinc-400 capitalize">
                  {day}
                </Paragraph>
                <Paragraph
                  className={`text-xs md:text-sm font-normal ${
                    isDisabled ? "text-zinc-200" : "text-[#232324]"
                  }`}
                >
                  {idx + 1}
                </Paragraph>
              </div>
            );
          })}
        </div>
      </CardContent>
      <CardFooter className="p-0">
        <Button className="w-full" asChild>
          <Link href={`doctors/${props._id}/profile`}>Book Appointment</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
