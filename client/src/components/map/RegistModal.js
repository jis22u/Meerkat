import customAxios from "../../api/customAxios";

import classes from "./RegistModal.module.css";

const RegistModal = (props) => {
  const meerkat = false;
  const certification = false;



  const registButtonHandler = async() => {
    if(meerkat && certification === false){
     alert("위치인증을 해주세요");
    } else if (meerkat) { // 위치 인증했고 meerkat일 때
      const meerkatRegist = {

      };
      // 미어캣 등록 axios 요청
    } else { // 요청일 때
      const requestRegist = {

      };
      // 요청 axios 요청
    }
  };

  return (
    <div className={classes.modal}>
      {meerkat && <img className={classes.img} alt="meerkat" src="img/meerkat_prifile.png"></img>}
      {!meerkat && <img className={classes.img} alt="request" src="img/request_profile.png" />}
      <p>유저닉네임</p>
      <hr></hr>
      <p>선택 위치</p>
      <p>{props.address}</p>
      <button onClick className="cBtn">위치인증</button>
      <p>종료시간</p>
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
