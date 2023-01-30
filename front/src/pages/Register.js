import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Error from 'components/Error'
import { registerUser } from 'api/auth'

const Register = () => {
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.user
  )
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()

  const navigate = useNavigate()

  useEffect(() => {
    // 가입이 성공했다면, Login page로 Redirect 하기
    if (success) navigate('/login')
    // 만약 로그인 한 계정이라면 홈으로 Redirect 하기
    if (userInfo) navigate('/home') 
  }, [navigate, userInfo, success]) // userInfo와 success가 변경되면 리렌더링하기

  const submitForm = (data) => {
    if (data.password !== data.confirmPassword) {
      alert('패스워드가 일치하지 않습니다.')
      return
    }
    data.email = data.email.toLowerCase()
    dispatch(registerUser(data)) // Form에 작성된 데이터 한 번에 보내기
  }

  // Form 으로 작성되는 거 required 밑에 유효성 체크 추가해야함

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {error && <Error>{error}</Error>}
      <div className='form-group'>
        <label htmlFor='firstName'>First Name</label>
        <input
          type='text'
          className='form-input'
          {...register('firstName')}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          className='form-input'
          {...register('email')}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          className='form-input'
          {...register('password')}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='email'>Confirm Password</label>
        <input
          type='password'
          className='form-input'
          {...register('confirmPassword')}
          required
        />
      </div>
      <button type='submit' className='button' disabled={loading}>
        {loading ? <Spinner /> : 'Register'}
      </button>
    </form>
  )
}
export default Register