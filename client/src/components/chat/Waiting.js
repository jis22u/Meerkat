import styles from './Waiting.module.css'

const Waiting = ({time}) => {
    return (
        <div className = "extendBox">
            <h1>남은 시간 </h1>
            <h4>{parseInt(time / 60)} : {time % 60 < 10 ? '0' + time % 60 : time % 60 }</h4>
            <img className={styles.picture} alt="" src={process.env.PUBLIC_URL + "/img/meerkat_waiting.png"} ></img>
        </div>
    )
} 


export default Waiting