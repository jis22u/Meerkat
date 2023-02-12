import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "api/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classes from "./Login.module.css";
import PersonIcon from "@mui/icons-material/Person";
import HttpsIcon from "@mui/icons-material/Https";
// import Error from 'components/layout/Error'

const schema = yup
  .object({
    memberId: yup.string().required("비밀번호를 입력해 주세요 😦"),
    password: yup.string().required("비밀번호를 입력해 주세요 😦"),
  })
  .required();

const LoginScreen = () => {
  const { loading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  
  const submitForm = async (data) => {
    data.memberId = data.memberId.toLowerCase()
    const { payload } = await dispatch(userLogin(data))
    if (payload.status !== "OK"){
      alert(payload.message)
    }
  };

  return (
    <div className="main">
      <h1 className="title">로그인</h1>
      <div className="customBox">
        <form onSubmit={handleSubmit(submitForm)} className={classes.form}>
          {/* {error && <Error>{error}</Error>} */}
          <div className={classes.formGroup}>
            <PersonIcon fontSize="large"></PersonIcon>
            <input
              type="text"
              className={classes.input}
              placeholder="아이디"
              {...register("memberId")}
            />
            <p>{errors.memberId?.message}</p>
          </div>
          <div className={classes.formGroup}>
            <HttpsIcon fontSize="large"></HttpsIcon>
            <input
              type="password"
              className={classes.input}
              placeholder="비밀번호"
              {...register("password")}
            />
          </div>
          <p>{errors.password?.message}</p>
          <button type="submit" className={classes.loginBtn} disabled={loading}>
            {loading ? "대기중" : "로그인"}
            {/* <Spinner /> */}
          </button>
        </form>
      </div>
      <div className={classes.registerLink}>
        <p>계정이 없으신가요?</p> &nbsp;
        <Link to="/register">회원가입하기</Link>
      </div>
    </div>
  );
};
export default LoginScreen;
