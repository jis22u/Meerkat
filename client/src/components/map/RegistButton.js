import classes from "./RegistButton.module.css";

const RegistButton = (props) => {

  const registButtonHandler = () => {
    props.modalHandler();
  }

    return (
      <div className={classes.box}>
        <div className={classes.address}>
          <h1>현재주소</h1>
          <span>{props.address}</span>
        </div>
        <div className={classes.btn}>
          <button onClick={registButtonHandler}>제출</button>
        </div>
      </div>
    );
}

export default RegistButton;