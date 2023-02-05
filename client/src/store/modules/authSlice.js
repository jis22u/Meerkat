import { createSlice } from '@reduxjs/toolkit'
import { registerUser, userLogin } from 'api/auth'


const initialState = {
  loading: false,
  error: null,
  isLogin: false,
  chocie: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
        localStorage.removeItem('userToken')
        state.isLogin = false
      },
    setChoice: (state, { payload }) => {
      state.choice = payload
    }
  },
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.loading = true;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload
    },
    
    [registerUser.pending]: (state) => {
      state.loading = true;
    },
    [registerUser.fulfilled]: (state) => {
      state.loading = false;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload
    },
  },

})

export default authSlice.reducer