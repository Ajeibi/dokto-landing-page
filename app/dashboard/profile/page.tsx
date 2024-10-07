"use client";

import React, { useRef } from "react";
import { useWhoAmI } from "@/api/auth/whoami";
import EditDoctorProfileModal from "@/components/dashboard/profile/doctor/edit-profile-doctors";
import { DoctorProfileInfo } from "@/components/dashboard/profile/doctor/profile-info";
import { EditPatientProfileModal } from "@/components/dashboard/profile/patient/edit-profile";
import { PatientProfileInfo } from "@/components/dashboard/profile/patient/profile-info";
import { Icons } from "@/components/icons";
import Loading from "@/components/loading";
import Heading3 from "@/components/ui/typography/heading3";
import Paragraph from "@/components/ui/typography/paragraph";
import { updateUrl } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const patient_tabs = [
  { title: "All Information", icon: Icons.book },
  { title: "Personal Information", icon: Icons.user },
  { title: "Location", icon: Icons.location2 },
  { title: "Contacts", icon: Icons.phone },
  { title: "Allergies", icon: Icons.hospitalUser },
];

const doctor_tabs = [
  { title: "All Information", icon: Icons.book },
  { title: "Personal Information", icon: Icons.user },
  { title: "Address", icon: Icons.location2 },
  { title: "Contacts", icon: Icons.phone },
  { title: "Languages", icon: Icons.language },
  { title: "License", icon: Icons.award },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = React.useState(0);
  const { data: user } = useWhoAmI();
  const openEditModal = useSearchParams().get("edit") === "true";
  const router = useRouter();

  const tabs = user?.role === "patient" ? patient_tabs : doctor_tabs;

  const personalInfo = useRef<HTMLDivElement>(null);
  const address = useRef<HTMLDivElement>(null);
  const contacts = useRef<HTMLDivElement>(null);
  const languages = useRef<HTMLDivElement>(null);
  const license = useRef<HTMLDivElement>(null);

  const sectionRefs = [personalInfo, address, contacts, languages, license];

  const handleTabClick = (index: number) => {
    setActiveTab(index);

    switch (tabs[index].title) {
      case "Personal Information":
        personalInfo.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "Address":
      case "Location":
        address.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "Contacts":
        contacts.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "Languages":
        languages.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "License":
        license.current?.scrollIntoView({ behavior: "smooth" });
        break;
      default:
        break;
    }
  };


  if (!user) return <Loading />;

  return (
    <>
      <section className="flex gap-6 flex-col md:flex-row">
        <div className="flex md:flex-[30%] flex-col max-h-[27rem] rounded-2xl bg-white py-4 px-3 md:p-5 md:justify-center gap-6">
          <div className="flex items-center gap-2 sm:gap-4 md:flex-col">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-md md:rounded-lg overflow-hidden relative">
              <img
                src={
                  user?.profilePhoto
                    ? user.profilePhoto
                    : `https://api.multiavatar.com/${user?.firstName}.svg`
                }
                alt="profile"
                className="absolute inset-0 object-cover aspect-square"
              />
            </div>
            <div className="space-y-0.5 md:space-y-1 font-medium">
              <Paragraph className="text-sm sm:text-base uppercase text-[#39097C]">
                {user?.firstName} {user?.lastName}
              </Paragraph>
              <Paragraph className="text-xs sm:text-sm text-error">
                No Active Subscription
              </Paragraph>
            </div>
          </div>

          <div className="flex-col gap-2 hidden md:flex">
            {tabs.map((tab, index) => (
              <div
                key={index}
                className={`flex gap-1 w-full h-8 p-2 hover:bg-purple-8 items-center rounded-sm cursor-pointer duration-200 ${activeTab === index
                  ? "text-[#39097C] bg-purple-8"
                  : "text-text-subtle"
                  }`}
                onClick={() => handleTabClick(index)}
              >
                <tab.icon className="w-5 h-5" strokeWidth={2} />
                <Paragraph className={`text-sm`}>{tab.title}</Paragraph>
              </div>
            ))}
          </div>
        </div>

        <div className="flex md:flex-[70%] flex-col gap-4">
          <div className="rounded-2xl p-6 bg-white hidden lg:flex">
            <Heading3 className="font-medium text-2xl">My Profile</Heading3>
          </div>

          {user.role === "patient" ? (
            <PatientProfileInfo user={user} />
          ) : (
            <DoctorProfileInfo
              user={user}
              refs={{
                personalInfo,
                address,
                contacts,
                languages,
                license,
              }}
            />
          )}
        </div>
      </section>

      {user.role === "patient"
        ? openEditModal && (
          <EditPatientProfileModal
            open={openEditModal}
            onOpenChange={() =>
              router.push(updateUrl("edit", "false", ["edit"]))
            }
            // @ts-expect-error types not matching yet
            data={user}
          />
        )
        : openEditModal && (
          <EditDoctorProfileModal
            open={openEditModal}
            onOpenChange={() =>
              router.push(updateUrl("edit", "false", ["edit"]))
            }
            data={user}
          />
        )}
    </>
  );
}
