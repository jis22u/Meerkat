import classes from "./RegistrationDetail.module.css";
import { useEffect, useState } from "react";
import moment from "moment";

const RegistrationDetail = () => {
  const [detailContent, setDetailContent] = useState();
  const [modify, setModify] = useState(false);
  let date = new Date();

  let array = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];

  const [hourSelect, setHourSelect] = useState(1);

  useEffect(() => {
    //데이터 받아와서 데이터 객체로 만들기
    if (!detailContent) {
      console.log(detailContent);
      const tmp = {
        location: "대전광역시 유성구 어디대로 230-2",
        start: "2023-02-24 12:00:00",
        end: "2023-02-24 14:00:00",
      };
      setDetailContent(tmp);
    }
  }, [detailContent]);

  const registButtonHandler = async () => {
    setModify(true);

    let hour = hourSelect;

    if (hourSelect < 10) {
      hour = `0${hour}`;
    }
    // eslint-disable-next-line
    if (hourSelect == 24) {
      hour = "00";
    }

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
  };

  const handleHourSelect = (e) => {
    setHourSelect(e.target.value);
  };

  return (
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
        {detailContent && <p>{detailContent.location}</p>}
        <h3>시작시간</h3>
        {detailContent && <p>{detailContent.start}</p>}
        {modify && (
          <div>
            <h3>종료시간</h3>
            {detailContent && <p>{detailContent.end}</p>}
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
        <button className={classes.button} onClick={registButtonHandler}>
          수정
        </button>
        <button className={classes.button}>삭제</button>
      </div>
    </div>
  );
};

export default RegistrationDetail;
