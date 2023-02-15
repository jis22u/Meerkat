import classes from "./MeerkatPin.module.css";

const MeerkatPin = ({role}) => {
  const choice = role
  console.log(choice, 'pin')

  return (
    <div className={classes.pin}>
      {choice && (
        <img alt="" src="img/meerkat_pin.png" className={classes.meerkatPinImg}></img>
      )}
      {!choice && (
        <img alt="" src="img/request_pin.png" className={classes.requestPinImg}></img>
      )}
    </div>
  );
};

export default MeerkatPin;
