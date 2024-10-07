import {
  TDoctorPrescriptionInfo,
  TGeneralPractitionerPrescriptionInfo,
} from "@/api/dashboard/prescription/get-doctor-prescription";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Paragraph from "@/components/ui/typography/paragraph";
import { cn } from "@/lib/utils";
import { CalendarIcon, ClockIcon } from "lucide-react";
import React, { useState } from "react";

export function PrescribedPrescriptionsDetails({
  data,
  setIsOpen,
}: {
  data: TGeneralPractitionerPrescriptionInfo;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [currentTab, setCurrentTab] = useState("appointment");

  return (
    <>
      <div className="border-b border-gray-100 bg-white py-4 px-3 rounded-md drop-shadow-[0_4px_24px_0px_rgba(0,0,0,0.8)]">
        <nav className="-mb-px flex space-x-8 " aria-label="Tabs">
          {(["appointment", "prescription"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setCurrentTab(tab)}
              className={cn(
                tab === currentTab
                  ? "border-[#4141A4] border-b-4 text-[#4141A4]"
                  : "text-[#4F5E71CC]",
                "group inline-flex gap-3 items-center py-1 px-1 text-[15px] font-normal transition-all duration-200 ease-in-out cursor-pointer whitespace-nowrap"
              )}
            >
              {tab === "appointment"
                ? "Appointment Details"
                : "Prescription Details"}
            </button>
          ))}
        </nav>
      </div>

      {currentTab === "appointment" ? (
        <AppointmentDetails data={data} />
      ) : (
        <PrescriptionDetails data={data} />
      )}
    </>
  );
}

