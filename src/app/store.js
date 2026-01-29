import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import spacesReducer from '../features/spaces/spacesSlice'
import bookingsReducer from '../features/bookings/bookingsSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    spaces: spacesReducer,
    bookings: bookingsReducer
  },
})
