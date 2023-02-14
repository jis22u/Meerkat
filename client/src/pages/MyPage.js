import { useDispatch } from "react-redux";
import { logout } from "store/modules/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import classes from "./Mypage.module.css";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import Brightness5OutlinedIcon from "@mui/icons-material/Brightness5Outlined";
import { getMypage } from "api/user";
import History from "components/mypage/History";
// useSelector로 nickname 가져오기

const MyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [requestList, setRequestList] = useState();
  const [responseList, setResponseList] = useState();

  useEffect(() => {
    getMypage().then((response) => {
      setData(response);
      console.log(response);
      setRequestList(response.memPageDealDTOReqList);
      setResponseList(response.memPageDealDTOResList);
    });
  }, []);

  //   getMypage().then(response => {
  //     setData(response.data.value);
  //   })

  //   requestList =  data.memPageDealDTOReqList;
  //   responseList = data.memPageDealDTOResList;

  //   console.log(data);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className="box">
      {data && (
        <div className={classes.box}>
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
          <div className={classes.coinBox}>
            <div className={classes.coinText}>
            <AttachMoneyOutlinedIcon fontSize="large" />
            <h2>160</h2>
            </div>
            <div className={classes.coinBtn}>
              <button onClick={() => navigate("/cash")}>충전</button>
              <button>환전</button>
            </div>
          </div>
          <div className={classes.history}>
            <History requestList={requestList} responseList={responseList} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;
