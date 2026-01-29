import Layout from '../components/layout/Layout';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchSpaces } from '../features/spaces/spacesApi';
import SpaceCard from '../features/spaces/SpaceCard';

const Landing = () => {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    fetchSpaces().then(setSpaces);
  }, []);

  return (
    <Layout>
      <h1>Welcome to Spacer</h1>
      <p>Find and book spaces easily.</p>
      <div className="spaces-grid">
        {spaces.map((space) => (
          <Link key={space.id} to={`/spaces/${space.id}`}>
            <SpaceCard space={space} />
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Landing;
