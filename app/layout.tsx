import type { Metadata } from "next";
import "./globals.scss";
import localFont from "next/font/local";
import ReactQueryProvider from "@/layout/ReactQueryProvider";
import StoreProvider from "@/context/store";
import UserProvider from "@/context/user";
import { Toaster } from "@/components/ui/sonner";
import DoctorProvider from "@/context/doctor";
import { AgoraProvider } from "@/context/agora";

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
              <AgoraProvider>
                <div className="w-full h-screen">{children}</div>
                <Toaster position="top-right" richColors />
              </AgoraProvider>
            </DoctorProvider>
          </UserProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
