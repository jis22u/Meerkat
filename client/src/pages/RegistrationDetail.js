import classes from "./RegistrationDetail.module.css";
import { useEffect, useState, useRef } from "react";
import moment from "moment";
import { getMeerkatDetail, modifyMeerkat, deleteMeerkat } from "api/map";
import { useNavigate } from "react-router-dom";
import ExpiredDate from "components/map/ExpiredDate";
import Swal from "sweetalert2";

const RegistrationDetail = () => {
  const [detailContent, setDetailContent] = useState();
  const [modify, setModify] = useState(false);
  const [regist, setRegist] = useState(true);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  let date = new Date();
  let hourSelect = useRef(1);
  const navigate = useNavigate();

  let array = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];

  useEffect(() => {
    //데이터 받아와서 데이터 객체로 만들기
    getMeerkatDetail()
      .then((response) => {
        if (response.message === "받은 정보가 비어있습니다.") {
          setRegist(false);
          return;
        }
        setDetailContent(response.value);
        return response;
      })
      .then((response) => {
        if (response === undefined) return;
        setEndTime(
          moment(response.value.expDate).format("YYYY년 MM월 DD일  HH시 mm분")
        );
        setStartTime(
          moment(response.value.regDate).format("YYYY년 MM월 DD일  HH시 mm분")
        );
      });
  }, []);

  const modifyButtonHandler = async () => {
    if (modify === true) {
      let hour = hourSelect.current.value;

      if (hourSelect.current.value < 10) hour = `0${hour}`;

      if (hourSelect === 24) hour = "00";

      let expDate = moment().format(`YYYY-MM-DD ${hour}:00:00`);
      if (
        date.getHours() >= hourSelect.current.value ||
        hourSelect.current.value === 24
      )
        expDate = moment().add(1, "d").format(`YYYY-MM-DD ${hour}:00:00`);

      let newDetailContext = {
        expDate: expDate,
        regDate: moment(detailContent.regDate).format("YYYY-MM-DD HH:MM:SS"),
        lat: detailContent.lat,
        lng: detailContent.lng,
        location: detailContent.location,
      };
      console.log(newDetailContext);
      // 미어캣 등록 axios 요청
      modifyMeerkat(newDetailContext)
        .then((responce) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${responce.data.message}`,
            showConfirmButton: false,
            timer: 1500,
          });
          setDetailContent(newDetailContext);
          setModify(false);
        })
    } else {
      setModify(true);
    }
  };

  const deletButtonHandler = async () => {
    const { data } = await deleteMeerkat();
    if (data.status === "OK") {
      setRegist(false);
      setDetailContent();
    }
  };

  return (
    <div className="box">
      {detailContent && (
        <div className={classes.box}>
          <h1 className="title">등록내역</h1>
          <div className="customBox">
            <img
              src="img/meerkat_profile.png"
              alt="meerkat"
              className={classes.img}
            />
            <h2>닉네임</h2>
            <hr />
            <h3>선택위치</h3>
            <p>{detailContent.location}</p>
            <h3>시작시간</h3>
            <p>{startTime}</p>
            {!modify && (
              <div>
                <h3>종료시간</h3>
                <p>
                  {moment(detailContent.expDate).format(
                    "YYYY년 MM월 DD일  HH시 mm분"
                  )}
                </p>
              </div>
            )}
            {modify && <ExpiredDate hourSelect={hourSelect} />}
          </div>

          <div className={classes.buttons}>
            {modify && (
              <button
                className={classes.button}
                onClick={() => setModify(false)}
              >
                취소
              </button>
            )}
            <button className={classes.button} onClick={modifyButtonHandler}>
              수정
            </button>
            {!modify && (
              <button className={classes.button} onClick={deletButtonHandler}>
                삭제
              </button>
            )}
          </div>
        </div>
      )}
      {!regist && (
        <div className={classes.notFound}>
          <h3>조회된 등록 내역이 없습니다</h3>
          <button
            className={classes.registBtn}
            onClick={() => navigate("/map", { state: { check: true } })}
          >
            <img
              alt=""
              className={classes.meerkatImg}
              src="img/meerkat_profile.png"
            />
          </button>
          미어켓 등록하러 가기
        </div>
      )}
    </div>
  );
};

export default RegistrationDetail;
