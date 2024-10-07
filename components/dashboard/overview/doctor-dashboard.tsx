import { Button } from "@/components/ui/button";
import Paragraph from "@/components/ui/typography/paragraph";
import { useUser } from "@/context/user";
import Image from "next/image";
import React from "react";
import { Switch } from "@/components/ui/switch";
import UpcomingAppointments from "./upcomingAppointments";
import { PendingApprovalAppointments } from "./doctors/pending-approval";
import Link from "next/link";
import { useGetPractitionerAppointments } from "@/api/dashboard/appointments/practitioner/get-practitioner-appointments";
import { getAppointmentCounts, getGreeting } from "@/lib/utils";

export function DoctorDashboard() {
  const { User } = useUser();

  if (!User || User.role === "patient") return null;
  
  const { data, isLoading, error } = useGetPractitionerAppointments({
    tab: "approved",
    page: "1",
  });


  const appointmentCounts = React.useMemo(() => {
    if (!data || isLoading || error) return { today: 0, upcoming: 0, completed: 0 };

    return getAppointmentCounts(data.results);
  }, [data, isLoading, error]);

  return (
    <>
      <div className="flex md:items-center justify-between gap-10 flex-col md:flex-row">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full relative overflow-hidden border-4 border-primary">
            <Image
              src={
                User.profilePhoto
                  ? User.profilePhoto
                  : `https://api.multiavatar.com/${User?.firstName}.svg`
              }
              alt={`${User.firstName}'s profile photo`}
              fill
              objectFit="cover"
            />
          </div>

          <div className="space-y-1">
            <Paragraph className="font-medium text-text md:text-lg capitalize">
              {getGreeting()}, <span className="text-primary">Dr. {User.firstName}</span>
            </Paragraph>
            {User.adminApproved ? (
              <Paragraph className="text-xs md:text-sm text-success">
                Account Verified
              </Paragraph>
            ) : (
              <Paragraph className="text-xs md:text-sm text-warn-dark">
                Complete your profile update
              </Paragraph>
            )}
          </div>
        </div>

        <Button asChild>
          <Link href="slot">Slot Management</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
        <div className="px-5 py-4 space-y-4 bg-white rounded-l-xl">
          <div className="flex items-center gap-5 justify-between">
            <Paragraph className="text-text text-sm">My Availability</Paragraph>
            <Switch />
          </div>
          <Paragraph>
            Switch the toggle on when you're available and off when you're not.
            This helps you manage your appointments with users.
          </Paragraph>
        </div>

        {/* Todays Appointments */}
        <div className="px-5 py-4 flex flex-col gap-4 justify-between bg-white max-sm:rounded-xl">
          <Paragraph className="text-text text-sm">
            Today's Appointment
          </Paragraph>
          <Paragraph className="text-xl md:text-3xl font-medium">
            {appointmentCounts.today}
          </Paragraph>
          <Link href="appointment?tab=approved" className="text-primary text-xs md:text-sm">
            Manage Appointment
          </Link>
        </div>

        {/* Completed Appointments */}
        <div className="px-5 py-4 flex flex-col gap-4 justify-between bg-white max-sm:rounded-xl">
          <Paragraph className="text-text text-sm">
            Completed Appointment
          </Paragraph>
          <Paragraph className="text-xl md:text-3xl font-medium">
            {appointmentCounts.completed}
          </Paragraph>
          <Link href="appointment?tab=completed" className="text-primary text-xs md:text-sm">
            Manage Appointment
          </Link>
        </div>

        {/* Upcoming Appointments */}
        <div className="px-5 py-4 flex flex-col gap-4 justify-between bg-white rounded-r-xl">
          <Paragraph className="text-text text-sm">
            Upcoming Appointment
          </Paragraph>
          <Paragraph className="text-xl md:text-3xl font-medium">
            {appointmentCounts.upcoming}
          </Paragraph>
          <Link href="appointment?tab=approved" className="text-primary text-xs md:text-sm">
            Manage Appointment
          </Link>
        </div>
      </div>

      <UpcomingAppointments />
      <PendingApprovalAppointments />
    </>
  );
}