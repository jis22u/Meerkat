import { setChoice } from "store/modules/authSlice";
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";


const Home = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const clickHandler = (choice) => {
        dispatch(setChoice(choice))
        navigate('/map')
    }

    return (
        <div>
            <button onClick={() => clickHandler(true)}>미어캣</button>
            <button onClick={() => clickHandler(false)}>요청캣</button>
        </div>
    )
};

export default Home;