"use client";

// import { AppointmentStatusModal } from "@/components/modals/appointment/appointment-status-modal";
// import { Button } from "@/components/ui/button";
// import { Icons } from "@/components/icons";
// import Image from "next/image";
// import Paragraph from "@/components/ui/typography/paragraph";
// import { RefObject, useState } from "react";
// import { useDoctor } from "@/context/doctor";
// import { useSearchParams } from "next/navigation";
// import { RejectAppointmentData } from "../modals/appointment/reject-appointment-modal";
// export interface IDoctorDetails {
//     name: string;
//     role: string;
//     image: string;
//     ratings: number;
// }

// interface Props {
//     patientName: string;
//     localVideoRef: RefObject<HTMLVideoElement>;
//     toggleMute: () => void;
//     isMuted: boolean;
//     toggleVideo: () => void;
//     isVideoStopped: boolean;
//     toggleCall: () => void;
// }

// export function DoctorWaitingScreen({
//     patientName,
//     localVideoRef,
//     isMuted,
//     isVideoStopped,
//     toggleMute,
//     toggleVideo,
//     toggleCall,
// }: Props) {
//     const [modalOpen, setModalOpen] = useState<boolean>(false);

//     const { doctor } = useDoctor();

//     const params = useSearchParams();
//     const appointmentId = params.get("appointment");

//     const appointmentData: RejectAppointmentData = {
//         name: "",
//         appointmentId: appointmentId!,
//     };

//     const handleToggleCall = () => {
//         toggleCall();
//         setModalOpen(true);
//     };

//     return (
//         <>
//             <div className="flex flex-col items-center justify-center min-h-screen bg-black pb-10 px-3 md:px-0">
//                 <div className="text-center mt-20 mb-[52px]">
//                     <Paragraph className="text-base font-medium mb-[52px] text-white">
//                         Upcoming Appointment With
//                     </Paragraph>

//                     <div className="flex justify-center mt-4 gap-3 text-left">
//                         <Image
//                             src={doctor?.image!}
//                             width={100}
//                             height={100}
//                             alt={`${doctor?.name!} image`}
//                             className="w-[100px] h-[100px] rounded-[4px]"
//                         />

//                         <Paragraph className="font-medium text-white">
//                             {doctor?.name!}
//                         </Paragraph>
//                     </div>
//                 </div>

//                 <div className="bg-[#F9F6FD] p-5 rounded-2xl mb-12 w-full max-w-xl">
//                     <Paragraph className="text-sm text-[#4F5E71CC]">
//                         {patientName} is about to join the call, please hold on for a few
//                         minutes.
//                     </Paragraph>
//                 </div>

//                 <div className="relative rounded-[20px] mb-24 w-full max-w-2xl text-center flex items-center justify-center">
//                     <video
//                         ref={localVideoRef}
//                         autoPlay
//                         playsInline
//                         muted
//                         className="w-full h-auto rounded-lg"
//                     />
//                     <div className="absolute rounded-[40px] bg-[#3B008F] py-1 px-5 text-center bottom-5">
//                         <Paragraph className="text-sm text-white">{doctor?.name}</Paragraph>
//                     </div>
//                 </div>

//                 <div className="flex space-x-4 md:space-x-[60px]">
//                     <div className="flex flex-col items-center">
//                         <Button onClick={toggleMute} variant={"ghost"} className="p-0">
//                             <Icons.micIcon />
//                         </Button>
//                         <Paragraph className="text-sm text-white mt-2">
//                             {isMuted ? "Unmute" : "Mute"}
//                         </Paragraph>
//                     </div>

//                     <div className="flex flex-col items-center">
//                         <Button variant={"ghost"} onClick={toggleVideo} className="p-0">
//                             <Icons.videoCam />
//                         </Button>
//                         <Paragraph className="text-sm text-white mt-2">
//                             {isVideoStopped ? "Start Video" : "Stop Video"}
//                         </Paragraph>
//                     </div>

//                     <div className="flex flex-col items-center">
//                         <Button
//                             variant={"ghost"}
//                             onClick={handleToggleCall}
//                             className="p-0"
//                         >
//                             <Icons.callIcon />
//                         </Button>
//                         <Paragraph className="text-sm text-white mt-2">End Call</Paragraph>
//                     </div>
//                 </div>
//             </div>

//             <AppointmentStatusModal
//                 isOpen={modalOpen}
//                 setIsOpen={setModalOpen}
//                 data={appointmentData}
//             />
//         </>
//     );
// }

import React from 'react'
import Call from './video-call-screen';

interface DoctorWaitingScreenProps {
    token: string | null;
    channelName: string | null;
}

const DoctorWaitingScreen: React.FC<DoctorWaitingScreenProps> = ({ channelName, token }) => {
    return (
        <div>
            <Call appId={process.env.NEXT_PUBLIC_AGORA_APP_ID!} channelName={channelName!} />
        </div>
    )
}

export default DoctorWaitingScreen
