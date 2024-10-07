import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface PrescriptionRefillState {
  value: {
    contactInfo: {
      name: string;
      phone: string;
      dob: string;
      address: string;
    };
    allergies: string[];
    pastMedicalHistory: string[];
    currentMedications: string[];
    complaints: string;
    medications: {
      name: string;
      duration: string;
    }[];
    pharmacyInfo: {
      name: string;
      phone: string;
      address: string;
    };
  };
  setValue: Dispatch<SetStateAction<PrescriptionRefillState["value"]>>;
}

const initialValue = {
  contactInfo: {
    name: "",
    phone: "",
    dob: "",
    address: "",
  },
  allergies: [],
  pastMedicalHistory: [],
  currentMedications: [],
  complaints: "",
  medications: [],
  pharmacyInfo: {
    name: "",
    phone: "",
    address: "",
  },
};

const PrescriptionRefillContext = createContext<
  PrescriptionRefillState | undefined
>(undefined);

export function PrescriptionRefillProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [value, setValue] = useState<PrescriptionRefillState["value"]>(
    JSON.parse(`${localStorage.getItem("start-refill")}`) || initialValue
  );

  React.useEffect(() => {
    localStorage.setItem("start-refill", JSON.stringify(value));
  }, [value]);

  return (
    <PrescriptionRefillContext.Provider value={{ value, setValue }}>
      {children}
    </PrescriptionRefillContext.Provider>
  );
}

export function usePrescriptionRefill() {
  const context = useContext(PrescriptionRefillContext);
  if (context === undefined) {
    throw new Error(
      "usePrescriptionRefill must be used within a PrescriptionRefillProvider"
    );
  }
  return context;
}
