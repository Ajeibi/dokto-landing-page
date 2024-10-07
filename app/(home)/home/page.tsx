import Appointments from "@/components/landingPage/home/appointments";
import Hero from "@/components/landingPage/home/hero";
import MeetDoctors from "@/components/landingPage/home/meet";
import RefillPrescription from "@/components/landingPage/home/refilPrescription";
import ScanCode from "@/components/landingPage/home/scan";
import Services from "@/components/landingPage/home/services";
import StreamlineAppointments from "@/components/landingPage/home/streamline";
import SubscriptionPlan from "@/components/landingPage/home/subscription";
import Testimonials from "@/components/landingPage/home/testimonials";
import React from "react";

export default function LandingPage() {
  return (
    <div>
      <Hero />
      <Services />
      <MeetDoctors />
      <RefillPrescription />
      <ScanCode />
      <SubscriptionPlan />
      <Appointments />
      <Testimonials />
      <StreamlineAppointments />
    </div>
  );
}
