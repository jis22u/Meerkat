import classes from "./RegistrationDetail.module.css";
import { useEffect, useState } from "react";

const RegistrationDetail = () => {
  const [detailContent, setDetailContent] = useState();

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
        <h3>종료시간</h3>
        {detailContent && <p>{detailContent.end}</p>}
      </div>
      <div className={classes.buttons}>
        <button>수정</button>
        <button>삭제</button>
      </div>
    </div>
  );
};

export default RegistrationDetail;
