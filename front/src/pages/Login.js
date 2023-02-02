import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from 'api/auth'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Error from 'components/layout/Error'

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
  const { loading, userInfo, error } = useSelector((state) => state.auth)
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
    if (userInfo) {
      navigate('/home')
    }
  }, [navigate, userInfo])

  const submitForm = (data) => {
    dispatch(userLogin(data))
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
        {loading ? '대기중' : 'Login'}
        {/* <Spinner /> */}
      </button>
    </form>
  )
}
export default LoginScreen