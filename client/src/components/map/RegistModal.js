import { useState, useRef } from "react";
import { setMeerkat, sendRequest } from "api/map";

import haversine from "haversine-distance";
import moment from "moment";

import classes from "./RegistModal.module.css";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const RegistModal = (props) => {
  const navigate = useNavigate();
  let date = new Date();
  const { choice } = useSelector((state) => state.auth);
  let certification = false;
  const lat = props.lat;
  const lng = props.lng;
  const location = props.address;
  let content = useRef();
  let array = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];
  let hourSelect = useRef(1);
  const [coin, setCoin] = useState();

  // 미어캣, 요청 등록 버튼
  const registButtonHandler = async () => {
    let hour = hourSelect.current.value;

    if (choice && certification === false) {
      alert("위치인증을 해주세요");
    } else if (choice) {
      if (hourSelect.current < 10) hour = `0${hour}`;

      if (hourSelect === 24) hour = "00";

      const startAt = moment().format("YYYY-MM-DDTHH:mm:ss");
      let exp_date = moment().format(`YYYY-MM-DDT${hour}:00:00`);

      if (date.getHours() > hourSelect.current || hourSelect.current === 24)
        exp_date = moment().add(1, "d").format(`YYYY-MM-DDT${hour}:00:00`);

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
    } else if (distance >= 50900090909090) {
      alert("등록 위치에서 멀리 떨어져잇습니다.");
    } else {
      alert("위치 인증에 실패했습니다.");
    }
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

  //설정된 코인 값 바꾸기
  function valuetext(value) {
    setCoin(value);
  }

  return (
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
      {choice && <h3>종료시간</h3>}
      {choice && (
        <select ref={hourSelect}>
          {array.map((item) => (
            <option value={item} key={item}>
              {item}:00시까지
            </option>
          ))}
        </select>
      )}
      {!choice && (
        <Box sx={{ width: 250, ml: 2 }} id="coinBox">
          <div className={classes.coinView}>
            <h3>금액</h3>
            <h3>{coin}</h3>
          </div>
          <Slider
            aria-label="Coin"
            defaultValue={10}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            step={5}
            marks
            min={5}
            max={25}
          />
        </Box>
      )}
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
  );
};

export default RegistModal;
