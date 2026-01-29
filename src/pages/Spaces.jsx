import { useEffect, useState } from 'react';
import { fetchSpaces } from '../features/spaces/spacesApi';
import SpaceCard from '../features/spaces/SpaceCard';
import Layout from '../components/layout/Layout';
import { Link } from 'react-router-dom';

const Spaces = () => {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    fetchSpaces().then(setSpaces);
  }, []);

  return (
    <Layout>
      <h2>All Spaces</h2>
      <div className="spaces-grid">
        {spaces.map(space => (
          <Link key={space.id} to={`/spaces/${space.id}`}>
            <SpaceCard space={space} />
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Spaces;
