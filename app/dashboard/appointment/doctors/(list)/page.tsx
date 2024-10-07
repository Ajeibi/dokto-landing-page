"use client";

import { useGetDoctors } from "@/api/dashboard/doctors/get-doctors";
import Loading from "@/app/loading";
import DoctorCard from "@/components/dashboard/appointments/doctor-card";
import { PaginationControls } from "@/components/pagination-controls";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function DoctorsPage() {
  const param = useSearchParams().entries();
  const query = Object.fromEntries(param);

  const { data, isLoading } = useGetDoctors(query);

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.data || data.data.results.length === 0) {
    return <div>No results</div>;
  }

  return (
    <>
      <section className="flex items-center flex-wrap justify-center gap-5 max-w-6xl mx-auto">
        {data?.data.results.map((item, idx) => (
          <DoctorCard key={idx} {...item} />
        ))}
      </section>

      <PaginationControls totalPages={data.data.totalPages} />
    </>
  );
}
