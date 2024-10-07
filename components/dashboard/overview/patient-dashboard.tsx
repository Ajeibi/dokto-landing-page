import { useUser } from "@/context/user";
import AvailableDoctor from "./patients/availableDoctor";
import Hero from "./patients/hero";
import PrescriptionRefillHistory from "./patients/prescription-refill-history";
import UpcomingAppointments from "./upcomingAppointments";

export function PatientDashboard() {
  const { User } = useUser();
  if (!User || User.role !== "patient") return null;

  return (
    <>
      <Hero />
      <UpcomingAppointments />
      <AvailableDoctor />
      <PrescriptionRefillHistory />
    </>
  );
}
