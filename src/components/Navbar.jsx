import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { FiMenu, FiX, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import buildingLogo from '../assets/images/placeholder.svg';

const Navbar = ({ onLoginClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
    navigate('/');
  };

  const scrollToSection = (id) => {
    // If not on home, navigate first then scroll
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo + Title (acts as Home) */}
          <div className="flex items-center cursor-pointer" onClick={() => { navigate('/'); setIsOpen(false); window.scrollTo({top:0,behavior:'smooth'}); }}>
            <img src={buildingLogo} alt="Spacer logo" className="h-8 w-8 mr-3" />
            <span className="text-2xl font-bold text-blue-600">Spacer</span>
          </div>

          {/* Center: primary links (visible on md+) */}
          <div className="hidden md:flex flex-1 justify-center items-center">
            <div className="flex space-x-8">
              <button onClick={() => scrollToSection('features')} className="text-gray-700 hover:text-blue-600">Features</button>
              <button onClick={() => scrollToSection('how-it-works')} className="text-gray-700 hover:text-blue-600">How It Works</button>
              <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-blue-600">About</button>
            </div>
          </div>

          {/* Right: auth actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button onClick={() => { navigate('/signup'); setIsOpen(false); }} className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50">Sign Up</button>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Hi, {user?.name}</span>
                <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">Logout</button>
              </div>
            ) : (
              <button onClick={() => { onLoginClick(); setIsOpen(false); }} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Login</button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button onClick={() => { navigate('/'); setIsOpen(false); window.scrollTo({top:0,behavior:'smooth'}); }} className="block w-full text-left px-3 py-2 text-gray-700">Spacer</button>
            <button onClick={() => scrollToSection('features')} className="block w-full text-left px-3 py-2 text-gray-700">Features</button>
            <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left px-3 py-2 text-gray-700">How It Works</button>
            <button onClick={() => scrollToSection('about')} className="block w-full text-left px-3 py-2 text-gray-700">About</button>
            <button onClick={() => { navigate('/signup'); setIsOpen(false); }} className="block w-full text-left px-3 py-2 text-blue-600">Sign Up</button>
            {isAuthenticated ? (
              <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-red-600">Logout</button>
            ) : (
              <button onClick={() => { onLoginClick(); setIsOpen(false); }} className="block w-full text-left px-3 py-2 text-blue-600">Login</button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;