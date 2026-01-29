import apiClient from '../../utils/apiClient'

// Get all spaces
export const getAllSpaces = async (filters = {}) => {
  const response = await apiClient.get('/spaces', { params: filters })
  return response.data
}

// Get space by ID
export const getSpaceById = async (id) => {
  const response = await apiClient.get(`/spaces/${id}`)
  return response.data
}

// Create space (Admin)
export const createSpace = async (spaceData) => {
  const response = await apiClient.post('/spaces', spaceData)
  return response.data
}

// Update space (Admin)
export const updateSpace = async (id, spaceData) => {
  const response = await apiClient.put(`/spaces/${id}`, spaceData)
  return response.data
}

// Delete space (Admin)
export const deleteSpace = async (id) => {
  const response = await apiClient.delete(`/spaces/${id}`)
  return response.data
}

// Get space availability
export const getSpaceAvailability = async (id, startDate, endDate) => {
  const response = await apiClient.get(`/spaces/${id}/availability`, {
    params: { startDate, endDate }
  })
  return response.data
}
