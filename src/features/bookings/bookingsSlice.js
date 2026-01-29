import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  bookings: [],
  currentBooking: null,
  loading: false,
  error: null,
  paymentStatus: null
}

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setBookings: (state, action) => {
      state.bookings = action.payload
    },
    addBooking: (state, action) => {
      state.bookings.push(action.payload)
    },
    updateBooking: (state, action) => {
      const index = state.bookings.findIndex(b => b.id === action.payload.id)
      if (index !== -1) {
        state.bookings[index] = action.payload
      }
    },
    setCurrentBooking: (state, action) => {
      state.currentBooking = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setPaymentStatus: (state, action) => {
      state.paymentStatus = action.payload
    }
  }
})

export const { setBookings, addBooking, updateBooking, setCurrentBooking, setLoading, setError, setPaymentStatus } = bookingsSlice.actions
export default bookingsSlice.reducer
