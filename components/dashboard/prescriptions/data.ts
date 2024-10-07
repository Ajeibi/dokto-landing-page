import { Allergies } from "./steps/allergies";
import { Complaints } from "./steps/complaints";
import { ContactInformation } from "./steps/contact-info";
import { CurrentMedications } from "./steps/current-medications";
import { Medication } from "./steps/medication";
import { PastMedicalHistory } from "./steps/past-medical-history";
import { PharmacyInfo } from "./steps/pharmacy-info";
import { PrescriptionPayment } from "./steps/prescription-payment";
import { PreviewRefill } from "./steps/preview-refill";
import { SuccessfulRefill } from "./steps/successful-refill";

export const refill_steps = [
  {
    name: "Contact Information",
    component: ContactInformation,
  },
  {
    name: "Allergies",
    component: Allergies,
  },
  {
    name: "Past Medical History",
    component: PastMedicalHistory,
  },
  {
    name: "Current Medications",
    component: CurrentMedications,
  },
  {
    name: "Complaints",
    component: Complaints,
  },
  {
    name: "Medication",
    component: Medication,
  },
  {
    name: "Pharmacy Information",
    component: PharmacyInfo,
  },
  {
    component: PreviewRefill,
  },
  {
    title: "Payment",
    component: PrescriptionPayment,
  },
  {
    component: SuccessfulRefill,
  },
];

export const defaultMedicalHistory = [
  {
    item: "Sickle Cell",
    checked: false,
  },
  {
    item: "Diabetes",
    checked: false,
  },
  {
    item: "Hypertension",
    checked: false,
  },
  {
    item: "Cancer",
    checked: false,
  },
  {
    item: "Asthma",
    checked: false,
  },
];
