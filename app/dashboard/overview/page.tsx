"use client";

import { DoctorDashboard } from "@/components/dashboard/overview/doctor-dashboard";
import { PatientDashboard } from "@/components/dashboard/overview/patient-dashboard";
import Loading from "@/components/loading";
import { useUser } from "@/context/user";

const DashboardOverviewPage = () => {
  const { User } = useUser();
  if (!User) return <Loading />;

  return (
    <div className="w-full space-y-6">
      {User?.role === "patient" ? <PatientDashboard /> : <DoctorDashboard />}
    </div>
  );
};

export default DashboardOverviewPage;
