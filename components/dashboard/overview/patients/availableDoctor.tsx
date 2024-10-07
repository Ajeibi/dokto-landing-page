import React from "react";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";
import { useGetAvailableDoctors } from "@/api/dashboard/doctors/get-available-doctors";
import Paragraph from "@/components/ui/typography/paragraph";
import Loading from "@/components/loading";
import { RequestError } from "@/components/errors/request-error";
import DoctorCard from "../doctor-card";

const AvailableDoctor = () => {
  const { data, isLoading, error } = useGetAvailableDoctors();

  return (
    <div className="bg-transparent py-6 px-5 rounded-[20px] space-y-8 min-h-20 md:min-h-80">
      <div className="flex justify-between items-center">
        <Paragraph className="flex flex-col">
          <span className="text-[#232324]">Available Doctor</span>
          <span className="text-[#4F5E71] text-sm">Meet your doctor</span>
        </Paragraph>

        <Link
          href="appointment/doctors"
          className="flex items-center text-[#3F2464]"
        >
          <span className="text-sm mr-0.5">View More</span>
          <span>
            <GoArrowRight />
          </span>
        </Link>
      </div>

      {isLoading ? (
        <Loading />
      ) : error ? (
        <RequestError error={error} />
      ) : (
        <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 justify-center gap-4 place-items-center">
          {data?.data.results.map((doctor) => (
            <DoctorCard key={doctor._id} {...doctor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableDoctor;
