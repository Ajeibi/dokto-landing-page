import Footer from "@/components/landingPage/footer/page";
import Navbar from "@/components/landingPage/header/Navbar";
import Loader from "@/components/landingPage/loader/loader";
import Therapy from "@/components/landingPage/therapy";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Dokto",
    description: "Healthcare Management System",
    icons: {
        icon: "/assets/logo.svg",
    },
};

export default function HomePageLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className={`${inter.className} flex flex-col min-h-screen`}>
            <Loader>
                <Navbar />
                <main className="flex-grow w-full">{children}</main>
                <Therapy />
                <Footer />
            </Loader>
        </div>
    );
}
