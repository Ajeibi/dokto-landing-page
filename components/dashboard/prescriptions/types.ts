export interface Medication {
  id: string;
  medicationName: string;
  dosage: string;
  duration: string;
}

export interface PrescriptionDetails {
  prescriptionId: string;
  prescriptionType: string;
  approvedOrDeclinedBy: string;
  noOfMedications: number;
  dateOfPrescription: string;
  medications: Medication[];
  pharmacy: string;
  pharmacyAddress: string;
}
