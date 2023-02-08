import React, { useEffect, useRef } from "react";
import io from "socket.io-client";
import { useParams } from 'react-router-dom';

const VideoChat = () => {
  const socketRef = useRef();
  const peerRef = useRef();
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const ChannelRef = useRef(null);
  const { roomName } = useParams();

  let myStream;
  let cameraOptions

  const handleMicOff = () => {
    myStream.getAudioTracks()[0].enabled = !myStream.getAudioTracks()[0].enabled
  }


  const handleCameraOff = () => {
    myStream.getVideoTracks()[0].enabled = !myStream.getVideoTracks()[0].enabled
  }
  

  const handleCamDirection = async () => {
    const currentCamera = myStream.getVideoTracks()[0];

    cameraOptions.forEach((camera) => {
      if (camera.label !== currentCamera.label) {
        getMedia(camera.deviceId)
        return false
      }
    })
    
    if (peerRef.current) {
      const videoTrack = myStream.getVideoTracks()[0];
      const videoSender = peerRef.current
        .getSenders()
        .find((sender) => sender.track.kind === "video");
      videoSender.replaceTrack(videoTrack);
    }
  }


  const getMedia = async (deviceId) => {
    const initialConstrains = {
      audio: true,
      video: { facingMode: "user" },
    };

    const cameraConstraints = {
      audio: true,
      video: { deviceId: { exact: deviceId } },
    };

    try {
      myStream = await navigator.mediaDevices.getUserMedia(
        deviceId ? cameraConstraints : initialConstrains
      )
      localVideoRef.current.srcObject = myStream;
    } catch (e) {
      console.error(e);
    }

  }


  const makeConnection = async () => {
    peerRef.current = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            // "stun:stun1.l.google.com:19302",
            // "stun:stun2.l.google.com:19302",
            // "stun:stun3.l.google.com:19302",
            // "stun:stun4.l.google.com:19302",
          ],
        },
      ],
    });

    peerRef.current.onicecandidate = (e) => {
      socketRef.current.emit("ice", {
        datas: JSON.stringify(e.candidate),
        roomName: roomName
      });
    }
    peerRef.current.ontrack= (e) => {
      remoteVideoRef.current.srcObject = e.streams[0];
    }

    myStream
      .getTracks()
      .forEach((track) => {
        peerRef.current.addTrack(track, myStream)
      })
    }


  useEffect(() => {
    console.log('Render');
    
    const initCall = async () => {
      await getMedia();
      await makeConnection();

      socketRef.current = io("http://192.168.31.154:8085",  {
      query: `roomName=${roomName}`, //
    });
    
    socketRef.current.on("welcome", async () => {
      ChannelRef.current = peerRef.current.createDataChannel("chat");
      ChannelRef.current.onmessage = (event) => console.log(event.data);

      const offer = await peerRef.current.createOffer();
      peerRef.current.setLocalDescription(offer);
      console.log("sent the offer");
                                          
      socketRef.current.emit("offer",{
        datas: JSON.stringify(offer),
        roomName: roomName
      });
    });

    socketRef.current.on("offer", async (offer) => { 
      peerRef.current.ondatachannel = (event) => {
        ChannelRef.current = event.channel;
        ChannelRef.current.onmessage = (event) => console.log(event.data);
      };

      console.log("received the offer");
      peerRef.current.setRemoteDescription(JSON.parse(offer));
      const answer = await peerRef.current.createAnswer();
      peerRef.current.setLocalDescription(answer);
      socketRef.current.emit("answer", {
        datas: JSON.stringify(answer), 
        roomName: roomName
      });
      console.log("sent the answer");

    });

    socketRef.current.on("answer", (answer) => {
      console.log("received the answer");
      peerRef.current.setRemoteDescription(JSON.parse(answer));
    });


    socketRef.current.on("ice", (ice) => {
      peerRef.current.addIceCandidate(JSON.parse(ice));
      console.log("received candidate");
    });
    }
    initCall()
  })


  return (
    <div>
      <video
        style={{
          width: 240,
          height: 240,
          margin: 5,
          backgroundColor: "black",
        }}
        ref={localVideoRef}
        muted
        playsInline
        autoPlay
      />
      <video
        id="remotevideo"
        style={{
          width: 240,
          height: 240,
          margin: 5,
          backgroundColor: "black",
        }}
        ref={remoteVideoRef}
        muted
        playsInline
        autoPlay
      />
      <button onClick={handleCameraOff}>Camera Off</button>
      <button onClick={handleMicOff}>Mic Off</button>
      <button onClick={handleCamDirection}>Camera Change</button>
    </div>
  );
}

export default VideoChat;
