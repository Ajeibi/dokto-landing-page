"use client";

import { useGetPractitionerAppointments } from "@/api/dashboard/appointments/practitioner/get-practitioner-appointments";
import { practitioner_appointments_columns } from "@/components/columns/appointments-column";
import { RequestError } from "@/components/errors/request-error";
import Loading from "@/components/loading";
import { DataTable } from "@/components/ui/data-table";
import { EmptyPractitionersAppointmentState } from "@/components/ui/empty-state/empty-states";
import Paragraph from "@/components/ui/typography/paragraph";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";

export function PendingApprovalAppointments() {
  const { data, isLoading, error } = useGetPractitionerAppointments({
    tab: "pending",
    page: "1",
  });

  return (
    <div className="bg-white py-6 px-5 rounded-[20px] ">
      <div className="flex justify-between items-center">
        <Paragraph>Pending Approval</Paragraph>

        <Link
          href="/dashboard/appointment?tab=pending"
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
            data={data?.results!}
            columns={practitioner_appointments_columns}
            emptyState={<EmptyPractitionersAppointmentState />}
            show_headings={false}
            show_pagination={false}
            show_toolbar={false}
          />
        )}
      </div>
    </div>
  );
}
