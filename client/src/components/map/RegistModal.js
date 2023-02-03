import classes from "./RegistModal.module.css";

const RegistModal = (props) => {
  const meerkat = false;

  const registButtonHandler = () => {
    props.modalHandler();
  };

  return (
    <div className={classes.modal}>
      {meerkat && <img alt="meerkat" src=""></img>}
      {!meerkat && <img alt="request" src=""/>}
      <p>유저닉네임</p>
      <hr></hr>
      <p>선택 위치</p>
      <p>{props.address}</p>
      <button>위치인증</button>
      <p>종료시간</p>
      <select>
        <option>d</option>
        <option>d</option>
        <option>d</option>
        <option>d</option>
      </select>
      <br></br>
      <button onClick={registButtonHandler}>취소</button>
      <button>등록</button>
    </div>
  );
};

export default RegistModal;
