import { useGetPrescriptions } from "@/api/dashboard/prescription/get-prescriptions";
import { prescription_columns } from "@/components/columns/prescription-column";
import { RequestError } from "@/components/errors/request-error";
import { Icons } from "@/components/icons";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmptyPrescriptionState } from "@/components/ui/empty-state/empty-states";
import Paragraph from "@/components/ui/typography/paragraph";
import React from "react";

const prescriptionTypes = [
  {
    name: "All Prescription",
    value: "all",
  },
  {
    name: "Self Request",
    value: "self-request",
  },
  {
    name: "Prescribed",
    value: "prescribed",
  },
];

export default function PrescriptionRefillHistory() {
  const [currType, setCurrType] = React.useState(prescriptionTypes[0]);
  const { data, isLoading, error } = useGetPrescriptions({
    tab: "prescribed",
  });

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <Paragraph className="flex flex-col text-text">
          Prescription Request History
        </Paragraph>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"} className="gap-3">
              {currType.name} <Icons.chevronDownIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {prescriptionTypes.map((type) => (
              <DropdownMenuItem
                key={type.value}
                onClick={() => setCurrType(type)}
              >
                {type.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="*:bg-white *:px-5">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <RequestError error={error} />
        ) : (
          <DataTable
            data={data?.data.results ? data.data.results : []}
            columns={prescription_columns}
            emptyState={<EmptyPrescriptionState />}
            show_headings={true}
            show_pagination={false}
            show_toolbar={false}
          />
        )}
      </div>
    </div>
  );
}
