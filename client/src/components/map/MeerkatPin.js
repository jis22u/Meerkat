import classes from "./MeerkatPin.module.css";

const MeerkatPin = (props) => {

  return (
    <div className={classes.pin}>
      {props.check && (
        <img alt="" src="img/meerkat_pin.png" className={classes.meerkatPinImg}></img>
      )}
      {!props.check && (
        <img alt="" src="img/request_pin.png" className={classes.requestPinImg}></img>
      )}
    </div>
  );
};

export default MeerkatPin;
