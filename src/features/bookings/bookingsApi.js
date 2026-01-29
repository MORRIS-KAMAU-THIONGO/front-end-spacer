import apiClient from '../../utils/apiClient'

// Get all bookings for current user
export const getUserBookings = async () => {
  const response = await apiClient.get('/bookings')
  return response.data
}

// Get booking by ID
export const getBookingById = async (id) => {
  const response = await apiClient.get(`/bookings/${id}`)
  return response.data
}

// Create booking
export const createBooking = async (bookingData) => {
  const response = await apiClient.post('/bookings', bookingData)
  return response.data
}

// Update booking
export const updateBooking = async (id, bookingData) => {
  const response = await apiClient.put(`/bookings/${id}`, bookingData)
  return response.data
}

// Cancel booking
export const cancelBooking = async (id) => {
  const response = await apiClient.delete(`/bookings/${id}`)
  return response.data
}

// Process payment
export const processPayment = async (bookingId, paymentData) => {
  const response = await apiClient.post(`/bookings/${bookingId}/payment`, paymentData)
  return response.data
}

// Simulate payment (for testing)
export const simulatePayment = async (bookingId) => {
  const response = await apiClient.post(`/bookings/${bookingId}/simulate-payment`)
  return response.data
}

// Get all bookings (Admin)
export const getAllBookings = async (filters = {}) => {
  const response = await apiClient.get('/admin/bookings', { params: filters })
  return response.data
}
