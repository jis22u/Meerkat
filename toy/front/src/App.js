import './App.css';
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";


function App() {
  const socketRef = useRef();
  const peerRef = useRef();
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const inputRef = useRef('');
  const roomName = "123";
  const [device, setdevice ] = useState('');

  let myStream;

  const initCall = async () => {
    await getMedia();
    makeConnection();
    socketRef.current.emit("join_room", roomName )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    socketRef.current.emit("message", inputRef.current.value, roomName)
  }


  const getMedia = async () => {
    try {
      myStream = await navigator.mediaDevices.getUserMedia(
        {
          video: true,
          audio: true,
        }
      )
      const deviceRef = await navigator.mediaDevices.enumerateDevices()
      console.log(deviceRef)
      setdevice(deviceRef.filter((device) => {
        if (device.kind === "videoinput") {
          return device.label
        }
      }))
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
      console.log('상대방')
      console.log(e)
      remoteVideoRef.current.srcObject = e.streams[0];
    }
    myStream
      .getTracks()
      .forEach((track) => {
        peerRef.current.addTrack(track, myStream)
      })
  }


useEffect(() => {
  console.log('useEffect 실행')
  socketRef.current = io("192.168.31.154:5000");
  initCall();

  socketRef.current.on("welcome", async () => {
    // myDataChannel = myPeerConnection.createDataChannel("chat");
    // myDataChannel.addEventListener("message", (event) => console.log(event.data));
    // console.log("made data channel");
    const offer = await peerRef.current.createOffer();
    console.log(typeof(offer))
    console.log(typeof offer);
    // console.log(offer)
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
    console.log(typeof(offer));
    console.log(typeof offer);
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

// dependency array는 필요한가? componenetDidmout + componentDidupdate , every rerender마다 재실행 중



  return (
    <div>
      <video
        style={{
          width: 240,
          height: 240,
          margin: 5,
          backgroundColor: "black",
        }}
        muted
        ref={localVideoRef}
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
        autoPlay
      />
      <form onSubmit={handleSubmit}>
        <input ref={inputRef}></input>
        <button type="submit">Submit</button>
      </form>
      <h1>{device}</h1>
    </div>
  );
}

export default App;
