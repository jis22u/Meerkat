import classes from "./MeerkatPin.module.css"

const MeerkatPin = () => {

    return <div className={classes.pin}>
        <img alt="" src="img/meerkat_pin.png" className={classes.pinImg}></img>
        <p>위치 선택</p>
    </div>
}

export default MeerkatPin;