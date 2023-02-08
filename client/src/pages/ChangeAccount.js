// import { useEffect } from "react"
import { useForm } from 'react-hook-form'
import { useSelector} from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from 'react';


const schema = yup
  .object({
    // memberId: yup
    //   .string()
    //   .min(6, "최소 6자 이상 작성해야 합니다.")
    //   .max(12, "최대 12자까지 작성 가능합니다.")
    //   .matches(
    //     /^[A-Za-z][A-Za-z0-9_]{6,12}$/,
    //     "아이디는 숫자, 영문으로 작성 가능합니다."
    //   )
    //   .required("비밀번호를 입력해 주세요!"),
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
      
      tel: yup
      .string()
      .matches(/^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/, "번호를 정확히 입력해 주세요.")
    })
  .required();

const ChangeAccount = () => {
    const { loading } = useSelector((state) => state.auth)
    // const navigate = useNavigate()
    const [defaultValues, setDefaultValues] = useState();

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
      });



    const submitForm = (data) => {
        console.log(data)
        data.email = data.email.toLowerCase()
        data.memberId = data.memberId.toLowerCase()
        // const { checkPassword, ...form } = data
        // dispatch(registerUser(form))
      }
    
    const deleteHandler = async () => {
        console.log('삭제 요청')
    }

    useEffect(() => {
        setDefaultValues({
            memberId: 'asdryzx', name: '승환이임', email: 'asdryzx@naver.com', tel:'010-6543-6404'
        })
    }, [])

    return (
        <div>
            <h1>회원정보 수정</h1>
                <form onSubmit={handleSubmit(submitForm)}>
                    {/* {error && <Error>{error}</Error>} */}
                    <div className='form-group'>
                      <label htmlFor='memberId'>ID</label>
                      <input
                        defaultValue={defaultValues?.memberId}
                        disabled={true}
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
                        defaultValue={defaultValues?.email}
                      />
                    </div>
                    <p>{errors.email?.message}</p>
                    <div className='form-group'>
                      <label htmlFor='name'>Nickname</label>
                      <input
                        {...register('name')}
                        defaultValue={defaultValues?.name}
                      />
                    </div>
                    <p>{errors.name?.message}</p>
                    <div className='form-group'>
                      <label htmlFor='tel'>Phone</label>
                      <input
                        {...register('tel')}
                        defaultValue={defaultValues?.tel}
                      />
                    </div>
                    <p>{errors.tel?.message}</p>
                    <button type='submit' className='button' disabled={loading}>
                      {loading ? '대기중' : '수정'}
                      {/* <Spinner /> */}
                    </button>
                </form>
            <button onClick = {deleteHandler}>탈퇴</button>
        </div>
    )
}

export default ChangeAccount