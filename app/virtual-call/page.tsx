"use client";

import { useSearchParams } from "next/navigation";
import WaitingScreen from "@/components/virtual-call/waiting-screen";

export default function VirtualCall() {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const channelName = searchParams.get("channelName");

  return (
    <WaitingScreen
      token={token}
      channelName={channelName}
    />
  );
}