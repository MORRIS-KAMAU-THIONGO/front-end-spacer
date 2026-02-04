import { store } from '../src/redux/store.js';
import { loginUser, registerUser } from '../src/redux/authSlice.js';
import { createBooking } from '../src/redux/bookingsSlice.js';

async function run() {
  console.log('\n--- Store initial auth ---');
  console.log(store.getState().auth);

  try {
    const res = await store.dispatch(loginUser({ email: 'client@demo.com', password: 'client123' }));
    console.log('\n--- Login dispatch result (client) ---');
    console.log(res);
  } catch (err) {
    console.error('Login error:', err);
  }

  try {
    const bookingRes = await store.dispatch(createBooking({ spaceId: 1, userId: 1, date: '2024-12-20', startTime: '10:00', endTime: '12:00', totalPrice: 300 }));
    console.log('\n--- Booking dispatch result ---');
    console.log(bookingRes);
  } catch (err) {
    console.error('Booking error:', err);
  }

  console.log('\n--- Final bookings ---');
  console.log(store.getState().bookings.bookings.slice(-3));
}

run();