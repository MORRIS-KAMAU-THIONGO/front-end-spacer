import apiClient from '../../utils/apiClient'

// Admin service: stubbed implementations that call backend endpoints when available.

// Authentication & Access Control
export async function adminLogin(email, password) {
  const resp = await apiClient.post('/admin/login', { email, password })
  return resp.data
}

export async function adminLogout() {
  // Clear token locally and notify backend if needed
  localStorage.removeItem('token')
  try {
    await apiClient.post('/admin/logout')
  } catch (e) {
    // ignore network errors for logout
  }
}

export async function verifyAdminRole() {
  const resp = await apiClient.get('/auth/me')
  return resp.data && resp.data.role === 'admin'
}

export function protectAdminRoutes(user) {
  if (!user || user.role !== 'admin') {
    throw new Error('Unauthorized')
  }
  return true
}

// Space Management
export async function createSpace(space) {
  const resp = await apiClient.post('/admin/spaces', space)
  return resp.data
}

export async function getAllSpaces() {
  const resp = await apiClient.get('/admin/spaces')
  return resp.data
}

export async function getSpaceById(id) {
  const resp = await apiClient.get(`/admin/spaces/${id}`)
  return resp.data
}

export async function updateSpace(id, updates) {
  const resp = await apiClient.put(`/admin/spaces/${id}`, updates)
  return resp.data
}

export async function disableSpace(id) {
  const resp = await apiClient.post(`/admin/spaces/${id}/disable`)
  return resp.data
}

export async function enableSpace(id) {
  const resp = await apiClient.post(`/admin/spaces/${id}/enable`)
  return resp.data
}

// User Management
export async function createUser(user) {
  const resp = await apiClient.post('/admin/users', user)
  return resp.data
}

export async function getAllUsers() {
  const resp = await apiClient.get('/admin/users')
  return resp.data
}

export async function getUserById(id) {
  const resp = await apiClient.get(`/admin/users/${id}`)
  return resp.data
}

export async function updateUserRole(id, role) {
  const resp = await apiClient.patch(`/admin/users/${id}/role`, { role })
  return resp.data
}

export async function disableUser(id) {
  const resp = await apiClient.post(`/admin/users/${id}/disable`)
  return resp.data
}

export async function enableUser(id) {
  const resp = await apiClient.post(`/admin/users/${id}/enable`)
  return resp.data
}

// Booking Management
export async function getAllBookings() {
  const resp = await apiClient.get('/admin/bookings')
  return resp.data
}

export async function getBookingById(id) {
  const resp = await apiClient.get(`/admin/bookings/${id}`)
  return resp.data
}

export async function updateBookingStatus(id, status) {
  const resp = await apiClient.patch(`/admin/bookings/${id}/status`, { status })
  return resp.data
}

export async function cancelBooking(id) {
  const resp = await apiClient.post(`/admin/bookings/${id}/cancel`)
  return resp.data
}

// Availability & Conflict Handling
export async function checkAvailability(spaceId, timeRange) {
  const resp = await apiClient.post(`/admin/spaces/${spaceId}/availability`, { timeRange })
  return resp.data
}

export async function preventDoubleBooking(spaceId, timeRange) {
  const resp = await apiClient.post(`/admin/spaces/${spaceId}/prevent-double-booking`, { timeRange })
  return resp.data
}

export async function releaseTimeSlot(bookingId) {
  const resp = await apiClient.post(`/admin/bookings/${bookingId}/release`)
  return resp.data
}

// Payment & Invoice (Simulated)
export async function getAllPayments() {
  const resp = await apiClient.get('/admin/payments')
  return resp.data
}

export async function getInvoiceByBooking(bookingId) {
  const resp = await apiClient.get(`/admin/bookings/${bookingId}/invoice`)
  return resp.data
}

export async function markPaymentAsPaid(paymentId) {
  const resp = await apiClient.post(`/admin/payments/${paymentId}/mark-paid`)
  return resp.data
}

// Agreement & Compliance
export async function checkAgreementAcceptance(bookingId) {
  const resp = await apiClient.get(`/admin/bookings/${bookingId}/agreement`)
  return resp.data
}

export async function getAgreementTimestamp(bookingId) {
  const resp = await apiClient.get(`/admin/bookings/${bookingId}/agreement-timestamp`)
  return resp.data
}

// Dashboard & Reporting
export async function getDashboardStats() {
  const resp = await apiClient.get('/admin/stats')
  return resp.data
}

// Utility
export async function searchSpaces(query) {
  const resp = await apiClient.get('/admin/spaces', { params: { q: query } })
  return resp.data
}

export async function filterBookingsByStatus(status) {
  const resp = await apiClient.get('/admin/bookings', { params: { status } })
  return resp.data
}

export async function logAdminAction(action) {
  const resp = await apiClient.post('/admin/logs', { action })
  return resp.data
}

export default {
  adminLogin,
  adminLogout,
  verifyAdminRole,
  protectAdminRoutes,
  createSpace,
  getAllSpaces,
  getSpaceById,
  updateSpace,
  disableSpace,
  enableSpace,
  createUser,
  getAllUsers,
  getUserById,
  updateUserRole,
  disableUser,
  enableUser,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  cancelBooking,
  checkAvailability,
  preventDoubleBooking,
  releaseTimeSlot,
  getAllPayments,
  getInvoiceByBooking,
  markPaymentAsPaid,
  checkAgreementAcceptance,
  getAgreementTimestamp,
  getDashboardStats,
  searchSpaces,
  filterBookingsByStatus,
  logAdminAction
}
