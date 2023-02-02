import './App.css';
import React, { useEffect, useRef } from "react";
import io from "socket.io-client";


function App() {
  const socketRef = useRef();
  const peerRef = useRef();
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const ChannelRef = useRef(null);

  let myStream;
  let cameraOptions

  const roomName = "123";

  const handleMicOff = () => {
    myStream.getAudioTracks()[0].enabled = !myStream.getAudioTracks()[0].enabled
  }

  const handleCameraOff = () => {
    myStream.getVideoTracks()[0].enabled = !myStream.getVideoTracks()[0].enabled
  }
  // [0]으로 해도 오류가 안 나는지 확인
  
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


  const initCall = async () => {
    await getMedia();
    makeConnection();
    const devices = await navigator.mediaDevices.enumerateDevices();
    cameraOptions = devices.filter((device) => device.kind === "videoinput");
    socketRef.current.emit("join_room", roomName )
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
      socketRef.current.emit("ice", e.candidate, roomName);
    }
    peerRef.current.ontrack= (e) => {
      remoteVideoRef.current.srcObject = e.streams[0];
      // 상대방이 getTracks으로 audio, video를 peerRef에 담을 때마다 실행된다.
    }

    myStream
      .getTracks()
      .forEach((track) => {
        peerRef.current.addTrack(track, myStream)
      })
    }


  useEffect(() => {
    console.log('Render')
    socketRef.current = io("192.168.35.156:5000");
    initCall();
    socketRef.current.on("welcome", async () => {
      console.log('welcome 들어왔어요ㅋㅋ')
      ChannelRef.current = peerRef.current.createDataChannel("chat");
      console.log(ChannelRef.current)
      // ChannelRef.current.onmessage((event) => console.log(event.data));

      const offer = await peerRef.current.createOffer();
      peerRef.current.setLocalDescription(offer);
      console.log("sent the offer");
      socketRef.current.emit("offer", offer, roomName);
    });

    socketRef.current.on("offer", async (offer) => {
      console.log(peerRef.current)
      peerRef.current.ondatachannel((event) => {
        console.log('찾았다!')
        ChannelRef.current = event.channel;
        // ChannelRef.current.onmessage((event) => console.log(event.data))
      });

      console.log("received the offer");
      peerRef.current.setRemoteDescription(offer);
      const answer = await peerRef.current.createAnswer();
      peerRef.current.setLocalDescription(answer);
      socketRef.current.emit("answer", answer, roomName);
      console.log("sent the answer");
    });

    socketRef.current.on("answer", (answer) => {
      console.log("received the answer");
      peerRef.current.setRemoteDescription(answer);
    });

    socketRef.current.on("ice", (ice) => {
      peerRef.current.addIceCandidate(ice);
      console.log("received candidate");
    });
  })

// dependency array는 필요한가? 

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

export default App;
