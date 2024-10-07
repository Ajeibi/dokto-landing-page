import {
  useApprovePrescription,
  useRejectPrescription,
} from "@/api/dashboard/prescription/doctor-prescription";
import { TDoctorPrescriptionInfo } from "@/api/dashboard/prescription/get-doctor-prescription";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Paragraph from "@/components/ui/typography/paragraph";
import React from "react";
import { RejectPrescriptionModal } from "./reject-prescription-modal";
import { ApprovePrescriptionModal } from "./approve-prescription-modal";

export function PrescriptionDetailsDoctor({
  data,
  setIsOpen,
}: {
  data: TDoctorPrescriptionInfo;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [openRejectPrescriptionModal, setOpenRejectPrescriptionModal] =
    React.useState(false);

  const [openApprovePrescriptionModal, setOpenApprovePrescriptionModal] =
    React.useState(false);

  return (
    <>
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
            {data.prescribedTo ? data.prescribedTo.sex : ""}
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

        {data.status === "pending" && (
          <div className="w-full flex mt-5 md:mt-12 gap-3 md:gap-5 *:w-full max-w-md ml-auto ">
            <Button
              variant={"destructive"}
              onClick={() => setOpenRejectPrescriptionModal(true)}
            >
              Disapprove Prescription
            </Button>
            <Button onClick={() => setOpenApprovePrescriptionModal(true)}>
              Approve Prescription
            </Button>
          </div>
        )}
      </section>

      <RejectPrescriptionModal
        open={openRejectPrescriptionModal}
        onOpenChange={setOpenRejectPrescriptionModal}
        data={{
          id: data._id,
        }}
        closeModal={() => setIsOpen(false)}
      />

      <ApprovePrescriptionModal
        open={openApprovePrescriptionModal}
        onOpenChange={setOpenApprovePrescriptionModal}
        data={{
          id: data._id,
        }}
        closeModal={() => setIsOpen(false)}
      />
    </>
  );
}

const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[52px] md:h-[60px] bg-[#FAFAFB] text-left flex items-center mb-6">
      <Paragraph className="text-text text-sm ">{children}</Paragraph>
    </div>
  );
};
