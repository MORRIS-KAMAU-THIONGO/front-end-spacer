import { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { FiMenu, FiX, FiUser } from 'react-icons/fi';

const Navbar = ({ onLoginClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    // if element not on current page, navigate home then scroll after short delay
    navigate('/');
    setTimeout(() => {
      const e = document.getElementById(id);
      if (e) e.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  };

  const goHomeAndScrollTop = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">Spacer</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" onClick={goHomeAndScrollTop} className={({isActive})=> isActive ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}>Home</NavLink>
            <button onClick={() => scrollToSection('spaces')} className="text-gray-700 hover:text-blue-600">Spaces</button>
            <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-blue-600">About</button>

            {isAuthenticated && user?.role === 'client' && (
              <NavLink to="/client-dashboard" className={({isActive})=> isActive ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}>My Dashboard</NavLink>
            )}
            {isAuthenticated && user?.role === 'admin' && (
              <NavLink to="/admin-dashboard" className={({isActive})=> isActive ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}>Admin</NavLink>
            )}

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Hi, {user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Login
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink to="/" onClick={() => { goHomeAndScrollTop(); }} className={({isActive})=> isActive ? 'block px-3 py-2 text-blue-600' : 'block px-3 py-2 text-gray-700'}>Home</NavLink>
            <button onClick={() => { scrollToSection('spaces'); }} className="block px-3 py-2 text-gray-700">Spaces</button>
            <button onClick={() => { scrollToSection('about'); }} className="block px-3 py-2 text-gray-700">About</button>

            {isAuthenticated && user?.role === 'client' && (
              <NavLink to="/client-dashboard" onClick={() => setIsOpen(false)} className={({isActive})=> isActive ? 'block px-3 py-2 text-blue-600' : 'block px-3 py-2 text-gray-700'}>My Dashboard</NavLink>
            )}
            {isAuthenticated && user?.role === 'admin' && (
              <NavLink to="/admin-dashboard" onClick={() => setIsOpen(false)} className={({isActive})=> isActive ? 'block px-3 py-2 text-blue-600' : 'block px-3 py-2 text-gray-700'}>Admin</NavLink>
            )}

            {isAuthenticated ? (
              <button
                onClick={() => { handleLogout(); setIsOpen(false); }}
                className="block w-full text-left px-3 py-2 text-red-600"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => { onLoginClick(); setIsOpen(false); }}
                className="block w-full text-left px-3 py-2 text-blue-600"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;