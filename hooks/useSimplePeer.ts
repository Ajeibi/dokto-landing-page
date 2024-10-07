import { useEffect, useRef, useState } from "react";
import SimplePeer, { SignalData } from "simple-peer";

// export function useSimplePeer(initiator: boolean, signalingServerUrl: string) {
//   const localVideoRef = useRef<HTMLVideoElement>(null);
//   const remoteVideoRef = useRef<HTMLVideoElement>(null);
//   const [localStream, setLocalStream] = useState<MediaStream | null>(null);
//   const [peer, setPeer] = useState<SimplePeer.Instance | null>(null);
//   const [socket, setSocket] = useState<WebSocket | null>(null);

//   useEffect(() => {
//     const initializeConnection = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: true,
//         });
//         setLocalStream(stream);

//         const newPeer = new SimplePeer({
//           initiator,
//           trickle: false,
//           stream,
//         });

//         newPeer.on("signal", (data: SignalData) => {
//           if (socket && socket.readyState === WebSocket.OPEN) {
//             socket.send(
//               JSON.stringify({
//                 type: "signal",
//                 data,
//               })
//             );
//           }
//         });

//         newPeer.on("stream", (remoteStream) => {
//           if (remoteVideoRef.current) {
//             remoteVideoRef.current.srcObject = remoteStream;
//           }
//         });

//         newPeer.on("error", (err) => {
//           console.error("Peer error", err);
//           setPeer(null);
//         });

//         setPeer(newPeer);

//         if (localVideoRef.current) {
//           localVideoRef.current.srcObject = stream;
//         }
//       } catch (err) {
//         console.error("Error initializing connection", err);
//       }
//     };

//     initializeConnection();

//     const ws = new WebSocket(signalingServerUrl);
//     ws.onopen = () => {
//       console.log("Connected to signaling server");
//     };
//     ws.onmessage = (message) => {
//       const parsedMessage = JSON.parse(message.data);
//       if (parsedMessage.type === "signal") {
//         peer?.signal(parsedMessage.data);
//       }
//     };

//     setSocket(ws);

//     return () => {
//       peer?.destroy();
//       localStream?.getTracks().forEach((track) => track.stop());
//       ws.close();
//     };
//   }, [initiator, signalingServerUrl]);

//   const sendMessage = (message: any) => {
//     if (socket) {
//       if (socket.readyState === WebSocket.OPEN) {
//         socket.send(JSON.stringify(message));
//       } else {
//         socket.addEventListener(
//           "open",
//           () => {
//             socket.send(JSON.stringify(message));
//           },
//           { once: true }
//         );
//       }
//     }
//   };

//   const handleSignal = (signalData: SignalData) => {
//     if (peer) {
//       try {
//         peer.signal(signalData);
//       } catch (err) {
//         console.error("Error signaling peer", err);
//       }
//     }
//   };

//   const endCall = () => {
//     toggleVideo();
//     localStream?.getTracks().forEach((track) => track.stop());
//     setPeer(null);
//     peer?.destroy();
//   };

//   const toggleMute = () => {
//     if (localStream) {
//       localStream.getAudioTracks().forEach((track) => {
//         track.enabled = !track.enabled;
//       });
//     }
//   };

//   const toggleVideo = () => {
//     if (localStream) {
//       localStream.getVideoTracks().forEach((track) => {
//         track.enabled = !track.enabled;
//       });
//     }
//   };

//   const answerCall = (calleeId: string) => {
//     if (peer) {
//       peer.on("signal", (answer: SignalData) => {
//         sendMessage({
//           type: "answer",
//           calleeId,
//           answer,
//         });
//       });
//     }
//   };

//   const registerUser = (calleeId: string) => {
//     sendMessage({
//       type: "register",
//       calleeId,
//     });
//   };

//   const callUser = (calleeId: string, callerId: string) => {
//     if (peer) {
//       peer.on("signal", (offer: SignalData) => {
//         sendMessage({
//           type: "call",
//           calleeId: calleeId,
//           offer,
//         });
//         sendMessage({
//           type: "call-initiated",
//           callerId: callerId,
//           calleeId: calleeId,
//         });
//       });
//     }
//   };

//   return {
//     localVideoRef,
//     remoteVideoRef,
//     endCall,
//     toggleMute,
//     toggleVideo,
//     callUser,
//     answerCall,
//     registerUser,
//     handleSignal,
//   };
// }

export function useSimplePeer(
  initiator: boolean,
  signalingServerUrl: string,
  onCallInitiated?: (callerId: string) => void
) {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [peer, setPeer] = useState<SimplePeer.Instance | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [callInitiated, setCallInitiated] = useState<boolean>(false);

  useEffect(() => {
    const initializeConnection = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStream(stream);

        const newPeer = new SimplePeer({
          initiator,
          trickle: false,
          stream,
        });

        newPeer.on("signal", (data: SignalData) => {
          if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(
              JSON.stringify({
                type: "signal",
                data,
              })
            );
          }
        });

        newPeer.on("stream", (remoteStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
        });

        newPeer.on("error", (err) => {
          console.error("Peer error", err);
          setPeer(null);
        });

        setPeer(newPeer);

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error initializing connection", err);
      }
    };

    initializeConnection();

    const ws = new WebSocket(signalingServerUrl);
    ws.onopen = () => {
      console.log("Connected to signaling server");
    };
    ws.onmessage = (message) => {
      const parsedMessage = JSON.parse(message.data);
      if (parsedMessage.type === "signal") {
        peer?.signal(parsedMessage.data);
      } else if (parsedMessage.type === "call-initiated") {
        setCallInitiated(true);
        onCallInitiated?.(parsedMessage.callerId);
      }
    };

    setSocket(ws);

    return () => {
      peer?.destroy();
      localStream?.getTracks().forEach((track) => track.stop());
      ws.close();
    };
  }, [initiator, signalingServerUrl, onCallInitiated]);

  const sendMessage = (message: any) => {
    if (socket) {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
      } else {
        socket.addEventListener(
          "open",
          () => {
            socket.send(JSON.stringify(message));
          },
          { once: true }
        );
      }
    }
  };

  const handleSignal = (signalData: SignalData) => {
    if (peer) {
      try {
        peer.signal(signalData);
      } catch (err) {
        console.error("Error signaling peer", err);
      }
    }
  };

  const endCall = () => {
    toggleVideo();
    localStream?.getTracks().forEach((track) => track.stop());
    setPeer(null);
    peer?.destroy();
  };

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
    }
  };

  const registerUser = (calleeId: string) => {
    sendMessage({
      type: "register",
      calleeId,
    });
  };

  const callUser = (calleeId: string) => {
    if (peer) {
      peer.on("signal", (offer: SignalData) => {
        sendMessage({
          type: "call",
          calleeId,
          offer,
        });

        sendMessage({
          type: "call-initiated",
          callerId: initiator ? "callerId" : "calleeId",
        });
        setCallInitiated(true);
      });
    }
  };

  const checkCallInitiation = () => callInitiated;

  return {
    localVideoRef,
    remoteVideoRef,
    endCall,
    toggleMute,
    toggleVideo,
    callUser,
    handleSignal,
    registerUser,
    checkCallInitiation, // Expose the call initiation status
  };
}
