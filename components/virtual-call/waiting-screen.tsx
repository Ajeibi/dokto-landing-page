import React from "react";
import Call from "./video-call-screen";

interface WaitingScreenProps {
  token: string | null;
  channelName: string | null;
}
export interface IDoctorDetails {
  name: string;
  role: string;
  image: string;
  ratings: number;
}

const WaitingScreen: React.FC<WaitingScreenProps> = ({
  token,
  channelName,
}) => {
  return (
    <>
      <Call appId={process.env.NEXT_PUBLIC_AGORA_APP_ID!} channelName={channelName!} />
    </>
  );
};

export default WaitingScreen;