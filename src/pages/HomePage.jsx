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

  const categories = [
    { icon: <FiMonitor />, name: "Coworking Spaces", count: 45 },
    { icon: <FiMonitor />, name: "Serviced Offices", count: 18 },
    { icon: <FiMonitor />, name: "Hybrid Offices", count: 12 },
    { icon: <FiUsers />, name: "Shared desks & hot desks", count: 38 },
    { icon: <FiHome />, name: "Turnkey private offices", count: 9 },
    { icon: <FiHome />, name: "Private Offices", count: 19 },
    { icon: <FiMonitor />, name: "Class A Buildings", count: 7 },
    { icon: <FiCamera />, name: "Creative Studios", count: 14 },
    { icon: <FiUsers />, name: "Dedicated team spaces", count: 11 },
    { icon: <FiMonitor />, name: "Premium office suites", count: 6 },
    { icon: <FiHome />, name: "Lofts & open spaces", count: 5 },
    { icon: <FiCoffee />, name: "Commercial Kitchens", count: 3 },
    { icon: <FiMapPin />, name: "Retail Spaces", count: 8 },
    { icon: <FiUsers />, name: "Meeting Rooms", count: 32 },
    { icon: <FiUsers />, name: "Boardrooms & huddle rooms", count: 10 },
    { icon: <FiMonitor />, name: "Conference Centers", count: 4 },
    { icon: <FiTruck />, name: "Warehouse Space", count: 2 },
    { icon: <FiHome />, name: "Office Suites", count: 9 },
    { icon: <FiTruck />, name: "Large event venues", count: 3 },
    { icon: <FiTruck />, name: "Industrial & storage", count: 1 },
    { icon: <FiHome />, name: "Multi-room spaces", count: 6 }
  ];

  const steps = [
    { number: "01", title: "Search", description: "Browse spaces by location, type, and price" },
    { number: "02", title: "Select", description: "Choose the perfect space for your needs" },
    { number: "03", title: "Book", description: "Secure your booking with instant confirmation" },
    { number: "04", title: "Enjoy", description: "Show up and make great things happen" }
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
      <section id="features" className="py-16 bg-gray-50">
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
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-xl text-gray-600">Find the perfect space for your needs</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer text-center">
                <div className="text-blue-600 text-3xl mb-3 flex justify-center">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.count} spaces</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Spaces */}
      <section className="py-16 bg-gray-50">
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
      <section id="how-it-works" className="py-16">
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center items-center">
            <StatsCounter end={500} label="Available Spaces" />
            <StatsCounter end={10000} label="Happy Clients" />
            <StatsCounter end={15} label="Cities in Kenya" />
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-white">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About</h2>
            <p className="text-xl text-gray-600">Spacer connects people with flexible, verified spaces across Nairobi — from coworking desks to event venues. We simplify discovery, booking and management so you can focus on your work.</p>
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