import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Loader } from '../components/ui'

export const Dashboard = () => {
  const { user } = useSelector(state => state.auth)
  const { bookings } = useSelector(state => state.bookings)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Fetch user bookings
    setIsLoading(false)
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-8">Welcome back, {user?.firstName}!</p>

      {isLoading && <Loader message="Loading your dashboard..." />}

      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {/* Stats Cards */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600 text-sm mb-2">Total Bookings</p>
            <p className="text-3xl font-bold text-primary">{bookings?.length || 0}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600 text-sm mb-2">Upcoming</p>
            <p className="text-3xl font-bold text-success">
              {bookings?.filter(b => b.status === 'upcoming').length || 0}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600 text-sm mb-2">Completed</p>
            <p className="text-3xl font-bold text-info">
              {bookings?.filter(b => b.status === 'completed').length || 0}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600 text-sm mb-2">Total Spent</p>
            <p className="text-3xl font-bold text-warning">$0.00</p>
          </div>
        </div>
      )}

      {/* Recent Bookings */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900">Recent Bookings</h2>
        </div>

        {bookings && bookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-light">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Space</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Dates</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bookings.map(booking => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 text-gray-900">{booking.spaceName}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {booking.startDate} - {booking.endDate}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">${booking.totalAmount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === 'completed'
                          ? 'bg-green-100 text-success'
                          : booking.status === 'upcoming'
                          ? 'bg-blue-100 text-primary'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-600">
            <p>No bookings yet. Start by browsing available spaces!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
