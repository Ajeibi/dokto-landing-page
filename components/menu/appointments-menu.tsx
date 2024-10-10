"use client";

import { AppointmentInfo } from "@/api/dashboard/appointments/get-appointments";
import { appointment_tabs } from "@/constants/appointments";
import { parseAppointmentTabs } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AppointmentCancelledModal } from "../modals/appointment/appointment-cancelled-modal";
import { AppointmentDetailsModal } from "../modals/appointment/appointment-details-modal";
import { CancelAppointmentsModal } from "../modals/appointment/cancel-appointment-modal";
import { Button } from "../ui/button";
import { useDoctor } from "@/context/doctor";
import Cookies from "js-cookie";
import { useAppointment } from "@/context/appointments";
import { fetchAppointmentDetailsAndToken } from "@/api/dashboard/appointments/appointmentService";

export const AppointmentsMenu = ({ row }: { row: AppointmentInfo }) => {
  const router = useRouter();
  const { setAppointmentInfoData } = useAppointment();
  const [userToken, setUserToken] = useState<string | null>(null);
  const token = Cookies.get("dokto-token");

  useEffect(() => {
    const generateToken = async () => {
      try {
        const data = await fetchAppointmentDetailsAndToken(row._id, token!);
        setAppointmentInfoData({
          patientFirstName: data.patientFirstName,
          patientLastName: data.patientLastName,
          doctorFirstName: data.doctorFirstName,
          doctorLastName: data.doctorLastName,
          doctorType: data.doctorType,
          rating: data.rating,
          imgUrl: data.imgUrl,
          profilePhoto: data.profilePhoto,
        });
        setUserToken(data.token);
      } catch (error) {
        console.error(error);
      }
    };

    generateToken();
  }, [row._id, token, setAppointmentInfoData]);

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

  const handleJoinCall = () => {
    const appointmentId = row._id;

    if (!userToken) {
      console.error("Token is not ready yet");
      return;
    }

    router.push(
      `/virtual-call?channelName=${appointmentId}&token=${userToken}`
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
