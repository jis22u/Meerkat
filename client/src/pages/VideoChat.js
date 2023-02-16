import React, { useEffect, useRef, useCallback, useState } from "react";
import io from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Waiting from "components/chat/Waiting";
import styles from "./VideoChat.module.css";
import { verifyRoom, roomClose } from "api/user";
import Swal from "sweetalert2";
import { setChoice } from "store/modules/authSlice";
import Header from "components/layout/Header";

const Messages = styled.div`
  width: 90%;
  height: 100%;
  overflow: scroll;
  top: 2rem;
  bottom: 3rem;
  

  &::-webkit-scrollbar {
    display: none;
  }
  // &::-webkit-scrollbar-thumb {
  //   border-radius: 2px;
  //   background: #ccc;
  // }
`;

const MyRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const MyMessage = styled.div`
  background-color: #cebeaa;
  padding: 10px;
  color: #3a3a3a;
  text-align: center;
  height: 100%;
`;

// border-top-right-radius: 10%;
// border-bottom-right-radius: 10%;

const PartnerRow = styled(MyRow)`
  justify-content: flex-start;
`;

const PartnerMessage = styled.div`
  background-color: #cebeaa;
  color: #3a3a3a;
  padding: 10px;
  margin-left: 5px;
  text-align: center;
`;

