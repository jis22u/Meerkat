import React, { useEffect, useRef, useCallback, useState } from "react";
import io from "socket.io-client";
import { useParams, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { useSelector } from "react-redux";
import Waiting from 'components/chat/Waiting'
import styles from './VideoChat.module.css'

const VideoChat = () => {
  const socketRef = useRef();
  const peerRef = useRef();
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const ChannelRef = useRef();
  const myStream = useRef();
  const { roomName } = useParams();
  const [text ,setText] = useState('');
  const [messages, setMessages] = useState([]);
  const { choice } = useSelector((state) => state.auth)
  const [ style, setStyle ] = useState(choice)
  const isJoin = useRef(choice)
  const [seconds, setSeconds] = useState(60);
  const navigate = useNavigate()

  let cameraOptions

  // const Messages = styled.div`
  //     width: 100%;
  //     height: 60%;
  //     border: 1px solid black;
  //     margin-top: 10px;
  //     overflow: scroll;
  // `;


  // const MyRow = styled.div`
  //   width: 100%;
  //   display: flex;
  //   justify-content: flex-end;
  //   margin-top: 10px;
  // `;

  // const MyMessage = styled.div`
  //   width: 45%;
  //   background-color: blue;
  //   color: white;
  //   padding: 10px;
  //   margin-right: 5px;
  //   text-align: center;
  //   border-top-right-radius: 10%;
  //   border-bottom-right-radius: 10%;
  // `;

  // const PartnerRow = styled(MyRow)`
  //   justify-content: flex-start;
  // `;

  // const PartnerMessage = styled.div`
  //   width: 45%;
  //   background-color: grey;
  //   color: white;
  //   border: 1px solid lightgray;
  //   padding: 10px;
  //   margin-left: 5px;
  //   text-align: center;
  //   border-top-left-radius: 10%;
  //   border-bottom-left-radius: 10%;
  // `;


  const handleMicOff = () => {
    myStream.current.getAudioTracks()[0].enabled = !myStream.current.getAudioTracks()[0].enabled
  }


  const handleCameraOff = () => {
    myStream.current.getVideoTracks()[0].enabled = !myStream.current.getVideoTracks()[0].enabled
  }
  

  const handleCamDirection = async () => {
    const currentCamera = myStream.current.getVideoTracks()[0];

    cameraOptions.forEach((camera) => {
      if (camera.label !== currentCamera.label) {
        getMedia(camera.deviceId)
        return false
      }
    })
    
    if (peerRef.current) {
      const videoTrack = myStream.current.getVideoTracks()[0];
      const videoSender = peerRef.current
        .getSenders()
        .find((sender) => sender.track.kind === "video");
      videoSender.replaceTrack(videoTrack);
    }
  }


  const getMedia = useCallback(async (deviceId) => {
    const initialConstrains = {
      audio: true,
      video: { facingMode: "user" },
    };

    const cameraConstraints = {
      audio: true,
      video: { deviceId: { exact: deviceId } },
    };

    try {
      myStream.current = await navigator.mediaDevices.getUserMedia(
        deviceId ? cameraConstraints : initialConstrains
      )
      localVideoRef.current.srcObject = myStream.current;
    } catch (e) {
      console.error(e, "getMedia를 실행할 수 없습니다.");
    }

  }, [])


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

    peerRef.current.oniceconnectionstatechange = (e) => {
      const status = peerRef.current.iceConnectionState
      console.log('현재 연결 상태:', status)
      if (status === "connected") {
        const interval = setInterval(() => {
          setSeconds(seconds => seconds - 1);
          console.log('계속 세리는 중')
        }, 1000);
        isJoin.current = true
        setStyle(true)
        setTimeout(() => {
          navigate('/')
        }, 60000)
        
        // clearInterval(interval)

      } else if (status === "disconnected") {
        alert('연결이 끊어졌습니다.')
      }
    }

    peerRef.current.ontrack= (e) => {
      remoteVideoRef.current.srcObject = e.streams[0];
    }

    if (myStream.current) {
      myStream.current
      .getTracks()
      .forEach((track) => {
        peerRef.current.addTrack(track, myStream.current)
      })
    }
    }


  useEffect(() => {
    console.log('Render');

    const initCall = async () => {
      await getMedia();
      await makeConnection();

      socketRef.current = io("http://i8b107.p.ssafy.io:8085",  {
      query: `roomName=${roomName}`, //
      });
    
    socketRef.current.on("welcome", async () => {
      ChannelRef.current = peerRef.current.createDataChannel("chat");
      ChannelRef.current.onmessage = (event) => receiveMessage(event);

      const offer = await peerRef.current.createOffer();
      peerRef.current.setLocalDescription(offer);
      console.log("sent the offer");
                                          
      socketRef.current.emit("offer",{
        datas: JSON.stringify(offer),
        roomName: roomName,
      });
    });

    socketRef.current.on("offer", async (offer) => { 
      peerRef.current.ondatachannel = (event) => {
        ChannelRef.current = event.channel;
        ChannelRef.current.onmessage = (event) => receiveMessage(event);
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
    
    // if (!isJoin.current) {
    //   setTimeout(() => {
    //     isJoin.current ? console.log('입장완료') : navigate('/')
    //   }, 10000)
    // }

    initCall()

    // return () => clearInterval(interval)
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const receiveMessage = (e) => {
    setMessages(messages => [...messages, { yours: false, value: e.data}])
  }

  // const sendMessage = (e) => {
  //   e.preventDefault();
  //   ChannelRef.current.send(text)
  //   setMessages(messages => [...messages, { yours: true, value: text}])
  //   setText("");
  // }

  // const showMessages = (message, index) => {
  //   if (message.yours) {
  //     return (
  //         <MyRow key={index}>
  //             <MyMessage>
  //                 {message.value}
  //             </MyMessage>
  //         </MyRow>
  //     )
  //   }

  //   return (
  //       <PartnerRow key={index}>
  //           <PartnerMessage>
  //               {message.value}
  //           </PartnerMessage>
  //       </PartnerRow>
  //   )
  // }

  return (  
    <div className={styles.topBox}>
      <div style = {{position : 'absolute'}}>
        <h1>{parseInt(seconds / 60)} : {seconds % 60 < 10 ? '0' + seconds % 60 : seconds % 60 }</h1>
      </div>
      <div style = {{ display : style ? "none" : "block" }}>
        <Waiting />
      </div>
      <div style = {{ display : style ? "block" : "none "}} className={styles.videoBox}>
        <video
          className={styles.video}
          ref={localVideoRef}
          playsInline
          autoPlay
          muted
        />
        <video
          id="remotevideo"
          className={styles.video}
          ref={remoteVideoRef}
          playsInline
          autoPlay
          muted
        />
        {/* <Messages>
          {messages.map(showMessages)}
        </Messages> */}
        <button onClick={handleCameraOff}>Camera Off</button>
        <button onClick={handleMicOff}>Mic Off</button>
        <button onClick={handleCamDirection}>Camera Change</button>
        {/* <form onSubmit = {sendMessage}>
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="메시지를 입력하세요."></input>
          <button type="submit" disabled={!text}>🕊️</button>
        </form> */}
      </div>
    </div>
  );
}

export default VideoChat;
