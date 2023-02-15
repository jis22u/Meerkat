import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const BASE_URL = 'https://i8b107.p.ssafy.io/api'

export const userLogin = createAsyncThunk(
  'auth/login',
  async ( form , { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data , headers } = await axios.post(
        `${BASE_URL}/login`,
        form,
        config
      )

      localStorage.setItem('userToken', headers.authorization)

      return data

      
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
    console.log(form)
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        `${BASE_URL}/sign`,  
        form,
        config
      )

      return data

    } catch (error) {
      console.log(error)

      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)
