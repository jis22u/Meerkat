import styles from './Waiting.module.css'

const Waiting = () => {
    return (
        <div className = {styles.picture}>
            <img alt="" src={process.env.PUBLIC_URL + "/img/meerkat_waiting.png"} ></img>
        </div>
    )
}


export default Waiting