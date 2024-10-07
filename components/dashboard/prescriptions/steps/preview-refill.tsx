import React from "react";
import { usePrescriptionRefill } from "../context";
import Paragraph from "@/components/ui/typography/paragraph";
import { Separator } from "@/components/ui/separator";
import { refill_steps } from "../data";
import { Button } from "@/components/ui/button";
import {
  CreatePrescriptionPayload,
  useCreatePrescription,
} from "@/api/dashboard/prescription/create-prescription";

export function PreviewRefill({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { value } = usePrescriptionRefill();
  const { mutateAsync: refillPrescription, isPending } =
    useCreatePrescription();

  function handleRefill() {
    const payload: CreatePrescriptionPayload = {
      contact: value.contactInfo,
      allergies: value.allergies,
      medicalHistory: value.pastMedicalHistory,
      currentMedication: value.currentMedications,
      complaints: value.complaints,
      medicationImage: "",
      deliveryMethod: "",
      pharmacy: value.pharmacyInfo,
      medications: value.medications,
    };

    refillPrescription(payload).then(() => {
      setStep((prev) => prev + 1);
      localStorage.removeItem("start-refill");
    });
  }

  const contactInfo = {
    "Patient Name": value.contactInfo.name,
    "Date of Birth": value.contactInfo.dob,
    Address: value.contactInfo.address,
    "Phone Number": value.contactInfo.phone,
  };

  return (
    <section className="space-y-5 md:space-y-6 pb-10">
      <div className="space-y-2.5 ">
        {Object.entries(contactInfo).map(([key, value]) => (
          <React.Fragment key={key}>
            <Paragraph
              key={key}
              className="text-text text-sm w-full flex justify-between items-center"
            >
              <span className="text-[#727A8B]">{key}:</span>
              {value}
            </Paragraph>
            <Separator />
          </React.Fragment>
        ))}
      </div>

      <Header step={1} />

      <div className="space-y-2.5 ">
        {value.allergies.length === 0 ? (
          <Paragraph className="text-text text-sm ">None</Paragraph>
        ) : (
          value.allergies.map((item, index) => (
            <>
              <Paragraph key={index} className="text-text text-sm ">
                {item}
              </Paragraph>
              {index < value.allergies.length - 1 && <Separator />}
            </>
          ))
        )}
      </div>

      <Header step={2} />

      <div className="space-y-2.5 ">
        {value.pastMedicalHistory.length === 0 ? (
          <Paragraph className="text-text text-sm ">None</Paragraph>
        ) : (
          value.pastMedicalHistory.map((item, index) => (
            <React.Fragment key={index}>
              <Paragraph className="text-text text-sm ">{item}</Paragraph>
              {index < value.medications.length - 1 && <Separator />}
            </React.Fragment>
          ))
        )}
      </div>

      <Header step={3} />

      <div className="space-y-2.5 ">
        {value.currentMedications.length === 0 ? (
          <Paragraph className="text-text text-sm ">None</Paragraph>
        ) : (
          value.currentMedications.map((item, index) => (
            <React.Fragment key={index}>
              <Paragraph className="text-text text-sm ">{item}</Paragraph>
              {index < value.currentMedications.length - 1 && <Separator />}
            </React.Fragment>
          ))
        )}
      </div>

      <Header step={4} />

      <div className="space-y-2.5 ">
        {value.complaints.length === 0 ? (
          <Paragraph className="text-text text-sm ">None</Paragraph>
        ) : (
          <Paragraph className="text-text text-sm ">
            {value.complaints}
          </Paragraph>
        )}
      </div>

      <Header step={5} />

      <div className="space-y-2.5 ">
        <div className="flex items-center justify-between *:text-text *:text-sm *:fnm">
          <Paragraph className="text-text text-sm ">Medication Name</Paragraph>
          <Paragraph className="text-text text-sm ">Duration</Paragraph>
        </div>

        {value.medications.length === 0 ? (
          <Paragraph className="text-text text-sm ">None</Paragraph>
        ) : (
          value.medications.map((item, index) => (
            <React.Fragment key={index}>
              <Paragraph className="text-text text-sm w-full flex justify-between items-center">
                <span className="text-[#727A8B]">{item?.name}:</span>
                {item?.duration}
              </Paragraph>
              {index < value.medications.length - 1 && <Separator />}
            </React.Fragment>
          ))
        )}
      </div>

      <Header step={6} />

      <div className="space-y-2.5 ">
        <Paragraph className="text-text text-sm w-full flex justify-between items-center">
          <span className="text-[#727A8B]">Pharmacy Name:</span>
          {value.pharmacyInfo.name}
        </Paragraph>
        <Separator />
        <Paragraph className="text-text text-sm w-full flex justify-between items-center">
          <span className="text-[#727A8B]">Pharmacy Address:</span>
          {value.pharmacyInfo.address}
        </Paragraph>
        <Separator />
        <Paragraph className="text-text text-sm w-full flex justify-between items-center">
          <span className="text-[#727A8B]">Pharmacy Phone:</span>
          {value.pharmacyInfo.phone}
        </Paragraph>
      </div>

      <div className="w-full flex mt-5 md:mt-12 gap-3 md:gap-5 *:w-full max-w-md ml-auto ">
        <Button variant={"outline"} onClick={() => setStep((prev) => prev - 1)}>
          Back
        </Button>
        <Button onClick={handleRefill} isLoading={isPending}>
          Request for Refill
        </Button>
      </div>
    </section>
  );
}

const Header = ({ step }: { step: number }) => {
  return (
    <div className="h-[52px] md:h-[60px] bg-[#FAFAFB] text-left flex items-center mb-6">
      <Paragraph className="text-text text-sm ">
        {refill_steps[step].name}
      </Paragraph>
    </div>
  );
};
