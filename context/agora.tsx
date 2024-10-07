'use client';

import React, {
    createContext,
    useContext,
    useState,
    useEffect
} from "react";
import AgoraRTC, { IAgoraRTCClient } from "agora-rtc-sdk-ng";

const AgoraContext = createContext<IAgoraRTCClient | null>(null);

export const useAgora = () => useContext(AgoraContext);

export const AgoraProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [client, setClient] = useState<IAgoraRTCClient | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const agoraClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
            setClient(agoraClient);
        }
    }, []);

    return <AgoraContext.Provider value={client}>
        {children}
    </AgoraContext.Provider>;
};
