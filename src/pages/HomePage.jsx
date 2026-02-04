import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import SpaceCard from '../components/SpaceCard';
import StatsCounter from '../components/StatsCounter';
import CTASection from '../components/CTASection';
import BookingModal from '../components/BookingModal';
import LoginModal from '../components/LoginModal';
import { FiSearch, FiShield, FiClock, FiMapPin, FiUsers, FiWifi, FiCoffee, FiMonitor, FiCamera, FiMic, FiTruck, FiHome } from 'react-icons/fi';
import { selectCategories } from '../redux/spacesSlice';

const HomePage = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const { isAuthenticated } = useSelector(state => state.auth);
  const { spaces } = useSelector(state => state.spaces);
  const navigate = useNavigate();

  const features = [
    {
      icon: <FiSearch />,
      title: "Easy Discovery",
      description: "Find the perfect workspace with our advanced search and filtering system."
    },
    {
      icon: <FiShield />,
      title: "Secure Booking",
      description: "Book with confidence using our secure payment system and verified spaces."
    },
    {
      icon: <FiClock />,
      title: "Flexible Duration",
      description: "Book by the hour, day, or month. Perfect for any project timeline."
    }
  ];

  // Use categories from the store so they reflect actual space categories and make tiles clickable
  const storeCategories = useSelector(selectCategories);
  const categories = storeCategories.slice(0, 12).map((name, idx) => ({
    icon: <FiMonitor />,
    name,
    slug: name,
    count: spaces.filter(s => s.category === name).length
  }));

  const steps = [
    { number: "01", title: "Browse Spaces", description: "Explore our curated collection of workspaces" },
    { number: "02", title: "Select & Book", description: "Choose your perfect space and book instantly" },
    { number: "03", title: "Work & Create", description: "Focus on what matters in your ideal environment" },
    { number: "04", title: "Rate & Review", description: "Share your experience to help others" }
  ];

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/client-dashboard');
    } else {
      setShowLoginModal(true);
    }
  };

  const handleBookSpace = (space) => {
    if (isAuthenticated) {
      setSelectedSpace(space);
      setShowBookingModal(true);
    } else {
      setShowLoginModal(true);
    }
  };

  const featuredSpaces = spaces.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero onGetStartedClick={handleGetStarted} />

      {/* Features Section */}
      <section id="home" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Spacer?</h2>
            <p className="text-xl text-gray-600">Everything you need for the perfect workspace experience</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="about" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-xl text-gray-600">Find the perfect space for your needs</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <div key={index} onClick={() => navigate(`/client-dashboard?category=${encodeURIComponent(category.slug)}`)} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition transform hover:-translate-y-1 cursor-pointer text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto flex items-center justify-center text-blue-600 text-2xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} spaces</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Spaces */}
      <section id="spaces" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Spaces</h2>
            <p className="text-xl text-gray-600">Handpicked spaces for your next project</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredSpaces.map((space) => (
              <SpaceCard key={space.id} space={space} onBookClick={handleBookSpace} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get started in just 4 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatsCounter end={500} label="Happy Clients" />
            <StatsCounter end={150} label="Premium Spaces" />
            <StatsCounter end={1200} label="Bookings Made" />
            <StatsCounter end={50} label="Cities Covered" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection onGetStartedClick={handleGetStarted} />

      {/* Modals */}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      <BookingModal 
        isOpen={showBookingModal} 
        onClose={() => setShowBookingModal(false)} 
        space={selectedSpace} 
      />
    </div>
  );
};

export default HomePage;