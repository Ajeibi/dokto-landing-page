import { Icons } from "@/components/icons";
import { PrescriptionDetails } from "../prescriptions/types";
import Paragraph from "@/components/ui/typography/paragraph";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export interface PatientData extends PrescriptionDetails {
  name: string;
  dateOfBirth: string;
  address: string;
  phoneNumber: string;
  sex: string;
  allergies: string[];
  currentDrugs: string[];
  medicalHistory: string[];
  complaints: string;
  approvalReason: string;
}

interface Props {
  data?: PatientData;
}

export function AppointmentPrescription({ data }: Props) {
  return (
    <>
      {data ? (
        <div>
          <div className="flex flex-col gap-3 mb-6">
            <PatientDetailsWrapper title="Patient Name" value={data.name} />
            <Separator />
            <PatientDetailsWrapper
              title="Date of Birth"
              value={data.dateOfBirth}
            />
            <Separator />
            <PatientDetailsWrapper title="Address" value={data.address} />
            <Separator />
            <PatientDetailsWrapper
              title="Phone Number"
              value={data.phoneNumber}
            />
            <Separator />
            <PatientDetailsWrapper title="Sex" value={data.sex} />
          </div>

          <MedicationWrapper title="Allergies">
            {data.allergies.length > 0 ? (
              data.allergies.map((item) => (
                <Paragraph className="text-sm text-[#232324]">{item}</Paragraph>
              ))
            ) : (
              <Paragraph className="text-sm text-[#232324]">None</Paragraph>
            )}
          </MedicationWrapper>

          <MedicationWrapper title="Past Medical History">
            {data.medicalHistory.length > 0 ? (
              data.medicalHistory.map((item) => (
                <Paragraph className="text-sm text-[#232324]">{item}</Paragraph>
              ))
            ) : (
              <Paragraph className="text-sm text-[#232324]">None</Paragraph>
            )}
          </MedicationWrapper>

          <MedicationWrapper title="Current Medication">
            <div className="space-y-5">
              {data.currentDrugs.map((item) => (
                <Paragraph className="text-[#232324] text-sm">{item}</Paragraph>
              ))}
            </div>
          </MedicationWrapper>

          <MedicationWrapper title="Complaints">
            <Paragraph className="text-[#727A8B] text-sm">
              {data.complaints}
            </Paragraph>
          </MedicationWrapper>

          <MedicationWrapper title="Medication List">
            <div className="space-y-5">
              <DosageWrapper
                heading
                name="Medication Name"
                dosage="Dosage"
                duration="Duration"
              />

              {data.medications.map((drug) => (
                <DosageWrapper
                  name={drug.medicationName}
                  dosage={drug.dosage}
                  duration={drug.duration!}
                />
              ))}
            </div>
          </MedicationWrapper>

          <MedicationWrapper title="Pharmacy Details">
            <div className="flex flex-col gap-3">
              <PatientDetailsWrapper
                title="Pharmacy Name"
                value={data.pharmacy}
              />
              <Separator />
              <PatientDetailsWrapper
                title="Pharmacy Address"
                value={data.pharmacyAddress}
              />
            </div>
          </MedicationWrapper>

          <MedicationWrapper title="Approval Reason">
            <Paragraph className="text-[#727A8B] text-sm">
              {data.approvalReason}
            </Paragraph>
          </MedicationWrapper>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-7 mt-16">
          <Icons.emptyAppointments />
          <Paragraph className="text-center text-sm">
            Oops! you are yet to prescribe drugs for this patient. kindly make
            use of the button below to make one
          </Paragraph>
          <Button>Prescribe Drug</Button>
        </div>
      )}
    </>
  );
}

export function PatientDetailsWrapper({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="flex justify-between">
      <Paragraph className="text-sm text-[#727A8B]">{title}</Paragraph>
      <Paragraph className="text-sm text-[#232324]">{value}</Paragraph>
    </div>
  );
}

export function MedicationWrapper({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <div className="bg-[#FAFAFB] py-5 px-5 mb-4">
        <Paragraph className="text-sm text-[#232324]">{title}</Paragraph>
      </div>
      {children}
    </div>
  );
}

export function DosageWrapper({
  name,
  dosage,
  duration,
  heading = false,
}: {
  name: string;
  dosage: string;
  duration: string;
  heading?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <Paragraph
        className={`w-1/2 ${
          heading
            ? "font-medium text-sm text-[#16111D]"
            : "text-sm text-[#727A8B]"
        }`}
      >
        {name}
      </Paragraph>
      <Paragraph
        className={`text-sm " ${
          heading ? "font-medium text-[#16111D]" : "font-normal text-[#232324]"
        }`}
      >
        {dosage}
      </Paragraph>
      <Paragraph
        className={`text-sm " ${
          heading ? "font-medium text-[#16111D]" : "font-normal text-[#232324]"
        }`}
      >
        {`${duration} ${heading ? "" : "days"}`}
      </Paragraph>
    </div>
  );
}
