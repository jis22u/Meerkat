import { createSlice } from '@reduxjs/toolkit'
import { registerUser, userLogin } from 'api/auth'

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
        localStorage.removeItem('userToken')
        state.loading = false
        state.userInfo = null
        state.userToken = null
        state.error = null
      },
  },
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.userInfo = payload
      state.userToken = payload.userToken
      // 백엔드에서 정한 Token 이름에 따라 변경하기
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },

    // registerUser 결과값 사용하기
  },
})

export default authSlice.reducer