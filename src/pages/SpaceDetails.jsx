import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSpaces } from '../features/spaces/spacesApi';
import Layout from '../components/layout/Layout';
import BookingForm from '../features/bookings/BookingForm';

const SpaceDetails = () => {
  const { id } = useParams();
  const [space, setSpace] = useState(null);

  useEffect(() => {
    fetchSpaces().then(spaces => {
      const selected = spaces.find(s => s.id === parseInt(id));
      setSpace(selected);
    });
  }, [id]);

  if (!space) return <Layout><p>Loading...</p></Layout>;

  return (
    <Layout>
      <h2>{space.name}</h2>
      <p>{space.description}</p>
      <p>Price: ${space.price}/hour</p>
      <BookingForm spaceId={space.id} onSubmit={data => console.log('Booking:', data)} />
    </Layout>
  );
};

export default SpaceDetails;
