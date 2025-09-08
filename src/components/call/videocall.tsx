// import React, { useEffect, useRef, useState } from "react";
// import { Button } from "../ui/Button";
// import { Avatar } from "../ui/Avatar";

// interface VideoCallProps {
//   isVideoCall: boolean;
//   onEndCall: () => void;
//   partnerName?: string;
//   partnerAvatar?: string;
// }

// const VideoCall: React.FC<VideoCallProps> = ({
//   isVideoCall,
//   onEndCall,
//   partnerName,
//   partnerAvatar,
// }) => {
//   const localVideoRef = useRef<HTMLVideoElement>(null);
//   const [stream, setStream] = useState<MediaStream | null>(null);
//   const [micOn, setMicOn] = useState(true);
//   const [camOn, setCamOn] = useState(true);

//   useEffect(() => {
//     // Request media devices
//     navigator.mediaDevices
//       .getUserMedia({ video: isVideoCall, audio: true })
//       .then((mediaStream) => {
//         setStream(mediaStream);
//         if (localVideoRef.current) {
//           localVideoRef.current.srcObject = mediaStream;
//           localVideoRef.current.onloadedmetadata = () => {
//             localVideoRef.current?.play();
//           };
//         }
//       })
//       .catch((err) => {
//         console.error("Error accessing devices:", err);
//         alert("Please allow camera/microphone access.");
//       });

//     return () => {
//       // Stop tracks on unmount
//       stream?.getTracks().forEach((track) => track.stop());
//     };
//   }, [isVideoCall]);

//   // Toggle Mic
//   const handleToggleMic = () => {
//     if (stream) {
//       stream.getAudioTracks().forEach((track) => (track.enabled = !micOn));
//       setMicOn(!micOn);
//     }
//   };

//   // Toggle Camera
//   const handleToggleCam = () => {
//     if (stream) {
//       stream.getVideoTracks().forEach((track) => (track.enabled = !camOn));
//       setCamOn(!camOn);
//     }
//   };

//   return (
//     <div className="absolute inset-0 bg-black flex flex-col items-center justify-between z-50">
//       {/* Header */}
//       <div className="w-full flex items-center justify-between px-6 py-4 bg-black/40 text-white">
//         <h2 className="text-lg font-semibold">{partnerName || "Calling..."}</h2>
//         <span className="text-sm">
//           {isVideoCall ? "Video Call" : "Voice Call"}
//         </span>
//       </div>

//       {/* Video / Avatar */}
//       <div className="flex-1 flex items-center justify-center w-full">
//         {isVideoCall ? (
//           <video
//             ref={localVideoRef}
//             autoPlay
//             playsInline
//             muted
//             className="w-full h-full object-cover"
//           />
//         ) : (
//           <div className="flex flex-col items-center justify-center text-white">
//             <Avatar
//               src={partnerAvatar}
//               alt={partnerName}
//               size="xl"
//               className="mb-4"
//             />
//             <p className="text-xl">Ringing...</p>
//           </div>
//         )}
//       </div>

//       {/* Controls */}
//       <div className="w-full flex items-center justify-center space-x-6 py-6 bg-black/40">
//         <Button
//           className="bg-gray-600 hover:bg-gray-700 text-white p-4 rounded-full"
//           onClick={handleToggleMic}
//         >
//           {micOn ? "🎤" : "🔇"}
//         </Button>
//         <Button
//           className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full"
//           onClick={onEndCall}
//         >
//           ❌
//         </Button>
//         {isVideoCall && (
//           <Button
//             className="bg-gray-600 hover:bg-gray-700 text-white p-4 rounded-full"
//             onClick={handleToggleCam}
//           >
//             {camOn ? "📷" : "🚫"}
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VideoCall;

import React, { useEffect, useRef } from "react";

interface VideoCallProps {
  isVideoCall: boolean;
  chatPartnerName?: string;
  onEndCall: () => void;
}

const VideoCall: React.FC<VideoCallProps> = ({
  isVideoCall,
  chatPartnerName,
  onEndCall,
}) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isVideoCall && localVideoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error("Error accessing media devices:", err));
    }
  }, [isVideoCall]);

  return (
    <div className="absolute inset-0 bg-black flex flex-col items-center justify-between z-50">
      {/* Header */}
      <div className="w-full flex items-center justify-between px-6 py-4 bg-black/40 text-white">
        <h2 className="text-lg font-semibold">
          {chatPartnerName || "Calling..."}
        </h2>
        <span className="text-sm">{isVideoCall ? "Video Call" : "Voice Call"}</span>
      </div>

      {/* Video / Avatar */}
      <div className="flex-1 flex items-center justify-center w-full">
        {isVideoCall ? (
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-white">
            <p className="text-xl">Ringing...</p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="w-full flex items-center justify-center space-x-6 py-6 bg-black/40">
        <button
          className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full text-lg"
          onClick={onEndCall}
        >
          ❌ End Call
        </button>
      </div>
    </div>
  );
};

export default VideoCall;
