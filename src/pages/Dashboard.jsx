import Layout from '../components/layout/Layout';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const user = useSelector(state => state.auth.user);

  return (
    <Layout>
      <h2>User Dashboard</h2>
      {user ? (
        <>
          <p>Welcome, {user.name}</p>
          <p>Email: {user.email}</p>
        </>
      ) : (
        <p>Loading user info...</p>
      )}
    </Layout>
  );
};

export default Dashboard;
