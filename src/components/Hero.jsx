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
    <section className="bg-hero-pattern bg-cover bg-center text-white py-24 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 hero-title">
            Find Your Perfect
            <span className="block text-cta-400">Workspace</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-100">
            Discover and book premium workspaces, meeting rooms, and event spaces in your city. Work smarter, not harder.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleClientDashboard}
              className="bg-gradient-to-r from-cta-500 to-yellow-400 text-gray-900 px-8 py-3 rounded-full font-semibold hover:from-cta-600 hover:to-yellow-300 flex items-center justify-center shadow-lg transform hover:-translate-y-0.5 transition"
            >
              Browse as Client <FiArrowRight className="ml-2" />
            </button>
            <button 
              onClick={handleAdminDashboard}
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition"
            >
              Admin Dashboard
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;