import classes from "./RegistrationDetail.module.css";
import { useEffect, useState } from "react";
import moment from "moment";
import { getMeerkatDetail, modifyMeerkat, deleteMeerkat } from "api/map";
import { setChoice } from "store/modules/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const RegistrationDetail = () => {
  const [detailContent, setDetailContent] = useState();
  const [modify, setModify] = useState(false);
  const [hourSelect, setHourSelect] = useState(1);
  const [regist, setRegist] = useState(true);
  let date = new Date();
  let newDetailContext = {};
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let array = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];

  useEffect(() => {
    //데이터 받아와서 데이터 객체로 만들기
    getMeerkatDetail()
      .then((responce) => {
        setDetailContent(responce.value);
        if (responce.message === "받은 정보가 비어있습니다.") {
          setRegist(false);
        }
      })
      .catch((error) => setRegist(false));
  }, []);

  const modifyButtonHandler = async () => {
    if (modify === true) {
      let hour = hourSelect;

      if (hourSelect < 10) {
        hour = `0${hour}`;
      }
      // eslint-disable-next-line
      if (hourSelect == 24) {
        hour = "00";
      }

      console.log("미어캣 요청 axios");
      let exp_date = moment().format(`YYYY-MM-DDT${hour}:00:00`);
      if (date.getHours() > hourSelect) {
        exp_date = moment().add(1, "d").format(`YYYY-MM-DDT${hour}:00:00`);
      }
      console.log(exp_date);

      newDetailContext = {
        exp_data: exp_date,
        reg_date: detailContent.reg_date,
        lat: detailContent.lat,
        lng: detailContent.lng,
        location: detailContent.location,
      };
      newDetailContext.exp_date = exp_date;

      // 미어캣 등록 axios 요청
      modifyMeerkat(newDetailContext).then((responce) => {
        alert(responce.data.message);
      });
      setModify(false);
    } else {
      setModify(true);
    }
  };

  const handleHourSelect = (e) => {
    setHourSelect(e.target.value);
  };

  const deletButtonHandler = async () => {
    setRegist(false);
    setDetailContent();
    await deleteMeerkat();
  };

  const registButtonHandler = (choice) => {
    dispatch(setChoice(choice));
    navigate("/map");
  };

  return (
    <div>
      {detailContent && (
        <div>
          <h1 className="title">등록내역</h1>
          <div className="customBox">
            <img
              src="img/meerkat_profile.png"
              alt="meerkat"
              className={classes.img}
            />
            <h3>닉네임</h3>
            <hr />
            <h3>선택위치</h3>
            <p>{detailContent.location}</p>
            <h3>시작시간</h3>
            <p>{detailContent.reg_date}</p>
            {!modify && (
              <div>
                <h3>종료시간</h3>
                <p>{detailContent.exp_date}</p>
              </div>
            )}
            {modify && (
              <div>
                <h3>종료시간</h3>
                {detailContent && <p>{detailContent.exp_date}</p>}
                {modify && (
                  <select onChange={handleHourSelect} value={hourSelect}>
                    {array.map((item) => (
                      <option value={item} key={item}>
                        {item}:00시까지
                      </option>
                    ))}
                  </select>
                )}
              </div>
            )}
          </div>
          <div className={classes.buttons}>
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
        <div>
          <div>조회된 등록 내역이 없습니다</div>
          <button onClick={() => registButtonHandler(true)}>
            등록하러 가기
          </button>
        </div>
      )}
    </div>
  );
};

export default RegistrationDetail;
