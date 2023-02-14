import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from 'api/auth'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import Spinner from 'components/layout/Spinner'


const schema = yup
  .object({
    memberId: yup
      .string()
      .min(6, "최소 6자 이상 작성해야 합니다.")
      .max(12, "최대 12자까지 작성 가능합니다.")
      .matches(
        /^[A-Za-z][A-Za-z0-9_]{5,11}$/,
        "아이디는 숫자, 영문으로 작성 가능합니다."
      )
      .required("비밀번호를 입력해 주세요!"),

      password: yup
      .string()
      .min(8, "최소 8자 이상 작성해야 합니다.")
      .max(16, "최대 16자까지 작성 가능합니다.")
      .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{7,15}$/,
      "비밀번호는 영어, 숫자, 특수문자만 가능합니다.")
      .required("비밀번호를 입력해 주세요!"),

      checkPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다')
      .required('비밀번호를 한번 더 입력해 주세요'),

      name: yup
      .string()
      .min(2, "최소 2자 이상 작성해야 합니다.")
      .max(12, "최대 12자까지 작성 가능합니다.")
      .matches(
        /^[A-Za-z0-9가-힣]{1,11}$/,
        "닉네임은 영어, 한글, 숫자만 가능합니다."
      )
      .required(),

      email: yup
      .string()
      .matches(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i, "이메일을 정확히 입력해 주세요.")
      .required('이메일을 입력해 주세요.'),
      
      tel: yup
      .string()
      .matches(/^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/, "번호를 정확히 입력해 주세요.")
    })
  .required();

const Register = () => {
  const { loading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });


  const submitForm = async (data) => {
    data.email = data.email.toLowerCase()
    data.memberId = data.memberId.toLowerCase()
    const { checkPassword, ...form } = data
    const res = await dispatch(registerUser(form))
    if (res.error?.message) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: `${res.payload}`,
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      navigate('/login')
    }
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {/* {error && <Error>{error}</Error>} */}
      <div className='form-group'>
        <label htmlFor='memberId'>아이디</label>
        <input
          {...register('memberId')}
        />
      </div>
      <p>{errors.memberId?.message}</p>
      <div className='form-group'>
        <label htmlFor='password'>비밀번호</label>
        <input
          type='password'
          {...register('password')}
        />
      </div>
      <p>{errors.password?.message}</p>
      <div className='form-group'>
        <label htmlFor='checkPassword'>비밀번호 확인</label>
        <input
          type='password'
          {...register('checkPassword')}
        />
      </div>
      <p>{errors.checkPassword?.message}</p>
      <div className='form-group'>
        <label htmlFor='email'>이메일</label>
        <input
          {...register('email')}
        />
      </div>
      <p>{errors.email?.message}</p>
      <div className='form-group'>
        <label htmlFor='name'>닉네임</label>
        <input
          {...register('name')}
        />
      </div>
      <p>{errors.name?.message}</p>
      <div className='form-group'>
        <label htmlFor='tel'>핸드폰</label>
        <input
          {...register('tel')}
        />
      </div>
      <p>{errors.tel?.message}</p>
      <button type='submit' className='button' disabled={loading} style = {{display: 'flex', justifyContent: 'center', alignItems : 'center' }}>
        {loading ? <Spinner /> : '회원가입'}
      </button>
    </form>
  )
}
export default Register