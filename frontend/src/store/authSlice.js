import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: '',
    token: '',
    isAuthChecked: false,
  },
  reducers: {
    setUserData: (state, { payload }) => {
      const { token, username } = payload
      state.token = token
      state.username = username
      state.isAuthChecked = true
    },
    clearUserData: (state) => {
      state.username = null
      state.token = null
      state.isAuthChecked = true
    },
    setAuthChecked: (state) => {
      state.isAuthChecked = true
    },
  },
})

export const { setUserData, clearUserData, setAuthChecked } = authSlice.actions

export const selectUsername = (state) => state.auth.username
export const selectToken = (state) => state.auth.token
export const selectIsAuthChecked = (state) => state.auth.isAuthChecked

export default authSlice.reducer
