'use client'
import { createContext, useContext, useState, ReactNode } from "react";

interface AppointmentInfo {
    patientFirstName: string;
    patientLastName: string;
    doctorFirstName: string;
    doctorLastName: string;
    doctorType: string;
    rating: number;
    imgUrl: string;
    profilePhoto: string;
}

const AppointmentContext = createContext<{
    appointmentInfoData: AppointmentInfo | null;
    setAppointmentInfoData: (data: AppointmentInfo) => void;
} | null>(null);

export const AppointmentProvider = ({ children }: { children: ReactNode }) => {
    const [appointmentInfoData, setAppointmentInfoData] = useState<AppointmentInfo | null>(null);

    return (
        <AppointmentContext.Provider value={{ appointmentInfoData, setAppointmentInfoData }}>
            {children}
        </AppointmentContext.Provider>
    );
};

export const useAppointment = () => {
    const context = useContext(AppointmentContext);
    if (!context) {
        throw new Error("useAppointment must be used within an AppointmentProvider");
    }
    return context;
};
