import { useState, useRef } from "react";
import { setMeerkat, sendRequest } from "api/map";

import haversine from "haversine-distance";
import moment from "moment";

import classes from "./RegistModal.module.css";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ExpiredDate from "./ExpiredDate";
import SelectCoin from "./SelectCoin";

const RegistModal = (props) => {
  const navigate = useNavigate();
  let date = new Date();
  const { choice } = useSelector((state) => state.auth);
  let certification = false;
  const lat = props.lat;
  const lng = props.lng;
  const location = props.address;
  let content = useRef();

  let hourSelect = useRef(1);
  const [coin, setCoin] = useState();

  // 미어캣, 요청 등록 버튼
  const registButtonHandler = async () => {
    let hour = hourSelect.current.value;

    if (choice && certification === false) {
      alert("위치인증을 해주세요");
    } else if (choice) {
      if (hourSelect.current.value < 10) hour = `0${hour}`;

      if (hourSelect === 24) hour = "00";

      const startAt = moment().format("YYYY-MM-DD HH:MM:SS");
      let exp_date = moment().format(`"YYYY-MM-DD ${hour}:00:00"`);

      if (
        date.getHours() >= hourSelect.current.value ||
        hourSelect.current.value === 24
      )
        exp_date = moment().add(1, "d").format(`"YYYY-MM-DD ${hour}:00:00"`);

      const meerkatContent = {
        exp_date: exp_date,
        reg_date: startAt,
        lat: lat,
        lng: lng,
        location: location,
      };

      // 미어캣 등록 axios 요청
      await setMeerkat(meerkatContent);
      navigate("/registration-detail");
    } else {
      const requestContent = {
        coin: 5,
        content: content.current.value,
        lat: lat,
        lng: lng,
        location: location,
      };
      // 요청 axios 요청
      const { data } = await sendRequest(requestContent);
      if (data.status === "OK") {
        navigate(`/room/${data.value.roomName}/${data.value.idx}`); 
      } else {
        alert(data.message)
      }
    }
  };

  //위치 인증
  const confirmBtnHandler = async () => {
    const { myLat, myLng } = await getLocation();

    const start = {
      lat: myLat,
      lng: myLng,
    };
    const end = {
      lat: lat,
      lng: lng,
    };

    console.log(myLat + " " + myLng);
    console.log(lat + " " + lng);

    const distance = haversine(start, end);

    if (distance < 50900090909090) {
      certification = true;
      alert("위치 인증이 완료 되었습니다.");
      certification = true;
    } else if (distance >= 50900090909090)
      alert("등록 위치에서 멀리 떨어져잇습니다.");
    else alert("위치 인증에 실패했습니다.");

    console.log(distance);
  };

  const getLocation = () => {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition((position) => {
        const myLat = position.coords.latitude.toFixed(14);
        const myLng = position.coords.longitude.toFixed(14);
        resolve({ myLat, myLng });
      });
    });
  };

  return (
    <div className={classes.modalBox}>
      <div className={classes.modal}>
        {choice && (
          <img
            className={classes.img}
            alt="meerkat"
            src="img/meerkat_profile.png"
          ></img>
        )}
        {!choice && (
          <img
            className={classes.img}
            alt="request"
            src="img/request_profile.png"
          />
        )}
        <h3>유저닉네임</h3>
        <hr></hr>
        <h3>선택 위치</h3>
        <p>{props.address}</p>
        {choice && (
          <button className="cBtn" onClick={confirmBtnHandler}>
            위치인증
          </button>
        )}
        {choice && <ExpiredDate hourSelect={hourSelect} />}
        {!choice && <SelectCoin coin={coin} setCoin={setCoin} />}
        {!choice && (
          <div className={classes.requestBox}>
            <h3>요청내용</h3>
            <textarea rows={5} cols={30} ref={content}></textarea>
          </div>
        )}
        <br></br>
        <button onClick={props.modalHandler}>취소</button>
        <button onClick={registButtonHandler}>등록</button>
      </div>
    </div>
  );
};

export default RegistModal;
