"use client";

import { IDoctorDetails } from "@/components/virtual-call/waiting-screen";
import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface DoctorContext {
  doctor: IDoctorDetails | null;
  setDoctor: Dispatch<SetStateAction<IDoctorDetails | null>>;
}

const initialState: IDoctorDetails | null = null;

const DoctorContext = createContext<DoctorContext>({
  doctor: initialState,
  setDoctor: () => null,
});

const DoctorProvider = ({ children }: { children: React.ReactNode }) => {
  const [doctor, setDoctor] = useState<IDoctorDetails | null>(initialState);

  return (
    <DoctorContext.Provider value={{ doctor, setDoctor }}>
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctor = () => useContext(DoctorContext);

export default DoctorProvider;
