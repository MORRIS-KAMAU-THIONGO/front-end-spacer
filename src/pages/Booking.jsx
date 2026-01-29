import Layout from '../components/layout/Layout';
import { useEffect, useState } from 'react';
import { fetchBookings } from '../features/bookings/bookingsApi';
import BookingSummary from '../features/bookings/BookingSummary';

const Booking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings().then(setBookings);
  }, []);

  return (
    <Layout>
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map(booking => <BookingSummary key={booking.id} booking={booking} />)
      )}
    </Layout>
  );
};

export default Booking;
