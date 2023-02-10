import classes from "./MeerkatPin.module.css";
import { useSelector } from "react-redux";

const MeerkatPin = () => {
  const { choice } = useSelector((state) => state.auth);

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
