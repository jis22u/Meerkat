// import customAxios from "api/customAxios";
import haversine from "haversine-distance";

import moment from "moment";

import classes from "./RegistModal.module.css";

const RegistModal = (props) => {
  const meerkat = true;
  var certification = true;
  const lat = props.lat;
  const lng = props.lng;
  var myLat = 0;
  var myLng = 0;

  const registButtonHandler = async () => {
    if (meerkat && certification === false) {
      alert("위치인증을 해주세요");
    } else if (meerkat) {
      // 위치 인증했고 meerkat일 때
      // const meerkatRegist = {
      //   "modifiedAt": "",
      //   "exp_date": "YYYY-MM-DDTHH:mm:sszz",
      //   "lat": lat,
      //   "lng": lng,
      //   "location": String,
      //   "reg_date": "YYYY-MM-DDTHH:mm:sszz",
      //   "member_id": "Bigint"
      // };
      // 미어캣 등록 axios 요청
      console.log("미어캣 요청 axios");
      const hour = 10;
      const minute = 30;
      const startAt = moment().format("YYYY-MM-DDTHH:mm:sszz");
      const exp_date = moment().format(`YYYY-MM-DDT${hour}:${minute}:00`);
      console.log(startAt);
      console.log(exp_date);
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

  const confirmBtnHandler = async () => {

    await getDistance();

    const start = {
      lat: myLat,
      lng: myLng
    };

    const end = {
      lat: lat,
      lng: lng
    };

    const distance = haversine(start, end);
    // 연수원 위치
    if (distance < 500) {
      certification = true;
      alert("위치 인증이 완료 되었습니다.");
    } else if (distance >= 0.5) {
      alert("등록 위치에서 멀리 떨어져잇습니다.");
    } else {
      alert("위치 인증에 실패했습니다.");
    }
    console.log(distance);
  };

  const getDistance = () => {
    return new Promise(resolve => {
      navigator.geolocation.getCurrentPosition((position) => {
        myLat = position.coords.latitude.toFixed(14);
        myLng = position.coords.longitude.toFixed(14);
        console.log("현재 내 위치는 " + myLat + " " + myLng);
        console.log("내가 등록하려는 위치는 " + lat + " " + lng);
      });
    });
  };

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
      <button className="cBtn" onClick={confirmBtnHandler}>
        위치인증
      </button>
      <h3>종료시간</h3>
      <select>
        <option>d</option>
        <option>d</option>
        <option>d</option>
        <option>d</option>
      </select>
      <br></br>
      <button onClick={props.modalHandler}>취소</button>
      <button onClick={registButtonHandler}>등록</button>
    </div>
  );
};

export default RegistModal;
