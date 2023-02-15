import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

// const BASE_URL = 'http://192.168.31.200:8081/api'

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
        `/login`,
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
        `/sign`,  
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
