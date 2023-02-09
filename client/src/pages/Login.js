import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from 'api/auth'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// import Error from 'components/layout/Error'

const schema = yup
  .object({
    memberId: yup
      .string()
      .required("비밀번호를 입력해 주세요 😦"),
    password: yup
      .string()
      .required("비밀번호를 입력해 주세요 😦")
  })
  .required();

const LoginScreen = () => {
  const { loading, isLogin } = useSelector((state) => state.auth)
  // error 불러와서 쓰기
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  

  useEffect(() => {
    if (isLogin) {
      navigate('/')
    }
  }, [navigate, isLogin])

  const submitForm = async (data) => {
    data.memberId = data.memberId.toLowerCase()
    const { payload } = await dispatch(userLogin(data))
    if (payload.status === "BAD_REQUEST"){
      alert(payload.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {/* {error && <Error>{error}</Error>} */}
      <div className='form-group'>
        <label htmlFor='memberId'>아이디</label>
        <input
          type='text'
          className='form-input'
          {...register('memberId')}
        />
        <p>{errors.memberId?.message}</p>
      </div>
      <div className='form-group'>
        <label htmlFor='password'>비밀번호</label>
        <input
          type='password'
          className='form-input'
          {...register('password')}
        />
      </div>
      <p>{errors.password?.message}</p>
      <button type='submit' className='button' disabled={loading}>
        {loading ? '대기중' : '로그인'}
        {/* <Spinner /> */}
      </button>
      <Link to='/register'>회원가입</Link>
    </form>
  )
}
export default LoginScreen