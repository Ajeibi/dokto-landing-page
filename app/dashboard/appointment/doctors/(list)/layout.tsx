"use client";

import { filterItems } from "@/components/dashboard/appointments/data";
import SpecialistsFilter from "@/components/dashboard/appointments/specialists-filter";
import { FilterItems } from "@/components/ui/filters/filter-items";
import SearchItems from "@/components/ui/filters/search-items";
import Tabs from "@/components/ui/nav-tab";
import Paragraph from "@/components/ui/typography/paragraph";
import { useSearchParams } from "next/navigation";
import React from "react";

const bookAppointment_tabs = [
  {
    name: "General Practitioner",
    href: "practitioner",
  },
  {
    name: "Specialists",
    href: "specialists",
  },
];

export default function DoctorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentTab = useSearchParams().get("tab") || "practitioner";

  const title =
    currentTab === "practitioner"
      ? "Select a Health Practitioner"
      : "Select a Health Specialist";

  const intro =
    currentTab === "practitioner"
      ? "General practitioners"
      : "Health specialists";

  return (
    <div className="py-6 space-y-5">
      <Paragraph className="font-medium">{title}</Paragraph>

      <Tabs tabs={bookAppointment_tabs} />

      {currentTab === "specialists" ? <SpecialistsFilter /> : null}

      <Paragraph className="p-5 text-sm text-[#4F5E71CC] max-w-6xl mx-auto">
        Meet our team of {intro} with a wealth of knowledge and years of
        experience to provide the best possible care. Take the first step
        towards better health, and schedule an appointment with us here at
        Dokto.
      </Paragraph>

      <div className="flex items-center gap-5 justify-end max-w-6xl mx-auto">
        <SearchItems placeholder="Search by name" key={currentTab} />
        <FilterItems
          title="Availability"
          options={filterItems}
          urlParam="filter"
        />
      </div>

      {children}
    </div>
  );
}
