import Navbar from "@/components/dashboard/navbar";
import Sidebar from "@/components/dashboard/sidebar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-auto relative">
      <Navbar />

      <div className="flex w-full justify-end h-full">
        <Sidebar />

        <main className="bg-[#FAFAFB] relative py-6 px-4 h-full min-h-screen w-full lg:w-[calc(100%-210px)]">
          {children}
        </main>
      </div>
    </div>
  );
}
