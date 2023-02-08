import classes from "./MeerkatPin.module.css";

const MeerkatPin = () => {
  const meerkat = true;

  return (
    <div className={classes.pin}>
      {meerkat && (
        <img alt="" src="img/meerkat_pin.png" className={classes.meerkatPinImg}></img>
      )}
      {!meerkat && (
        <img alt="" src="img/request_pin.png" className={classes.requestPinImg}></img>
      )}
    </div>
  );
};

export default MeerkatPin;
