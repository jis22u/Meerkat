import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = 'http://192.168.1.208:8081'
// api intercept로 refresh token 만들기

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ id, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        `${backendURL}/login`,
        { id, password },
        config
      )
      console.log(data)
      localStorage.setItem('userToken', data.userToken)
      localStorage.setItem('refreshToken', data.refreshToken)
      return data
      // authSlice로 Data를 넘긴다.
      
    } catch (error) {
      console.log('여기야!')
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/register',
  async ( form, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      await axios.post(
        `${backendURL}/api/user/register`,
        form,
        config
      )
      
    } catch (error) {

      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)