"use client";

import { AppointmentInfo } from "@/api/dashboard/appointments/get-appointments";
import { appointment_tabs } from "@/constants/appointments";
import { parseAppointmentTabs } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { AppointmentCancelledModal } from "../modals/appointment/appointment-cancelled-modal";
import { AppointmentDetailsModal } from "../modals/appointment/appointment-details-modal";
import { CancelAppointmentsModal } from "../modals/appointment/cancel-appointment-modal";
import { Button } from "../ui/button";
import { IDoctorDetails } from "../virtual-call/waiting-screen";
import { useDoctor } from "@/context/doctor";

export const AppointmentsMenu = ({ row }: { row: AppointmentInfo }) => {
  const router = useRouter();

  const param = parseAppointmentTabs(
    appointment_tabs,
    useSearchParams().get("tab") || "approved"
  );

  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openAppointmentCancelModal, setOpenAppointmentCancelModal] =
    useState(false);
  const [openCancelledAppointmentModal, setOpenCancelledAppointmentModal] =
    useState(false);

  const { setDoctor } = useDoctor();

  const doctor: IDoctorDetails = {
    name: `${row.doctorId.personalInfo.firstName} ${row.doctorId.personalInfo.lastName}`,
    role: row.doctorType,
    image: row.doctorId.personalInfo.imgUrl,
    ratings: row.rating,
  };

  const handleJoinCall = () => {
    setDoctor(doctor);
    router.push(
      `/virtual-call?call=${row.doctorId._id}&appointment=${row._id}`
    );
  };

  return (
    <>
      <div className="flex items-center justify-end gap-3">
        {param === "approved" && (
          <Button onClick={handleJoinCall}>Join Now</Button>
        )}

        <Button
          variant={"outline"}
          onClick={() => {
            if (row.status === "CANCELLED") {
              setOpenCancelledAppointmentModal(true);
            } else {
              setOpenDetailsModal(true);
            }
          }}
        >
          Details
        </Button>
      </div>

      <AppointmentDetailsModal
        data={row}
        open={openDetailsModal}
        onOpenChange={setOpenDetailsModal}
        openCancelModal={setOpenAppointmentCancelModal}
      />

      <CancelAppointmentsModal
        onOpenChange={setOpenAppointmentCancelModal}
        open={openAppointmentCancelModal}
        data={row}
        setOpenCancelledAppointmentModal={setOpenCancelledAppointmentModal}
      />

      <AppointmentCancelledModal
        onOpenChange={setOpenCancelledAppointmentModal}
        open={openCancelledAppointmentModal}
        data={row}
      />
    </>
  );
};
