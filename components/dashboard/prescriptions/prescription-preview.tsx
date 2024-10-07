import Heading3 from "@/components/ui/typography/heading3";
import { PrescriptionData } from "./prescription-form";
import Paragraph from "@/components/ui/typography/paragraph";
import {
  DosageWrapper,
  MedicationWrapper,
  PatientDetailsWrapper,
} from "../appointments/appointment-prescription";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface Props {
  data: PrescriptionData;
  showForm: () => void;
}

export function PrescriptionPreview({ data, showForm }: Props) {
  const sendPrescription = () => {
    console.log(data);
    //todo integrate send prescription endpoint
  };

  return (
    <div>
      <Heading3 className="text-sm font-normal">Preview</Heading3>

      <MedicationWrapper title="Doctor Note & Allergies">
        <div className="mb-9">
          <Paragraph className="text-sm text-[#727A8B]">Doctors Note</Paragraph>
          <Paragraph className="text-xs text-[#4F5E71]">
            {data.doctorNote}
          </Paragraph>
        </div>

        <div>
          <Paragraph className="text-sm text-[#727A8B]">
            Patient Allergies
          </Paragraph>
          <Paragraph className="text-[#232324] text-sm">
            {data.patientAllergies}
          </Paragraph>
        </div>
      </MedicationWrapper>

      <MedicationWrapper title="Medication List">
        <div className="mb-4">
          <DosageWrapper
            heading
            name="Medication Name"
            dosage="Dosage"
            duration="Duration"
          />
        </div>
        <div className="space-y-6">
          {data.drug?.map((drug) => (
            <DosageWrapper
              name={drug.name}
              dosage={drug.dosage}
              duration={drug.duration}
            />
          ))}
        </div>
      </MedicationWrapper>

      <MedicationWrapper title="Pharmacy Details">
        <div className="flex flex-col gap-3">
          <PatientDetailsWrapper
            title="Pharmacy Name:"
            value={data.pharmacyName}
          />
          <Separator />
          <PatientDetailsWrapper
            title="Pharmacy Address:"
            value={data.pharmacyAddress}
          />
        </div>
      </MedicationWrapper>
      <div className="flex gap-5 mt-10">
        <Button onClick={showForm} variant={"outline"} className="w-1/2">
          Back
        </Button>
        <Button onClick={sendPrescription} className="w-1/2">
          Send Prescription
        </Button>
      </div>
    </div>
  );
}
