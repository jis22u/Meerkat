import { createSlice } from '@reduxjs/toolkit'
import { registerUser, userLogin } from 'api/auth'

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

const refreshToken = localStorage.getItem('refreshToken')
  ? localStorage.getItem('refreshToken')
  : null

const initialState = {
  loading: false,
  userToken,
  refreshToken,
  error: null,
  success: false,
  isLogin: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
        localStorage.removeItem('userToken')
        localStorage.removeItem('refreshToken')
        state.userToken = null
        state.refreshToken = null
        state.isLogin = false
      },
  },
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.loading = true;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userToken = payload.userToken;
      state.refreshToken = payload.refreshToken;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload
    },
    
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state) => {
      state.loading = false;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload
    },
  },

  // https://cloudnweb.dev/2021/02/modern-react-redux-tutotials-redux-toolkit-login-user-registration/
})

export default authSlice.reducer