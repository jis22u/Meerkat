import {useLocation} from 'react-router-dom'

const HangUp = () => {
    const { state } = useLocation();

    return (
        state ? 
        <div>
            <img alt="" src={process.env.PUBLIC_URL + "/img/hang_up_response.png"}></img>
        </div> : 
        <div>
            <img alt="" src={process.env.PUBLIC_URL + "/img/hang_up_request.png"}></img>
        </div>
    )
}

export default HangUp