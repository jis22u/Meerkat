import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

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

      console.log(data)

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
      await axios.post(
        `/sign`,  
        form,
        config
      )
        .then( res => {
          if (res.status === 200){
            console.log('hi?')
            window.location.href = '/login'
          }
        })

    } catch (error) {

      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)