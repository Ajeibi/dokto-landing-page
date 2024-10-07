"use client";

import { useGetAppointments } from "@/api/dashboard/appointments/get-appointments";
import { useGetPractitionerAppointments } from "@/api/dashboard/appointments/practitioner/get-practitioner-appointments";
import {
  appointments_columns,
  practitioner_appointments_columns,
} from "@/components/columns/appointments-column";
import { filterItems } from "@/components/dashboard/appointments/data";
import Loading from "@/components/loading";
import { PaginationControls } from "@/components/pagination-controls";
import { DataTable } from "@/components/ui/data-table";
import { EmptyAppointmentState } from "@/components/ui/empty-state/empty-states";
import { appointment_tabs } from "@/constants/appointments";
import { useUser } from "@/context/user";
import { parseAppointmentTabs } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

export default function AppointmentsPage() {
  const param = useSearchParams().entries();
  const query = Object.fromEntries(param);
  const router = useRouter();
  const tab = parseAppointmentTabs(appointment_tabs, query["tab"]);
  const { User } = useUser();

  const isPatient = User?.role === "patient";

  const { data, isLoading } = isPatient
    ? useGetAppointments({
      ...query,
      filter: query["filter"] || "asc",
    })
    : useGetPractitionerAppointments({
      ...query,
      filter:
        query["filter"] || (tab === "completed" || (tab === "previous" && !isPatient))
          ? "desc"
          : "asc",
    });

  if (tab !== query["tab"]) {
    router.push(
      `/dashboard/appointment?tab=${User?.role === "patient" ? tab : "pending"}`
    );
    return;
  }

  if (isLoading || !User) {
    return <Loading />;
  }

  const results = isPatient ? data?.results : data?.results;
  const totalPages = isPatient ? data?.totalPages : data?.totalPages;

  return (
    <>
      <DataTable
        data={results || []}
        columns={
          User.role === "patient"
            ? appointments_columns
            : practitioner_appointments_columns
        }
        emptyState={<EmptyAppointmentState appointment={query["tab"]} />}
        show_toolbar={true}
        show_headings={false}
        filterItems={filterItems}
        show_pagination={false}
        showSearch={false}
      />

      {results && results.length > 0 && totalPages && totalPages > 1 ? (
        <PaginationControls totalPages={data?.totalPages!} />
      ) : null}
    </>
  );
}
