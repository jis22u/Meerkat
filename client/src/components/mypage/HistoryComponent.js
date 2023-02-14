import classes from "./HistoryComponent.module.css";

const HistoryComponent = (props) => {
    const meerkat = props.IsMeerkat;

    return(
        <div className={classes.item}>
            <img className={classes.img} alt="" src={meerkat ? "img/meerkat_profile.png" : "img/request_profile.png"} />
            <div>{props.Info.location}</div>
            <h3>{props.Info.coin}</h3>
        </div>
    )
}

export default HistoryComponent;