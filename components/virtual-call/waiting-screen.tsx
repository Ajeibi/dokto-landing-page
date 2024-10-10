import React from "react";
import Call from "./video-call-screen";

interface WaitingScreenProps {
  token: string | null;
  channelName: string | null;
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