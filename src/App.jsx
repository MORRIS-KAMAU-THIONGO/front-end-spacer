import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Layout from './components/layout/Layout'
import ProtectedRoute from './features/auth/ProtectedRoute'

// Pages
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Spaces from './pages/Spaces'
import SpaceDetails from './pages/SpaceDetails'
import Booking from './pages/Booking'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'

function App() {
  const { isAuthenticated } = useSelector(state => state.auth)

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout><Landing /></Layout>} />
        <Route path="/login" element={!isAuthenticated ? <Layout><Login /></Layout> : <Navigate to="/" />} />
        <Route path="/register" element={!isAuthenticated ? <Layout><Register /></Layout> : <Navigate to="/" />} />

        {/* Space Routes */}
        <Route path="/spaces" element={<Layout><Spaces /></Layout>} />
        <Route path="/spaces/:id" element={<Layout><SpaceDetails /></Layout>} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout><Dashboard /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <Layout><Booking /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Layout><Admin /></Layout>
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
