import { FiArrowRight } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Hero = ({ onGetStartedClick }) => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const handleClientDashboard = () => {
    if (isAuthenticated && user?.role === 'client') {
      navigate('/client-dashboard');
    } else {
      onGetStartedClick();
    }
  };

  const handleAdminDashboard = () => {
    if (isAuthenticated && user?.role === 'admin') {
      navigate('/admin-dashboard');
    } else {
      onGetStartedClick();
    }
  };
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Perfect
            <span className="block text-yellow-300">Workspace in Kenya</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            Book unique spaces for meetings, creative work, and celebrations. From coworking spaces to conference centers across Nairobi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleClientDashboard}
              className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 flex items-center justify-center"
            >
              I'm a Client <FiArrowRight className="ml-2" />
            </button>
            <button 
              onClick={onGetStartedClick}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900"
            >
              I'm a Space Owner
            </button>
          </div>
          <div className="mt-6">
            <button
              onClick={() => navigate('/spaces')}
              className="text-white underline font-medium"
            >
              Browse Spaces
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;