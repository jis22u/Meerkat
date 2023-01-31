import './App.css';
import React, { useEffect, useRef } from "react";
import io from "socket.io-client";


function App() {
  const socketRef = useRef();
  const peerRef = useRef();
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const inputRef = useRef('');
  const roomName = "123";
  let myStream;

  // const GetOptions = () => {
  //   const devices = async () => { await navigator.mediaDevices.enumerateDevices() }
  //   console.log(devices)
  //   return (
  //     <select>
  //       {devices.map((device) => (<option>{device.deviceId}</option>))}
  //     </select>
  //   )
  // }

  const handleSubmit = (e) => {
    e.preventDefault()
    socketRef.current.emit("message", inputRef.current.value, roomName)
  }

  const handleMicOff = () => {
    myStream.getAudioTracks()[0].enabled = !myStream.getAudioTracks()[0].enabled
  }

  const handleCameraOff = () => {
    myStream.getVideoTracks()[0].enabled = !myStream.getVideoTracks()[0].enabled
  }
  // [0]으로 해도 오류가 안 나는지 확인


  const initCall = async () => {
    await getMedia();
    makeConnection();
    socketRef.current.emit("join_room", roomName )
  }

  const getMedia = async () => {
    try {
      myStream = await navigator.mediaDevices.getUserMedia(
        {
          video: true,
          audio: true,
        }
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
    socketRef.current = io("http://192.168.35.156:5000");
    initCall();
    socketRef.current.on("welcome", async () => {
      // myDataChannel = myPeerConnection.createDataChannel("chat");
      // myDataChannel.addEventListener("message", (event) => console.log(event.data));
      // console.log("made data channel");
      const offer = await peerRef.current.createOffer();
      peerRef.current.setLocalDescription(offer);
      console.log("sent the offer");
      socketRef.current.emit("offer", offer, roomName);
    });

    socketRef.current.on("offer", async (offer) => {
      // myPeerConnection.addEventListener("datachannel", (event) => {
      //   myDataChannel = event.channel;
      //   myDataChannel.addEventListener("message", (event) =>
      //     console.log(event.data)
      //   );
      // });
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

  socketRef.current.on("message", (message) => {
    console.log(message)
  })
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
      <form onSubmit={handleSubmit}>
        <input ref={inputRef}></input>
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleCameraOff}>Camera Off</button>
      <button onClick={handleMicOff}>Mic Off</button>
    </div>
  );
}

export default App;
