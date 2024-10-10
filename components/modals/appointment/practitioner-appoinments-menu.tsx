"use client";

import { appointment_tabs } from "@/constants/appointments";
import { parseAppointmentTabs } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PractitionerAppointmentDetailsModal } from "@/components/modals/appointment/practitioner-appointment-details-modal";
import CompletedAppointmentModal from "./completed-appointment-modal";
import { PractitionerAppointmentInfo } from "@/api/dashboard/appointments/practitioner/get-practitioner-appointments";
import Cookies from "js-cookie";
import { useAppointment } from "@/context/appointments";
import { fetchAppointmentDetailsAndToken } from "@/api/dashboard/appointments/appointmentService";

export const PractitionerAppointmentsMenu = ({
  row,
}: {
  row: PractitionerAppointmentInfo;
}) => {
  const router = useRouter();
  const { setAppointmentInfoData } = useAppointment();
  const [userToken, setUserToken] = useState<string | null>(null);
  const token = Cookies.get("dokto-token");

  useEffect(() => {
    const generateTokenAndFetchData = async () => {
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

    generateTokenAndFetchData();
  }, [row._id, token, setAppointmentInfoData]);

  const param = parseAppointmentTabs(
    appointment_tabs,
    useSearchParams().get("tab") || "pending"
  );

  const [openDetailsModal, setOpenDetailsModal] = useState<boolean>(false);
  const [openCompletedDetailsModal, setOpenCompletedDetailsModal] =
    useState<boolean>(false);

  const getAppointmentTime = (): boolean => {
    const { appointmentTime } = row;
    const currentTime = new Date();
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();

    let available: boolean;

    const [appointedHours, appointedMinutes] = appointmentTime
      .split(":")
      .map(Number);

    available =
      appointedHours > currentHours ||
      (appointedHours === currentHours && appointedMinutes > currentMinutes);

    return available;
  };

  const appointmentValid = getAppointmentTime();

  const handleJoinCall = () => {
    const appointmentId = row._id;

    if (!userToken) {
      console.error("Token is not ready yet");
      return;
    }

    router.push(`/virtual-call?channelName=${appointmentId}&token=${userToken}`);
  };

  const handleDetailsClick = () => {
    param === "completed"
      ? setOpenCompletedDetailsModal(true)
      : setOpenDetailsModal(true);
  };

  return (
    <>
      <div className="flex items-center justify-end gap-3">
        {row.status === "APPROVED" && (
          <Button onClick={handleJoinCall} disabled={appointmentValid}>
            Join Now
          </Button>
        )}

        {param === "completed" && (
          <Button onClick={() => { }} disabled={row.status === "APPROVED"}>
            {row.status === "APPROVED" ? "Prescribed" : "Prescribe Drug"}
          </Button>
        )}

        <Button variant={"outline"} onClick={handleDetailsClick}>
          Details
        </Button>
      </div>

      <PractitionerAppointmentDetailsModal
        data={row}
        onOpenChange={setOpenDetailsModal}
        open={openDetailsModal}
        appointmentAvailable={appointmentValid}
      />

      <CompletedAppointmentModal
        data={row}
        open={openCompletedDetailsModal}
        onOpenChange={setOpenCompletedDetailsModal}
      />
    </>
  );
};
