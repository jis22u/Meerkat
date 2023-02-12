import styles from './Waiting.module.css'

const Waiting = ({time}) => {
    return (
        <div className = {styles.container}>
            <img alt="" src={process.env.PUBLIC_URL + "/img/meerkat_waiting.png"} ></img>
            <p className = {styles.centered}>
                발빠른 미어캣을 찾는 중입니다.
                남은 시간 : {parseInt(time / 60)} : {time % 60 < 10 ? '0' + time % 60 : time % 60 }
            </p>
        </div>
    )
}


export default Waiting