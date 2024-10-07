// 'use client'

// import { useState, useEffect } from "react";
// import AgoraRTC, { IAgoraRTCClient, ILocalAudioTrack, ILocalVideoTrack } from "agora-rtc-sdk-ng";
// import { AGORA_APP_ID } from "@/components/virtual-call/agora-config";

// export const useAgoraClient = (channelName: string | undefined, token: string | undefined, userId: string | undefined) => {
//     const [client, setClient] = useState<IAgoraRTCClient | null>(null);
//     const [localAudioTrack, setLocalAudioTrack] = useState<ILocalAudioTrack | null>(null);
//     const [localVideoTrack, setLocalVideoTrack] = useState<ILocalVideoTrack | null>(null);
//     const [isMuted, setIsMuted] = useState(false);
//     const [isVideoStopped, setIsVideoStopped] = useState(false);

//     useEffect(() => {
//         if (!channelName || !token || !userId || !AGORA_APP_ID) {
//             console.error("Missing required parameters for Agora client initialization");
//             return;
//         }

//         const agoraClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

//         agoraClient
//             .join(AGORA_APP_ID, channelName, token, userId)
//             .then(async () => {
//                 const [microphoneTrack, cameraTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();

//                 setLocalAudioTrack(microphoneTrack);
//                 setLocalVideoTrack(cameraTrack);

//                 await agoraClient.publish([microphoneTrack, cameraTrack]);
//             })
//             .catch((err) => console.error("Failed to join channel:", err));

//         setClient(agoraClient);

//         return () => {
//             agoraClient.leave().then(() => {
//                 localAudioTrack?.stop();
//                 localAudioTrack?.close();
//                 localVideoTrack?.stop();
//                 localVideoTrack?.close();
//             });
//         };
//     }, [channelName, token, userId]);

//     const toggleMute = () => {
//         if (localAudioTrack) {
//             if (isMuted) {
//                 localAudioTrack.setEnabled(true);
//             } else {
//                 localAudioTrack.setEnabled(false);
//             }
//             setIsMuted(!isMuted);
//         }
//     };

//     const toggleVideo = () => {
//         if (localVideoTrack) {
//             if (isVideoStopped) {
//                 localVideoTrack.setEnabled(true);
//             } else {
//                 localVideoTrack.setEnabled(false);
//             }
//             setIsVideoStopped(!isVideoStopped);
//         }
//     };

//     // End the call and clean up tracks
//     const endCall = async () => {
//         await client?.leave();
//         localAudioTrack?.stop();
//         localAudioTrack?.close();
//         localVideoTrack?.stop();
//         localVideoTrack?.close();
//         setClient(null);
//         setLocalAudioTrack(null);
//         setLocalVideoTrack(null);
//     };

//     return {
//         client,
//         localAudioTrack,
//         localVideoTrack,
//         toggleMute,
//         isMuted,
//         toggleVideo,
//         isVideoStopped,
//         endCall,
//     };
// };