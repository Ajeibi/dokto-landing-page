"use client";

import { WaitingScreen } from "@/components/virtual-call/waiting-screen";
import { useUser } from "@/context/user";
import { useSearchParams } from "next/navigation";

export default function VirtualCall() {
  const { User } = useUser();
  const params = useSearchParams();
  const calleeId = params.get("call");

  return (
    <WaitingScreen
      userName={`${User?.firstName} ${User?.lastName}`}
      calleeIdd={calleeId!}
      webrtcSignalServerUrl="https://api.dokto.health/api/v1/"
    />
  );
}