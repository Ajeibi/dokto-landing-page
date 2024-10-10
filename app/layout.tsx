import type { Metadata } from "next";
import "./globals.scss";
import localFont from "next/font/local";
import ReactQueryProvider from "@/layout/ReactQueryProvider";
import StoreProvider from "@/context/store";
import UserProvider from "@/context/user";
import { Toaster } from "@/components/ui/sonner";
import DoctorProvider from "@/context/doctor";
import { AppointmentProvider } from "@/context/appointments";

const jakarta = localFont({
  src: "./PlusJakartaSans-VariableFont_wght.ttf",
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Dokto",
  description: "Welcome to Dokto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jakarta.className}>
      <body>
        <ReactQueryProvider>
          <UserProvider>
            <DoctorProvider>
              <AppointmentProvider>
                <div className="w-full h-screen">{children}</div>
                <Toaster position="top-right" richColors />
              </AppointmentProvider>
            </DoctorProvider>
          </UserProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
