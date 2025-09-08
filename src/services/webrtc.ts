

let localStream: MediaStream | null = null;
let peerConnection: RTCPeerConnection | null = null;


const servers = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
};


export const startCall = async (isVideo: boolean) => {
  
  peerConnection = new RTCPeerConnection(servers);

  
  localStream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: isVideo
  });

  
  localStream.getTracks().forEach(track => {
    peerConnection!.addTrack(track, localStream!);
  });

  
  return localStream;
};
