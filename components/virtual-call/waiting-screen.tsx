"use client";

import { DoctorWaitingScreen } from "./doctor-waiting-screen";
import { PatientWaitingScreen } from "./patient-waiting-screen";
import { VideoCallScreen } from "@/components/virtual-call/video-call-screen";
import { useSimplePeer } from "@/hooks/useSimplePeer";
import { useUser } from "@/context/user";
import { useEffect, useState } from "react";

export interface IDoctorDetails {
  name: string;
  role: string;
  image: string;
  ratings: number;
}

interface Props {
  userName: string;
  calleeIdd: string;
  webrtcSignalServerUrl: string;
}

export function WaitingScreen({ calleeIdd, webrtcSignalServerUrl }: Props) {
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isVideoStopped, setIsVideoStopped] = useState<boolean>(false);
  const [callStarted, setCallStarted] = useState<boolean>(false);
  const [callerId, setCallerId] = useState<string>("");
  const [calleeId, setCalleeId] = useState<string>("");
  const [patientName, setPatientName] = useState<string>("");
  const [doctorName, setDoctorName] = useState<string>("");

  const { User } = useUser();

  const onCallInitiated = (initiatorId: string) => {
    setCallStarted(true);

    if (initiatorId === User?.id) {
      setCallerId(User.id);
      setCalleeId(calleeIdd);
    } else {
      setCallerId(initiatorId);
      setCalleeId(User?.id!);
    }
  };

  const {
    localVideoRef,
    endCall,
    toggleMute: muteFn,
    toggleVideo: videoFn,
    callUser,
    registerUser,
    checkCallInitiation,
  } = useSimplePeer(
    User?.role === "patient",
    webrtcSignalServerUrl,
    onCallInitiated
  );

  useEffect(() => {
    const name = `${User?.firstName} ${User?.lastName}`;

    if (User?.role === "patient") {
      setPatientName(name);
    } else {
      setDoctorName(name);
    }

    if (User?.id === callerId) {
      callUser(calleeId);
    }

    registerUser(User?.id!);

    if (checkCallInitiation()) {
      setCallStarted(true);
    }

    return () => {
      endCall();
    };
  }, [User, calleeId, callUser, endCall, registerUser, checkCallInitiation]);

  const toggleMute = () => {
    muteFn();
    setIsMuted((prev) => !prev);
  };

  const toggleVideo = () => {
    videoFn();
    setIsVideoStopped((prev) => !prev);
  };

  if (callStarted) {
    return (
      <VideoCallScreen
        patientName={patientName}
        doctorName={doctorName}
        webrtcSignalServerUrl={webrtcSignalServerUrl}
      />
    );
  }

  return (
    <>
      {User?.role === "patient" ? (
        <PatientWaitingScreen
          patientName={patientName}
          localVideoRef={localVideoRef}
          isMuted={isMuted}
          isVideoStopped={isVideoStopped}
          toggleCall={endCall}
          toggleMute={toggleMute}
          toggleVideo={toggleVideo}
        />
      ) : (
        <DoctorWaitingScreen
          patientName={patientName}
          localVideoRef={localVideoRef}
          isMuted={isMuted}
          isVideoStopped={isVideoStopped}
          toggleCall={endCall}
          toggleMute={toggleMute}
          toggleVideo={toggleVideo}
        />
      )}
    </>
  );
}