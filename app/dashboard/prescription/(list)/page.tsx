"use client";

import { useGetDoctorPrescriptions } from "@/api/dashboard/prescription/get-doctor-prescription";
import { useGetPrescriptions } from "@/api/dashboard/prescription/get-prescriptions";
import {
  doctor_prescription_columns,
  doctor_prescription_prescribed_columns,
} from "@/components/columns/doctor-prescription-column";
import {
  prescription_columns,
  prescription_columns_request,
} from "@/components/columns/prescription-column";
import { filterItems } from "@/components/dashboard/appointments/data";
import Loading from "@/components/loading";
import { PaginationControls } from "@/components/pagination-controls";
import { DataTable } from "@/components/ui/data-table";
import { EmptyPrescriptionState } from "@/components/ui/empty-state/empty-states";
import {
  doctor_prescriptions_tabs,
  prescriptions_tabs,
} from "@/constants/prescriptions";
import { useUser } from "@/context/user";
import { parseTabs } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

export default function PrescriptionsPage() {
  const param = useSearchParams().entries();
  const query = Object.fromEntries(param);
  const router = useRouter();

  const { User } = useUser();

  const tab =
    User?.role === "patient"
      ? parseTabs(prescriptions_tabs, query["tab"])
      : parseTabs(doctor_prescriptions_tabs, query["tab"]);

  const { data, isLoading } =
    User?.role === "patient"
      ? useGetPrescriptions(query)
      : useGetDoctorPrescriptions(query);

  if (tab !== query["tab"]) {
    router.push(`/dashboard/prescription?tab=${tab}`);
    return;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <DataTable
        data={data?.data.results ? data.data.results : []}
        columns={
          User?.role === "patient"
            ? tab === "request"
              ? prescription_columns_request
              : prescription_columns
            : tab === "prescribed"
            ? doctor_prescription_prescribed_columns
            : doctor_prescription_columns
        }
        emptyState={<EmptyPrescriptionState />}
        show_toolbar={true}
        filterItems={filterItems}
        show_pagination={false}
      />

      {data && data.data.totalPages > 1 && (
        <PaginationControls totalPages={data.data.totalPages!} />
      )}
    </>
  );
}
