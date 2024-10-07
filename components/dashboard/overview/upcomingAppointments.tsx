"use client";

import { useGetAppointments } from "@/api/dashboard/appointments/get-appointments";
import { useGetPractitionerAppointments } from "@/api/dashboard/appointments/practitioner/get-practitioner-appointments";
import {
  appointments_columns,
  practitioner_appointments_columns,
} from "@/components/columns/appointments-column";
import { RequestError } from "@/components/errors/request-error";
import Loading from "@/components/loading";
import { DataTable } from "@/components/ui/data-table";
import {
  EmptyAppointmentState,
  EmptyPractitionersAppointmentState,
} from "@/components/ui/empty-state/empty-states";
import Paragraph from "@/components/ui/typography/paragraph";
import { useUser } from "@/context/user";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";

const UpcomingAppointments = () => {
  const { User } = useUser();

  if (!User) return null;

  const { data, isLoading, error } =
    User.role === "patient"
      ? useGetAppointments({
          tab: "approved",
          page: "1",
          filter: "asc",
        })
      : useGetPractitionerAppointments({
          tab: "approved",
          page: "1",
          filter: "desc",
        });

  return (
    <div className="bg-white py-6 px-5 rounded-[20px] ">
      <div className="flex justify-between items-center">
        <Paragraph>Upcoming Appointment</Paragraph>

        <Link
          href="/dashboard/appointment?tab=approved"
          className="flex items-center text-[#3F2464]"
        >
          <span className="text-sm mr-0.5">View More</span>
          <span>
            <GoArrowRight />
          </span>
        </Link>
      </div>

      <div className="mt-[30px] w-full">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <RequestError error={error} />
        ) : (
          <DataTable
            data={data?.results ?? []}
            columns={
              User.role === "patient"
                ? appointments_columns
                : practitioner_appointments_columns
            }
            emptyState={
              User.role === "patient" ? (
                <EmptyAppointmentState appointment={"Upcoming"} />
              ) : (
                <EmptyPractitionersAppointmentState />
              )
            }
            show_headings={false}
            show_pagination={false}
            show_toolbar={false}
          />
        )}
      </div>
    </div>
  );
};

export default UpcomingAppointments;
