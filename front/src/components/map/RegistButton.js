import classes from "./RegistButton.module.css";

const RegistButton = (props) => {

    return (
      <div className={classes.box}>
        <div className={classes.address}>
          <h1>현재주소</h1>
          <span> 여기에 주소를 보여줄거야 </span>
        </div>
        <div className={classes.btn}>
          <button >제출</button>
        </div>
      </div>
    );
}

export default RegistButton;