import { useState, useRef } from "react";
import { setMeerkat, sendRequest } from "api/map";
import { setChoice } from "store/modules/authSlice";
import { useDispatch } from "react-redux";

import haversine from "haversine-distance";
import moment from "moment";

import classes from "./RegistModal.module.css";

import { useNavigate } from "react-router";
import ExpiredDate from "./ExpiredDate";
import SelectCoin from "./SelectCoin";
import Swal from "sweetalert2";
import { sendFcm } from "api/map";

const RegistModal = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let date = new Date();
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

    //미어캣인데 위치인증을 하지 않은 경우
    if (props.check && certification === false) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "위치인증을 해주세요",
        showConfirmButton: false,
        timer: 1500,
      });
      // 위치인증을 했고 미어캣일 때
    } else if (props.check) {
      dispatch(setChoice(props.check));
      if (hourSelect.current.value < 10) hour = `0${hour}`;

      if (hourSelect === 24) hour = "00";

      const startAt = moment().format("YYYY-MM-DD HH:MM:00");
      let expDate = moment().format(`YYYY-MM-DD ${hour}:00:00`);

      if (
        date.getHours() >= hourSelect.current.value ||
        hourSelect.current.value === 24
      )
        expDate = moment().add(1, "d").format(`YYYY-MM-DD ${hour}:00:00`);

      const meerkatContent = {
        expDate: expDate,
        regDate: startAt,
        lat: lat,
        lng: lng,
        location: location,
      };

      await setMeerkat(meerkatContent);
      navigate("/registration-detail");
      //요청일 때
    } else {
      if (props.coin - coin < 0) {
         Swal.fire({
           position: "center",
           icon: "warning",
           title: "코인이 부족합니다.",
           showConfirmButton: false,
           timer: 1500,
         });
        return;
      }

      const requestContent = {
        coin: coin,
        content: content.current.value,
        lat: lat,
        lng: lng,
        location: location,
      };
      const { data } = await sendRequest(requestContent);
      if (data.status === "OK") {
        dispatch(setChoice(props.check));
        data.value.fcmTokenList.forEach((each) => {
          sendFcm(data.value)
        })
        navigate(`/room/${data.value.roomName}/${data.value.idx}`);
      } else {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: `${data.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
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


    const distance = haversine(start, end);

    if (distance < 1000) {
      certification = true;
      Swal.fire({
        position: "center",
        icon: "success",
        title: "위치 인증이 완료 되었습니다.",
        showConfirmButton: false,
        timer: 1500,
      });
      certification = true;
    } else if (distance >= 1000)
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "등록 위치에서 멀리 떨어져 있습니다.",
        showConfirmButton: false,
        timer: 1500,
      });
    else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "위치 인증에 실패했습니다.",
        showConfirmButton: false,
        timer: 1500,
      });
    }

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
        {props.check && (
          <img
            className={classes.img}
            alt="meerkat"
            src="img/meerkat_profile.png"
          ></img>
        )}
        {!props.check && (
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
        {props.check && (
          <button className="btn" onClick={confirmBtnHandler}>
            위치인증
          </button>
        )}
        {props.check && <ExpiredDate hourSelect={hourSelect} />}
        {!props.check && <SelectCoin coin={coin} setCoin={setCoin} />}
        {!props.check && (
          <div className={classes.requestBox}>
            <h3>요청내용</h3>
            <textarea
              className={classes.textarea}
              rows={5}
              cols={30}
              ref={content}
            ></textarea>
          </div>
        )}
        <br></br>
        <div className="hBox">
          <button className={classes.btn} onClick={props.modalHandler}>
            취소
          </button>
          <button className={classes.btn} onClick={registButtonHandler}>
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistModal;
