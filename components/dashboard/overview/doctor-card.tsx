import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { TAvailableDoctor } from "@/api/dashboard/doctors/get-available-doctors";
import Link from "next/link";
import Paragraph from "@/components/ui/typography/paragraph";

const DoctorCard = (props: TAvailableDoctor) => {
  return (
    <Link
      href={`appointment/doctors/${props._id}/profile`}
      className="w-full min-[500px]:w-[214px] h-[188px] rounded-lg p-4 flex flex-col items-center relative bg-white"
    >
      <div className="relative w-16 h-16">
        {props.personalInfo.imgUrl ? (
          <Image
            src={props.personalInfo.imgUrl}
            alt={
              props.personalInfo.firstName + " " + props.personalInfo.lastName
            }
            fill
            className="rounded-full object-cover"
          />
        ) : (
          <Image
            src="/avatar.png"
            alt="Doctor Image"
            fill
            className="rounded-full"
          />
        )}
      </div>
      <div className="absolute top-4 right-4 flex items-center">
        <span className="text-gray-700 text-sm mr-1">{props.rating}</span>
        <FaStar className="text-yellow-500" />
      </div>
      <div className="mt-4 text-center space-y-1">
        <Paragraph className="text-text font-medium text-sm capitalize">
          {props.personalInfo.firstName} {props.personalInfo.lastName}
        </Paragraph>
        <Paragraph className="text-[#4F5E71] text-xs">
          {props.medicalInfo.specialty}
        </Paragraph>
      </div>
      <div className="mt-2 w-full bg-purple-100 rounded-b-lg absolute bottom-0 text-center py-2">
        <Paragraph className="text-purple-700 font-medium text-sm">
          <span className="text-[#574274] text-sm">Availability:</span>
          <span className="text-[#3B008F] text-sm">
            {props.availableSlots.length > 0
              ? new Date(props.availableSlots[0]).toLocaleString("en-US", {
                  timeZone: "US/Central",
                  hour12: false,
                  hour: "numeric",
                  minute: "numeric",
                })
              : "Today, 2:30pm"}
          </span>
        </Paragraph>
      </div>
    </Link>
  );
};

export default DoctorCard;
