import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  spaces: [],
  selectedSpace: null,
  loading: false,
  error: null,
  filters: {
    category: '',
    priceRange: { min: 0, max: 10000 },
    rating: 0
  }
}

const spacesSlice = createSlice({
  name: 'spaces',
  initialState,
  reducers: {
    setSpaces: (state, action) => {
      state.spaces = action.payload
    },
    addSpace: (state, action) => {
      state.spaces.push(action.payload)
    },
    updateSpace: (state, action) => {
      const index = state.spaces.findIndex(s => s.id === action.payload.id)
      if (index !== -1) {
        state.spaces[index] = action.payload
      }
    },
    deleteSpace: (state, action) => {
      state.spaces = state.spaces.filter(s => s.id !== action.payload)
    },
    setSelectedSpace: (state, action) => {
      state.selectedSpace = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setFilters: (state, action) => {
      state.filters = action.payload
    }
  }
})

export const { setSpaces, addSpace, updateSpace, deleteSpace, setSelectedSpace, setLoading, setError, setFilters } = spacesSlice.actions
export default spacesSlice.reducer
