import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerUser } from 'api/auth'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// import Error from 'components/layout/Error'

const schema = yup
  .object({
    memberId: yup
      .string()
      .min(6, "최소 6자 이상 작성해야 합니다.")
      .max(12, "최대 12자까지 작성 가능합니다.")
      .matches(
        /^[A-Za-z][A-Za-z0-9_]{6,12}$/,
        "아이디는 숫자, 영문으로 작성 가능합니다."
      )
      .required("비밀번호를 입력해 주세요!"),

      password: yup
      .string()
      .min(8, "최소 8자 이상 작성해야 합니다.")
      .max(16, "최대 16자까지 작성 가능합니다.")
      .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{8,16}$/,
      "비밀번호는 영어, 숫자, 특수문자만 가능합니다.")
      .required("비밀번호를 입력해 주세요!"),

      checkPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다')
      .required('비밀번호를 한번 더 입력해 주세요'),

      name: yup
      .string()
      .min(4, "최소 4자 이상 작성해야 합니다.")
      .max(12, "최대 12자까지 작성 가능합니다.")
      .matches(
        /^[A-Za-z0-9가-힣]{4,12}$/,
        "닉네임은 영어, 한글, 숫자만 가능합니다."
      )
      .required(),

      email: yup
      .string()
      .matches(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i, "이메일을 정확히 입력해 주세요.")
      .required('이메일을 입력해 주세요.'),
      
      tell: yup
      .string()
      .matches(/^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/, "번호를 정확히 입력해 주세요.")
    })
  .required();

const Register = () => {
  const { loading, userInfo, success } = useSelector((state) => state.auth)
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
    // 가입이 성공했다면, Login page로 Redirect 하기
    if (success) navigate('/login')
    // 만약 로그인 한 계정이라면 홈으로 Redirect 하기
    if (userInfo) navigate('/home') 
  }, [navigate, userInfo, success]) // userInfo와 success가 변경되면 리렌더링하기

  const submitForm = (data) => {
    data.email = data.email.toLowerCase()
    data.memberId = data.memberId.toLowerCase()
    dispatch(registerUser(data)) // Form에 작성된 데이터 한 번에 보내기
  }

  // Form 으로 작성되는 거 required 밑에 유효성 체크 추가해야함

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {/* {error && <Error>{error}</Error>} */}
      <div className='form-group'>
        <label htmlFor='memberId'>ID</label>
        <input
          {...register('memberId')}
        />
      </div>
      <p>{errors.memberId?.message}</p>
      <div className='form-group'>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          {...register('password')}
        />
      </div>
      <p>{errors.password?.message}</p>
      <div className='form-group'>
        <label htmlFor='checkPassword'>Confirm Password</label>
        <input
          type='password'
          {...register('checkPassword')}
        />
      </div>
      <p>{errors.checkPassword?.message}</p>
      <div className='form-group'>
        <label htmlFor='email'>Email</label>
        <input
          {...register('email')}
        />
      </div>
      <p>{errors.email?.message}</p>
      <div className='form-group'>
        <label htmlFor='name'>Nickname</label>
        <input
          {...register('name')}
        />
      </div>
      <p>{errors.name?.message}</p>
      <div className='form-group'>
        <label htmlFor='tell'>Phone</label>
        <input
          {...register('tell')}
        />
      </div>
      <p>{errors.tell?.message}</p>
      <button type='submit' className='button' disabled={loading}>
        {loading ? '대기중' : 'Register'}
        {/* <Spinner /> */}
      </button>
    </form>
  )
}
export default Register