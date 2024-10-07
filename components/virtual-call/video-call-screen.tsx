"use client";

import { AppointmentStatusModal } from "@/components/modals/appointment/appointment-status-modal";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { InCallChat } from "@/components/virtual-call/in-call-chat";
import Paragraph from "@/components/ui/typography/paragraph";
import { useSimplePeer } from "@/hooks/useSimplePeer";
import { useState } from "react";
import { useEffect } from "react";
import { SignalData } from "simple-peer";
import { useUser } from "@/context/user";
import { useSearchParams } from "next/navigation";
import { RejectAppointmentData } from "../modals/appointment/reject-appointment-modal";

interface Props {
  doctorName: string;
  patientName: string;
  webrtcSignalServerUrl: string;
}

export function VideoCallScreen({
  doctorName,
  patientName,
  webrtcSignalServerUrl,
}: Props) {
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isVideoStopped, setIsVideoStopped] = useState<boolean>(false);
  const [showChat, setShowChat] = useState<boolean>(false);
  const [showPrescription, setShowPrescription] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [previousMessages, setPreviousMessages] = useState<string[]>([]);

  const { User } = useUser();
  const params = useSearchParams();
  const appointmentId = params.get("appointment");

  const appointmentData: RejectAppointmentData = {
    name: doctorName,
    appointmentId: appointmentId!,
  };

  const {
    localVideoRef,
    remoteVideoRef,
    endCall,
    toggleMute: muteFn,
    toggleVideo: videoFn,
    registerUser,
    handleSignal,
  } = useSimplePeer(false, webrtcSignalServerUrl);

  useEffect(() => {
    registerUser(User?.id!);

    const signalingServer = new WebSocket(webrtcSignalServerUrl);

    signalingServer.onmessage = (message) => {
      const signalData: SignalData = JSON.parse(message.data);
      handleSignal(signalData);
    };

    return () => {
      endCall();
    };
  }, [webrtcSignalServerUrl]);

  const toggleMute = () => {
    muteFn();
    setIsMuted((prev) => !prev);
  };

  const toggleVideo = () => {
    videoFn();
    setIsVideoStopped((prev) => !prev);
  };

  const toggleCall = () => {
    endCall();
    setModalOpen(true);
  };

  const addNewMessage = (message: string) => {
    const messages = previousMessages;
    messages.push(message);
    setPreviousMessages(messages);
  };

  const togglePrescription = () => {
    setShowChat((prev) => !prev);
    setShowPrescription((prev) => !prev);
  };

  return (
    <>
      <div className="h-screen bg-black px-3 md:px-0">
        <div
          className={`${showChat ? "max-w-5xl" : "max-w-4xl"
            } flex flex-col justify-between h-[80%] w-full mx-auto md:flex-row`}
        >
          <div
            className={`${showChat ? "max-w-lg" : "max-w-4xl"
              } relative flex bg-gray-950 mb-6 h-1/2 md:h-auto`}
          >
            <div>
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full"
              />

              <div className="absolute bottom-0 right-0 lg:-right-10 w-1/2 md:w-1/3">
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-auto rounded-[20px]"
                />

                <div className="absolute bottom-5 left-5 rounded-[40px] bg-[#3B008F] py-1 px-5 text-center">
                  <Paragraph
                    className={`${showChat ? "text-xs" : "text-sm"} text-white`}
                  >
                    {User?.role === "patient" ? patientName : doctorName}
                  </Paragraph>
                </div>
              </div>

              <div className="absolute top-2 left-4 md:top-16 md:left-8 rounded-[40px] bg-[#3B008F] py-1 px-5 text-center">
                <Paragraph
                  className={`${showChat ? "text-xs" : "text-sm"} text-white`}
                >
                  {User?.role === "patient" ? doctorName : patientName}
                </Paragraph>
              </div>
            </div>
          </div>

          {showChat && (
            <div className="my-6 h-1/2 md:h-auto">
              <InCallChat
                closeFn={() => setShowChat(false)}
                name={User?.role === "patient" ? patientName : doctorName}
                currentMessages={previousMessages}
                storeMessage={addNewMessage}
                showPrescription={showPrescription}
              />
            </div>
          )}
        </div>

        <div className="flex justify-between mt-8 mb-6 w-full mx-auto md:space-x-[60px] md:w-2/3 lg:w-1/3">
          <div className="flex flex-col items-center">
            <Button onClick={toggleMute} variant={"ghost"} className="p-0">
              <Icons.micIcon fill={isMuted ? "#EA2000" : "white"} />
            </Button>
            <Paragraph className="text-sm text-white mt-2">
              {isMuted ? "Unmute" : "Mute"}
            </Paragraph>
          </div>

          <div className="flex flex-col items-center">
            <Button variant={"ghost"} onClick={toggleVideo} className="p-0">
              <Icons.videoCam fill={isVideoStopped ? "#EA2000" : "white"} />
            </Button>
            <Paragraph className="text-sm text-white mt-2">
              {isVideoStopped ? "Start Video" : "Stop Video"}
            </Paragraph>
          </div>

          {User?.role === "patient" && (
            <div className="flex flex-col items-center">
              <Button variant={"ghost"} onClick={toggleCall} className="p-0">
                <Icons.callIcon />
              </Button>
              <Paragraph className="text-sm text-white mt-2">
                End Call
              </Paragraph>
            </div>
          )}

          <div className="flex flex-col items-center">
            <Button
              variant={"ghost"}
              onClick={() => setShowChat((prev) => !prev)}
              className="p-0"
            >
              <Icons.chatIcon />
            </Button>
            <Paragraph className="text-sm text-white mt-2">
              In-call Chat
            </Paragraph>
          </div>

          {User?.role === "doctor" && (
            <>
              <div className="flex flex-col items-center">
                <Button
                  variant={"ghost"}
                  onClick={togglePrescription}
                  className="p-0"
                >
                  <Icons.prescriptionIcon />
                </Button>
                <Paragraph className="text-sm text-white mt-2">
                  Prescription
                </Paragraph>
              </div>

              <div className="flex flex-col items-center">
                <Button variant={"ghost"} onClick={toggleCall} className="p-0">
                  <Icons.callIcon />
                </Button>
                <Paragraph className="text-sm text-white mt-2">
                  End Call
                </Paragraph>
              </div>
            </>
          )}
        </div>
      </div>

      <AppointmentStatusModal
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        data={appointmentData}
      />
    </>
  );
}