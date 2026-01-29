import apiClient from '../utils/apiClient'

// Login user
export const loginUser = async (email, password) => {
  const response = await apiClient.post('/auth/login', { email, password })
  return response.data
}

// Register user
export const registerUser = async (userData) => {
  const response = await apiClient.post('/auth/register', userData)
  return response.data
}

// Logout user
export const logoutUser = async () => {
  const response = await apiClient.post('/auth/logout')
  return response.data
}

// Get current user
export const getCurrentUser = async () => {
  const response = await apiClient.get('/auth/me')
  return response.data
}

// Social auth login
export const socialAuthLogin = async (provider, token) => {
  const response = await apiClient.post('/auth/social-login', { provider, token })
  return response.data
}

// Refresh token
export const refreshToken = async () => {
  const response = await apiClient.post('/auth/refresh')
  return response.data
}
