import Layout from '../components/layout/Layout';
import { useEffect, useState } from 'react';
import { fetchSpaces } from '../features/spaces/spacesApi';
import SpaceCard from '../features/spaces/SpaceCard';
import SpaceForm from '../features/spaces/SpaceForm';

const Admin = () => {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    fetchSpaces().then(setSpaces);
  }, []);

  const handleAddSpace = (spaceData) => {
    console.log('Add/Edit space:', spaceData);
  };

  return (
    <Layout>
      <h2>Admin Panel</h2>
      <h3>Add/Edit Space</h3>
      <SpaceForm onSubmit={handleAddSpace} />
      <h3>All Spaces</h3>
      <div className="spaces-grid">
        {spaces.map(space => <SpaceCard key={space.id} space={space} />)}
      </div>
    </Layout>
  );
};

export default Admin;
