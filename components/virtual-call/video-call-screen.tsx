"use client";

import AgoraRTC, {
  AgoraRTCProvider,
  LocalVideoTrack,
  RemoteUser,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRTCClient,
  useRemoteAudioTracks,
  useRemoteUsers,
} from "agora-rtc-react";
import { useState } from "react";
import { Button } from "../ui/button";
import Paragraph from "../ui/typography/paragraph";
import { Icons } from "../icons";
import { useAppointment } from "@/context/appointments";
import { useUser } from "@/context/user";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSearchParams } from "next/navigation";
import { RejectAppointmentData } from "../modals/appointment/reject-appointment-modal";
import { AppointmentStatusModal } from "@/components/modals/appointment/appointment-status-modal";

function Call(props: { appId: string; channelName: string }) {
  const client = useRTCClient(
    AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })
  );

  return (
    <AgoraRTCProvider client={client}>
      <Videos channelName={props.channelName} AppID={props.appId} />
    </AgoraRTCProvider>
  );
}

function Videos(props: { channelName: string; AppID: string }) {
  const { AppID, channelName } = props;
  const { isLoading: isLoadingMic, localMicrophoneTrack } = useLocalMicrophoneTrack();
  const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);
  const { User } = useUser();

  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(false);
  const [isJoined, setIsJoined] = useState(true);

  const { appointmentInfoData } = useAppointment();

  const doctorLastName = appointmentInfoData?.doctorLastName;
  const doctorFirstName = appointmentInfoData?.doctorFirstName;
  const patientLastName = appointmentInfoData?.patientLastName;
  const patientFirstName = appointmentInfoData?.patientFirstName;
  const fullPatientName = `${patientFirstName} ${patientLastName}`;
  const fullDoctorName = `${doctorFirstName} ${doctorLastName}`;

  const doctorType = appointmentInfoData?.doctorType;
  const rating = appointmentInfoData?.rating;
  const imgUrl = appointmentInfoData?.imgUrl
  const profilePhoto = appointmentInfoData?.profilePhoto;


  usePublish([localMicrophoneTrack, localCameraTrack]);
  useJoin({
    appid: AppID,
    channel: channelName,
    token: null,
  });

  audioTracks.map((track) => track.play());

  const toggleMic = () => {
    if (localMicrophoneTrack) {
      localMicrophoneTrack.setEnabled(!isMicMuted);
      setIsMicMuted(!isMicMuted);
    }
  };

  const toggleCam = () => {
    if (localCameraTrack) {
      localCameraTrack.setEnabled(!isCamOff);
      setIsCamOff(!isCamOff);
    }
  };

  const endCall = async () => {
    const client = AgoraRTC.createClient({ codec: "vp8", mode: "rtc" });
    await client.leave();
    setIsJoined(false);
    setModalOpen(true);
  };

  const isDoctor = User?.role === "doctor";
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const params = useSearchParams();
  const appointmentId = params.get("channelName");

  const appointmentData: RejectAppointmentData = {
    name: "",
    appointmentId: appointmentId!,
  };

  return (
    <>
      <div className="relative w-full h-screen bg-black flex flex-col items-center justify-between">
        {remoteUsers.length === 0 ? (
          <>
            <section>
              {isDoctor ? (
                <div className="text-center md:mt-5 mt-2 mb-2">
                  <Paragraph className="md:text-sm text-xs font-normal md:font-medium md:mb-5 mb-2 text-white">
                    Upcoming Appointment With
                  </Paragraph>

                  <div className="flex justify-center items-center gap-3 text-left">
                    <Avatar className="w-[50px] h-[50px] rounded-sm">
                      <AvatarImage
                        src={profilePhoto || ""}
                        alt={fullPatientName}
                      />
                      <AvatarFallback className="uppercase">
                        {fullPatientName
                          ? `${fullPatientName.split(" ")[0].charAt(0)}${fullPatientName.split(" ")[1].charAt(0)}`
                          : ""}
                      </AvatarFallback>
                    </Avatar>

                    <Paragraph className="md:text-sm text-xs font-medium text-white">
                      {fullPatientName}
                    </Paragraph>
                  </div>
                </div>
              ) : (
                <div className="text-center md:mt-5 mt-2 mb-2">
                  <Paragraph className="md:text-sm text-xs font-normal md:font-medium md:mb-5 mb-2 text-white">
                    Upcoming Appointment With
                  </Paragraph>

                  <div className="flex justify-center gap-3">
                    <Avatar className="w-[50px] h-[50px] rounded-sm">
                      <AvatarImage
                        src={imgUrl || ""}
                        alt={doctorLastName}
                      />
                      <AvatarFallback className="uppercase">
                        {fullDoctorName
                          ? `${fullDoctorName.split(" ")[0].charAt(0)}${fullDoctorName.split(" ")[1].charAt(0)}`
                          : ""}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col justify-between text-left">
                      <Paragraph className="font-medium text-white">
                        {fullDoctorName}
                      </Paragraph>
                      <div>
                        <Paragraph className="text-sm font-medium text-[#FFFFFFB2] mb-2">
                          {doctorType}
                        </Paragraph>

                        {/* <Paragraph className="text-sm">
                      <span className="flex ">
                        {[...Array(totalStars)].map((_, i) => {
                          const rate = i + 1;
                          const rating = doctor?.rating!;
                          return (
                            <Icons.star
                              key={i}
                              fill={rating >= rate ? "#D78B07" : "#D78B0740"}
                            />
                          );
                        })}
                      </span>
                      <span className="text-[#FFFFFFB2]">
                        {rating} Review{doctor?.rating! > 1 ? "s" : ""}
                      </span>
                    </Paragraph> */}

                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="bg-white p-4 shadow-md rounded-2xl mt-2 mb-5">
                <Paragraph className="text-center md:text-sm text-xs text-black">
                  {isDoctor
                    ? `${fullPatientName} is about to join the call, please hold on for a few minutes.`
                    : `Dr. ${doctorLastName} is about to join the call, please hold on for a few minutes.`}
                </Paragraph>
              </div>
            </section>

            <div className="flex-1 flex items-center justify-center w-full relative">
              <div className="w-[50%] h-[100%] bg-gray-950 rounded-2xl overflow-hidden relative">
                <LocalVideoTrack
                  track={localCameraTrack}
                  play={true}
                  className="w-full h-full object-cover"
                />
                <div className="absolute flex justify-center items-center rounded-[40px] bg-[#3B008F] text-white py-1 px-5 text-center bottom-[100px] left-1/2 transform -translate-x-1/2">
                  {isDoctor ? `Dr. ${fullDoctorName}` : `${fullPatientName}`}
                </div>
              </div>
            </div>

          </>
        ) : (
          <>
            <div className="absolute inset-0 z-0 md:mx-20 mb-[100px]">
              <RemoteUser
                user={remoteUsers[0]}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute bottom-[100px] right-4 w-[25%] h-[30%] z-10 rounded-full">
              <LocalVideoTrack
                track={localCameraTrack}
                play={true}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </>
        )}

        <div className="absolute bottom-0 w-full md:space-x-[60px] justify-center space-x-4 flex">
          <div className="flex flex-col items-center">
            <Button onClick={toggleMic} variant={"ghost"} className="p-0">
              <Icons.micIcon fill={isMicMuted ? "red" : "white"} />
            </Button>
            <Paragraph className="text-sm text-white mt-2">
              {isMicMuted ? "Unmute" : "Mute"}
            </Paragraph>
          </div>
          <div className="flex flex-col items-center">
            <Button onClick={toggleCam} variant={"ghost"} className="p-0">
              <Icons.videoCam fill={isCamOff ? "red" : "white"} />
            </Button>
            <Paragraph className="text-sm text-white mt-2">
              {isCamOff ? "Start Video" : "Stop Video"}
            </Paragraph>
          </div>
          <div>
            <Button variant={"ghost"} onClick={endCall} className="p-0">
              <Icons.callIcon />
            </Button>
            <Paragraph className="text-sm text-white">End Call</Paragraph>
          </div>
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

export default Call;