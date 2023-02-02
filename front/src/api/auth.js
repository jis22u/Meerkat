import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

// const backendURL = '' 현재 proxy로 local 8081에 연결한 상태임

export const userLogin = createAsyncThunk(
  'auth/login',
  async ( form , { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        `login`,
        form,
        config
      )
      console.log(data)
      localStorage.setItem('userToken', data.userToken)
      localStorage.setItem('refreshToken', data.refreshToken)
      return data
      // authSlice로 Data를 넘긴다.
      
    } catch (error) {
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
        `register`,
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