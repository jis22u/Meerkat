import { useDispatch } from "react-redux";
import { logout } from "store/modules/authSlice";
import { useNavigate, Link } from "react-router-dom";
import classes from "./Mypage.module.css";
import Brightness5OutlinedIcon from "@mui/icons-material/Brightness5Outlined";
// useSelector로 nickname 가져오기

const MyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className="box">
      <div className={classes.mypageTopBox}>
        <h1>마이페이지</h1>
        <div className={classes.linkBox}>
          <div className={classes.modifyInfo}>
            <button
              className={classes.mypageTopBtn}
              onClick={() => navigate("/change-account")}
            >
              회원정보 수정
            </button>
            <Brightness5OutlinedIcon />
          </div>
          <button className={classes.mypageTopBtn} onClick={logoutHandler}>
            로그아웃
          </button>
        </div>
      </div>
      <button onClick={() => navigate("/cash")}>충전하기</button>
      <button>환전하기</button>
    </div>
  );
};

export default MyPage;
