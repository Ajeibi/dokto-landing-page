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

export const PractitionerAppointmentsMenu = ({
  row,
}: {
  row: PractitionerAppointmentInfo;
}) => {
  const router = useRouter();
  const [userToken, setUserToken] = useState<string | null>(null);
  const token = Cookies.get("dokto-token");

  useEffect(() => {
    const generateToken = async () => {
      try {
        const response = await fetch(`https://api.dokto.health/api/v1/appointment/meeting/${row._id}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const { data } = await response.json();
        setUserToken(data.token);
        console.log("Token generated: ", data);
      } catch (error) {
        console.error(error);
      }
    };
    generateToken();
  }, [row._id, token]);

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
    const doctorId = row.doctorId._id;

    if (!userToken) {
      console.error("Token is not ready yet");
      return;
    }

    router.push(
      `/virtual-call?call=${doctorId}&appointment=${appointmentId}&channelName=${appointmentId}&token=${userToken}`
    );
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