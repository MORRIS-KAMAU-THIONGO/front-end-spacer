import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../features/auth/authSlice'

export const Navbar = () => {
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector(state => state.auth)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">Spacer</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-700 hover:text-primary transition">
              Home
            </Link>
            <Link to="/spaces" className="text-gray-700 hover:text-primary transition">
              Spaces
            </Link>
            {isAuthenticated && user?.role === 'admin' && (
              <Link to="/admin" className="text-gray-700 hover:text-primary transition">
                Admin
              </Link>
            )}
            {isAuthenticated && (
              <Link to="/dashboard" className="text-gray-700 hover:text-primary transition">
                Dashboard
              </Link>
            )}
          </div>

          {/* Auth Links */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-700">{user?.email}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-danger text-white rounded-lg hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-primary hover:bg-blue-50 rounded-lg transition">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Home
            </Link>
            <Link to="/spaces" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Spaces
            </Link>
            {isAuthenticated && user?.role === 'admin' && (
              <Link to="/admin" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                Admin
              </Link>
            )}
            {isAuthenticated && (
              <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                Dashboard
              </Link>
            )}
            {!isAuthenticated && (
              <>
                <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                  Login
                </Link>
                <Link to="/register" className="block px-4 py-2 bg-primary text-white rounded hover:bg-blue-600">
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
