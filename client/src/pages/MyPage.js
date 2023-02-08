import { useDispatch } from 'react-redux'
import { logout } from 'store/modules/authSlice'
import { useNavigate } from "react-router-dom";

// useSelector로 nickname 가져오기

const MyPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <div>
            <button onClick={() => navigate('/change-account')}>회원정보 수정</button>
            <button onClick={logoutHandler}>로그아웃</button>
            <button onClick={() => navigate('/cash')}>충전하기</button>
            <button>환전하기</button>
        </div>
    );
};

export default MyPage;