const VideoChat = () => {
  const socketRef = useRef();
  const peerRef = useRef();
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const ChannelRef = useRef();
  const myStream = useRef();
  const { roomName, idx } = useParams();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const { choice } = useSelector((state) => state.auth)
  const [ style, setStyle ] = useState(choice)
  const isJoin = useRef(choice)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const two = useRef(120);
  const five = useRef(300);
  const twoInterval = useRef();
  const fiveInterval = useRef();
  const [twoSeconds, setTwoSeconds] = useState(120);
  const [fiveSeconds, setFiveSeconds] = useState(300);
  const [chat, setChat] = useState(true);
  const cameraOptions = useRef();
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);

  const handleMicOff = () => {
    setMicOn((prev) => !prev);
    myStream.current.getAudioTracks()[0].enabled =
      !myStream.current.getAudioTracks()[0].enabled;
  };

  const handleCameraOff = () => {
    setCameraOn((prev) => !prev);
    myStream.current.getVideoTracks()[0].enabled =
      !myStream.current.getVideoTracks()[0].enabled;
  };

  const handleCamDirection = async () => {
    const currentCamera = myStream.current.getVideoTracks()[0];
    cameraOptions.current.forEach((camera) => {
      if (camera.label !== currentCamera.label) {
        getMedia(camera.deviceId)
          .then(res => {
            if (peerRef.current) {
              const videoTrack = myStream.current.getVideoTracks()[0];
              const videoSender = peerRef.current
                .getSenders()
                .find((sender) => sender.track.kind === "video");
              videoSender.replaceTrack(videoTrack);
            }
          })
        return false
      }
    })
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
      );
      localVideoRef.current.srcObject = myStream.current;

    } catch (e) {
      console.error("getMedia를 실행할 수 없습니다.");
      setCameraOn(false);
      setMicOn(false);
    }
  }, []);

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
        roomName: roomName,
      });
    };

    peerRef.current.oniceconnectionstatechange = (e) => {
      const status = peerRef.current.iceConnectionState;

      console.log("현재 연결 상태:", status);
      if (status === "connected") {
        isJoin.current = true;
        setStyle(true);
        fiveInterval.current = setInterval(() => {
          if (five.current !== 0) {
            five.current -= 1;
            setFiveSeconds((seconds) => seconds - 1);
          } else {
            clearTimeout(fiveInterval.current);
            navigate("/");
            // navigate('/hangup', { state : choice , replace : true })
          }
        }, 1000);
      } else if (status === "disconnected") {
        navigate("/");
        // navigate('/hangup', { state : choice , replace : true })
      }
    };

    peerRef.current.ontrack = (e) => {
      remoteVideoRef.current.srcObject = e.streams[0];
    };

    if (myStream.current) {
      console.log("myStream 있어");
      myStream.current.getTracks().forEach((track) => {
        peerRef.current.addTrack(track, myStream.current);
      });
    } else console.log("myStream 없어");
  };

  useEffect(() => {
    console.log("Render");

    // 7006237/8
    const initCall = async () => {
      const { data } = await verifyRoom({roomName, idx})
      if (data.status !== "OK") {
        navigate('/')
        return
      }
      window.onbeforeunload = () => { 
        console.log('새로고침임')
        if (!choice) roomClose({ roomName, idx })
        return
      }
      window.onbeforeunload = () => {
        console.log("새로고침임");
        if (!choice) roomClose({ roomName, idx });
        return;
      };
      await getMedia();
      await makeConnection();
      const devices = await navigator.mediaDevices.enumerateDevices();
      cameraOptions.current = devices.filter(
        (device) => device.kind === "videoinput"
      );

      socketRef.current = io("https://i8b107.p.ssafy.io", {
        query: `roomName=${roomName}`,
      });

      socketRef.current.on("welcome", async () => {
        ChannelRef.current = peerRef.current.createDataChannel("chat");
        ChannelRef.current.onmessage = (event) => receiveMessage(event);

        const offer = await peerRef.current.createOffer();
        peerRef.current.setLocalDescription(offer);
        console.log("sent the offer");

        socketRef.current.emit("offer", {
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
          roomName: roomName,
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
    };

    if (!choice) {
      twoInterval.current = setInterval(() => {
        if (two.current !== 0) {
          two.current -= 1;
          setTwoSeconds((seconds) => seconds - 1);
        } else {
          isJoin.current ? clearTimeout(twoInterval) : navigate("/");
        }
      }, 1000);
    }

    initCall();

    return () => {
      Swal.fire({
        position: "warning",
        icon: "warning",
        title: "통화가 종료되었습니다.",
        showConfirmButton: false,
        timer: 1500,
      });
      clearTimeout(twoInterval.current);
      clearTimeout(fiveInterval.current);

      if (peerRef.current) peerRef.current.close();
      if (socketRef.current) socketRef.current.disconnect();
      if (myStream.current)
        myStream.current.getTracks().forEach((track) => track.stop());
      if (!choice) {
        roomClose({ roomName, idx })
        console.log('폐쇄합니다!')
        dispatch(setChoice(true))
      }
      // 카메라 + 소켓 disconnect
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const receiveMessage = (e) => {
    setMessages((messages) => [...messages, { yours: false, value: e.data }]);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    ChannelRef.current.send(text);
    setMessages((messages) => [...messages, { yours: true, value: text }]);
    setText("");
  };

  const showMessages = (message, index) => {
    if (message.yours) {
      return (
        <MyRow key={index}>
          <MyMessage>{message.value}</MyMessage>
        </MyRow>
      );
    }

    return (
      <PartnerRow key={index}>
        <PartnerMessage>{message.value}</PartnerMessage>
      </PartnerRow>
    );
  };

  const handleShowChat = () => {
    setChat((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <div style={{ display: style ? "none" : "block" }}>
        <Waiting time={twoSeconds} />
      </div>
      <div
        style={{ display: style ? "block" : "none" }}
        className={styles.container}
      >
        <div className={styles.brown}></div>
        <div className={styles.timer}>
          <h3>
            남은 시간{parseInt(fiveSeconds / 60)} :{" "}
            {fiveSeconds % 60 < 10
              ? "0" + (fiveSeconds % 60)
              : fiveSeconds % 60}
          </h3>
        </div>
        <div className={styles.brown}></div>
        <video
          id="remotevideo"
          className={styles.remoteVideo}
          ref={remoteVideoRef}
          playsInline
          autoPlay
        />
        <video
          className={styles.localVideo}
          ref={localVideoRef}
          playsInline
          autoPlay
          muted
        />
        <div></div>
        <div className={styles.btns}>
          {cameraOn ? (
            <img
              className={styles.btn}
              alt=""
              src="/img/camera_off.png"
              onClick={handleCameraOff}
            />
          ) : (
            <img
              className={styles.btn}
              alt=""
              src="/img/camera_on.png"
              onClick={handleCameraOff}
            />
          )}
          {micOn ? (
            <img
              className={styles.btn}
              alt=""
              src="/img/mic_off.png"
              onClick={handleMicOff}
            />
          ) : (
            <img
              className={styles.btn}
              alt=""
              src="/img/mic_on.png"
              onClick={handleMicOff}
            />
          )}
          <img
            className={styles.btn}
            alt=""
            src="/img/camera_trans.png"
            onClick={handleCamDirection}
          />
          {chat ? (
            <img
              className={styles.btn}
              alt=""
              src="/img/chat_off.png"
              onClick={handleShowChat}
            />
          ) : (
            <img
              className={styles.btn}
              alt=""
              src="/img/chat_on.png"
              onClick={handleShowChat}
            />
          )}
        </div>
        <div
          className={styles.messageBox}
          style={{ display: chat ? "flex" : "none" }}
        >
          <Messages>{messages.map(showMessages)}</Messages>
          <form onSubmit={sendMessage} className={styles.formBox}>
            <input
              value={text}
              className={styles.inputBox}
              onChange={(e) => setText(e.target.value)}
              placeholder="채팅 입력하기"
            ></input>
            <button className={styles.submitBtn} type="submit" disabled={!text}>
              보내기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VideoChat;
