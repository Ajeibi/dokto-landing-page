"use client";

import { useGetDoctorProfile } from "@/api/dashboard/doctors/get-doctor-profile";
import Loading from "@/app/loading";
import DoctorCard from "@/components/dashboard/appointments/doctor-card";
import AppointmentsReviews from "@/components/dashboard/appointments/reviews";
import SelectAppointmentDate from "@/components/dashboard/appointments/select-date";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Paragraph from "@/components/ui/typography/paragraph";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function DoctorProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const { data, isLoading } = useGetDoctorProfile(params.id);
  const [openModal, setOpenModal] = React.useState(false);

  const doctor = data?.data;

  if (isLoading) {
    return <Loading />;
  }

  if (!data || !doctor) {
    return <div>Doctor not found</div>;
  }

  return (
    <div className="py-6 max-w-6xl ">
      <div className="flex items-center justify-between mb-6 md:mb-7">
        <Paragraph className="font-medium">Doctor’s Profile</Paragraph>
        <Button className="xl:hidden" onClick={() => setOpenModal(true)}>
          View Availability
        </Button>
      </div>

      <div className="flex gap-10 flex-col xl:flex-row">
        <section className="xl:max-w-[40.75rem]  overflow-x-hidden w-full space-y-8">
          {/* profile info */}

          <div className="space-y-6 lg:space-y-7">
            <div className="flex items-center gap-3 lg:gap-4">
              <div className="w-24 h-24 lg:w-[7.5rem] lg:h-[7.5rem] relative">
                {doctor?.personalInfo.imgUrl ? (
                  <Image src={doctor?.personalInfo.imgUrl} alt="doctor" fill />
                ) : (
                  <ImageIcon className="w-full h-full" />
                )}
              </div>

              <div className="space-y-4">
                <Paragraph className="font-medium text-sm capitalize text-text lg:text-base">
                  {doctor?.personalInfo.firstName}{" "}
                  {doctor?.personalInfo.lastName}
                </Paragraph>

                <div>
                  <Paragraph className="font-medium text-xs lg:text-sm">
                    {doctor?.doctorType}
                  </Paragraph>
                  <Paragraph className="text-text-subtle text-xs *:capitalize">
                    {doctor?.personalInfo.languages.map((lang, idx) => (
                      <span key={lang}>
                        {lang}
                        {idx !== doctor?.personalInfo.languages.length - 1 &&
                          ", "}
                      </span>
                    ))}
                  </Paragraph>

                  <div className="flex items-center">
                    <Icons.stars />
                    <span className="text-text-sec font-normal text-xs lg:text-sm">
                      {doctor?.rating} Reviews
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* infos  */}

            <ScrollArea className="w-full">
              <div className="flex items-center gap-2 w-full *:rounded-full *:whitespace-nowrap *:px-3 *:py-1 *:lg:px-5 *:text-text-sec *:font-normal *:text-xs *:border *:border-gray-400">
                <div>{doctor?.user}</div>
                <div>Total reviews - {doctor?.reviews.length}</div>
                <div>Completed appointment - {doctor?.noOfAppointments}</div>
                <div>Total appointment time - 3,400 mins</div>
              </div>
              <ScrollBar orientation="horizontal" className="pt-3" />
            </ScrollArea>
          </div>

          {/* bio */}

          <div className="space-y-2 ">
            <Paragraph className="text-text font-medium text-sm lg:text-base">
              Bio
            </Paragraph>

            <Paragraph className="text-text-subtle text-xs lg:text-sm">
              {doctor?.bio}
            </Paragraph>
          </div>

          <Separator />

          {/* reviews */}
          <div className="space-y-3 lg:space-y-4">
            <div className="flex items-center justify-between">
              <Paragraph className="text-sm lg:text-base font-medium text-text">
                Latest Review
              </Paragraph>
              <Link
                href=""
                className="text-sm lg:text-base font-medium text-text"
              >
                See all{" "}
              </Link>
            </div>

            <div className=" space-y-4">
              <AppointmentsReviews />
              <Separator />
              <AppointmentsReviews />
            </div>
          </div>
        </section>

        <SelectAppointmentDate
          props={doctor}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      </div>

      {/* similar doctors */}
      <section className="pt-10">
        <div className="space-y-3 lg:space-y-4">
          <div className="flex items-center justify-between">
            <Paragraph className="text-sm lg:text-base font-medium text-text">
              Similar Doctors
            </Paragraph>
            {/* stepper here */}
          </div>
          <ScrollArea className="w-full">
            <div className="w-full flex flex-col lg:flex-row gap-4">
              <DoctorCard {...data.data} />
              <DoctorCard {...data.data} />
              <DoctorCard {...data.data} />
              <DoctorCard {...data.data} />
            </div>

            <ScrollBar
              orientation="horizontal"
              className="pt-3 hidden lg:flex"
            />
          </ScrollArea>
        </div>
      </section>
    </div>
  );
}
