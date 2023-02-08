import { useState } from "react";

// import customAxios from "api/customAxios";
import haversine from "haversine-distance";
import moment from "moment";

import classes from "./RegistModal.module.css";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const RegistModal = (props) => {
  let date = new Date();
  const meerkat = false;
  let certification = false;
  const lat = props.lat;
  const lng = props.lng;
  let array = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];
  const [hourSelect, setHourSelect] = useState(1);
  const [coin, setCoin] = useState();

  // 미어캣, 요청 등록 버튼
  const registButtonHandler = async () => {
    let hour = hourSelect;
    if (meerkat) {
      if (hourSelect < 10) {
        hour = `0${hour}`;
      }
      // eslint-disable-next-line
      if (hourSelect == 24) {
        hour = "00";
      }
    }
    if (meerkat && certification === false) {
      alert("위치인증을 해주세요");
    } else if (meerkat) {
      console.log("미어캣 요청 axios");
      const startAt = moment().format("YYYY-MM-DDTHH:mm:sszz");
      let exp_date = moment().format(`YYYY-MM-DDT${hour}:00:00`);
      if (date.getHours() > hourSelect) {
        exp_date = moment().add(1, "d").format(`YYYY-MM-DDT${hour}:00:00`);
      }
      console.log(startAt);
      console.log(exp_date);
      // 위치 인증했고 meerkat일 때
      // const meerkatRegist = {
      //   "exp_date": startAt,
      //   "reg_date": exp_date,
      //   "lat": lat,
      //   "lng": lng,
      //   "location": String,
      // };
      // 미어캣 등록 axios 요청

      //미어캣 등록이 완료되었습니다. 창 띄워주고 메인페이지로!
      //해당 좌표를 다시 보여주기(선택)
    } else {
      // 요청일 때
      // const requestRegist = {
      //   "createAt": "YYYY-MM-DDTHH:mm:sszz",
      //   "modifiedAt": "YYYY-MM-DDTHH:mm:sszz",
      //   "coin": 5,
      //   "content": "String",
      //   "lat": lat,
      //   "lng": lng,
      //   "location": String,
      //   "room_id": "",
      //   "member_id": "Bigint"
      // };
      // 요청 axios 요청
      console("요청 보내기");
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

    console.log("등록 위치 : " + lat + " " + lng);
    //등록 위치와 내 현재 위치 사이의 거리를 계산해줌(반환값은 miter)
    const distance = haversine(start, end);

    // 500미터 안에 있을 때 위치 인증 성공
    if (distance < 500) {
      certification = true;
      alert("위치 인증이 완료 되었습니다.");
      certification = true;
    } else if (distance >= 0.5) {
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
        console.log("현재 내 위치 : " + myLat + " " + myLng);
        resolve({ myLat, myLng });
      });
    });
  };

  //셀렉트박스 시간 설정
  const handleHourSelect = (e) => {
    setHourSelect(e.target.value);
  };
  //설정된 코인 값 바꾸기
  function valuetext(value) {
    setCoin(value);
  }

  return (
    <div className={classes.modal}>
      {meerkat && (
        <img
          className={classes.img}
          alt="meerkat"
          src="img/meerkat_profile.png"
        ></img>
      )}
      {!meerkat && (
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
      {meerkat && (
        <button className="cBtn" onClick={confirmBtnHandler}>
          위치인증
        </button>
      )}
      {meerkat && <h3>종료시간</h3>}
      {meerkat && (
        <select onChange={handleHourSelect} value={hourSelect}>
          {array.map((item) => (
            <option value={item} key={item}>
              {item}:00시까지
            </option>
          ))}
        </select>
      )}
      {!meerkat && (
        <Box sx={{ width: 250, ml: 2}} id="coinBox">
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
      {!meerkat && (
        <div className={classes.requestBox}>
          <h3>요청내용</h3>
          <textarea rows={5} cols={30}></textarea>
        </div>
      )}
      <br></br>
      <button onClick={props.modalHandler}>취소</button>
      <button onClick={registButtonHandler}>등록</button>
    </div>
  );
};

export default RegistModal;