const AppointmentDetails = ({
  data,
}: {
  data: TGeneralPractitionerPrescriptionInfo;
}) => {
  return (
    <Accordion
      type="single"
      defaultValue="appointment-details"
      collapsible
      className="w-full space-y-6"
    >
      <AccordionItem value="appointment-details" className="space-y-6">
        <AccordionTrigger className="text-text text-sm">
          Appointment Details
        </AccordionTrigger>
        <AccordionContent className="px-3 space-y-4">
          <section className="flex flex-col gap-4">
            <header className="text-text text-sm">Appointment with</header>

            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={data.approvedBy.personalInfo.imgUrl}
                  alt={data.approvedBy.personalInfo.firstName}
                />
                <AvatarFallback>
                  {data.approvedBy
                    ? data.approvedBy.personalInfo.firstName.charAt(0)
                    : ""}
                </AvatarFallback>
              </Avatar>

              <Paragraph className="text-text text-sm font-medium capitalize">
                {data.prescribedTo
                  ? `${data.prescribedTo.firstName} ${data.prescribedTo.lastName}`
                  : ""}
              </Paragraph>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <header className="text-text text-sm">
              Appointment Information
            </header>

            <div className="flex items-center flex-wrap gap-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <CalendarIcon className="h-5 w-5" />
                <span>October 25, 2023</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <ClockIcon className="h-5 w-5" />
                <span>12:00 - 12:30 PM</span>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <header className="text-text text-sm">Patient Notes</header>
            <Paragraph className="text-text text-sm">{data.notes}</Paragraph>
          </section>

          <section>
            <h3 className="font-semibold mb-2">Uploaded Files</h3>
            <a href="#" className="text-blue-600 hover:underline">
              {data.approvedBy.personalInfo.firstName} - medical report -
              1023.png
            </a>
          </section>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="doctors-note" className="space-y-6">
        <AccordionTrigger className="text-text text-sm">
          Doctor's Note & Patient Allergies
        </AccordionTrigger>
        <AccordionContent
          className="px-3 space-y-4
        "
        >
          <div className="flex flex-col gap-4">
            <header className="text-text text-sm">Doctor's Note</header>

            <div className="space-y-2.5 ">
              {data.notes.length === 0 ? (
                <Paragraph className="text-text text-sm ">None</Paragraph>
              ) : (
                <Paragraph className="text-text text-sm ">
                  {data.notes}
                </Paragraph>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <header className="text-text text-sm">Patient Allergies</header>

            <div className="flex items-center gap-3 ">
              {data.prescribedTo.allergies.length === 0 ? (
                <Paragraph className="text-text text-sm ">None</Paragraph>
              ) : (
                data.prescribedTo.allergies.map((item, index) => (
                  <>
                    <Paragraph key={index} className="text-text text-sm ">
                      {item}{" "}
                      {index < data.prescribedTo.allergies.length - 1 && ","}
                    </Paragraph>
                  </>
                ))
              )}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="prescription" className="space-y-6">
        <AccordionTrigger className="text-text text-sm">
          Prescription
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2.5 ">
            <div className="flex items-center justify-between *:text-text *:text-sm *:fnm">
              <Paragraph className="text-text text-sm ">
                Medication Name
              </Paragraph>
              <Paragraph className="text-text text-sm ">Duration</Paragraph>
            </div>

            {data.medications.length === 0 ? (
              <Paragraph className="text-text text-sm ">None</Paragraph>
            ) : (
              data.medications.map((item, index) => (
                <React.Fragment key={index}>
                  <Paragraph className="text-text text-sm w-full flex justify-between items-center">
                    <span className="text-[#727A8B]">{item?.name}:</span>
                    {item?.duration}
                  </Paragraph>
                  {index < data.medications.length - 1 && <Separator />}
                </React.Fragment>
              ))
            )}
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="pharmacy" className="space-y-6">
        <AccordionTrigger className="text-text text-sm">
          Pharmacy Details
        </AccordionTrigger>
        <AccordionContent className="px-2">
          <div className="space-y-2.5 ">
            <Paragraph className="text-text text-sm w-full flex justify-between items-center">
              <span className="text-[#727A8B]">Pharmacy Name:</span>
              {data.pharmacy.name}
            </Paragraph>
            <Separator />
            <Paragraph className="text-text text-sm w-full flex justify-between items-center">
              <span className="text-[#727A8B]">Pharmacy Address:</span>
              {data.pharmacy.address}
            </Paragraph>
            <Separator />
            <Paragraph className="text-text text-sm w-full flex justify-between items-center">
              <span className="text-[#727A8B]">Pharmacy Phone:</span>
              {data.pharmacy.phone}
            </Paragraph>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const PrescriptionDetails = ({ data }: { data: TDoctorPrescriptionInfo }) => {
  return (
    <section className="space-y-5 md:space-y-6 pb-10">
      <div className="space-y-2.5 *:capitalize">
        <Paragraph className="text-text text-sm w-full flex justify-between items-center">
          <span className="text-[#727A8B]">Patient Name:</span>
          {data.contact.name}
        </Paragraph>
        <Paragraph className="text-text text-sm w-full flex justify-between items-center">
          <span className="text-[#727A8B]">Date of Birth:</span>
          {data.contact.dob}
        </Paragraph>
        <Paragraph className="text-text text-sm w-full flex justify-between items-center">
          <span className="text-[#727A8B]">Address:</span>
          {data.contact.address}
        </Paragraph>
        <Paragraph className="text-text text-sm w-full flex justify-between items-center">
          <span className="text-[#727A8B]">Phone Number:</span>
          {data.contact.phone}
        </Paragraph>
        <Paragraph className="text-text text-sm w-full flex justify-between items-center">
          <span className="text-[#727A8B]">Sex:</span>
          {data.prescribedTo.sex}
        </Paragraph>
      </div>

      <Header>Allergies</Header>

      <div className="space-y-2.5 ">
        {data.allergies.length === 0 ? (
          <Paragraph className="text-text text-sm ">None</Paragraph>
        ) : (
          data.allergies.map((item, index) => (
            <>
              <Paragraph key={index} className="text-text text-sm ">
                {item}
              </Paragraph>
              {index < data.allergies.length - 1 && <Separator />}
            </>
          ))
        )}
      </div>

      <Header>Past Medical History</Header>

      <div className="space-y-2.5 ">
        {data.medicalHistory.length === 0 ? (
          <Paragraph className="text-text text-sm ">None</Paragraph>
        ) : (
          data.medicalHistory.map((item, index) => (
            <React.Fragment key={index}>
              <Paragraph className="text-text text-sm ">{item}</Paragraph>
              {index < data.medicalHistory.length - 1 && <Separator />}
            </React.Fragment>
          ))
        )}
      </div>

      <Header>Current Medications</Header>

      <div className="space-y-2.5 ">
        {data.currentMedication.length === 0 ? (
          <Paragraph className="text-text text-sm ">None</Paragraph>
        ) : (
          data.currentMedication.map((item, index) => (
            <React.Fragment key={index}>
              <Paragraph className="text-text text-sm ">{item}</Paragraph>
              {index < data.currentMedication.length - 1 && <Separator />}
            </React.Fragment>
          ))
        )}
      </div>

      <Header>Complaints</Header>

      <div className="space-y-2.5 ">
        {data.complaints.length === 0 ? (
          <Paragraph className="text-text text-sm ">None</Paragraph>
        ) : (
          <Paragraph className="text-text text-sm ">
            {data.complaints}
          </Paragraph>
        )}
      </div>

      <Header>Medication List</Header>

      <div className="space-y-2.5 ">
        <div className="flex items-center justify-between *:text-text *:text-sm *:fnm">
          <Paragraph className="text-text text-sm ">Medication Name</Paragraph>
          <Paragraph className="text-text text-sm ">Duration</Paragraph>
        </div>

        {data.medications.length === 0 ? (
          <Paragraph className="text-text text-sm ">None</Paragraph>
        ) : (
          data.medications.map((item, index) => (
            <React.Fragment key={index}>
              <Paragraph className="text-text text-sm w-full flex justify-between items-center">
                <span className="text-[#727A8B]">{item?.name}:</span>
                {item?.duration}
              </Paragraph>
              {index < data.medications.length - 1 && <Separator />}
            </React.Fragment>
          ))
        )}
      </div>

      <Header>Pharmacy Details</Header>

      <div className="space-y-2.5 ">
        <Paragraph className="text-text text-sm w-full flex justify-between items-center">
          <span className="text-[#727A8B]">Pharmacy Name:</span>
          {data.pharmacy.name}
        </Paragraph>
        <Separator />
        <Paragraph className="text-text text-sm w-full flex justify-between items-center">
          <span className="text-[#727A8B]">Pharmacy Address:</span>
          {data.pharmacy.address}
        </Paragraph>
        <Separator />
        <Paragraph className="text-text text-sm w-full flex justify-between items-center">
          <span className="text-[#727A8B]">Pharmacy Phone:</span>
          {data.pharmacy.phone}
        </Paragraph>
      </div>

      <Header>Approval Reason</Header>
      <Paragraph className="text-text text-sm w-full flex justify-between items-center">
        {data.reason}
      </Paragraph>
    </section>
  );
};

const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[52px] md:h-[60px] bg-[#FAFAFB] text-left flex items-center mb-6 px-5">
      <Paragraph className="text-text text-sm ">{children}</Paragraph>
    </div>
  );
};
