import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem('token')
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
    setToken: (state, action) => {
      state.token = action.payload
      if (action.payload) {
        localStorage.setItem('token', action.payload)
        state.isAuthenticated = true
      } else {
        localStorage.removeItem('token')
        state.isAuthenticated = false
      }
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('token')
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    clearError: (state) => {
      state.error = null
    }
  }
})

export const { setUser, setToken, logout, setLoading, setError, clearError } = authSlice.actions
export default authSlice.reducer
