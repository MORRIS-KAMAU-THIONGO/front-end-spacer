import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button, Loader } from '../components/ui'
import { BookingForm } from '../features/bookings/BookingForm'
import { formatCurrency } from '../utils/formatters'

export const SpaceDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector(state => state.auth)
  const [space, setSpace] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showBookingForm, setShowBookingForm] = useState(false)

  useEffect(() => {
    // Fetch space details
    setSpace({
      id,
      name: 'Modern Office Space',
      location: 'Downtown, City Center',
      description: 'A beautiful modern office space perfect for meetings and events.',
      capacity: 50,
      pricePerHour: 50,
      rating: 4.5,
      reviewCount: 120,
      isAvailable: true,
      amenities: ['WiFi', 'Projector', 'Whiteboard', 'Parking', 'Catering'],
      rules: 'No smoking, quiet hours after 6pm, maximum capacity must be respected',
      images: ['image1.jpg', 'image2.jpg']
    })
    setIsLoading(false)
  }, [id])

  const handleBooking = (bookingData) => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    navigate('/booking', { state: { space, bookingData } })
  }

  if (isLoading) return <Loader message="Loading space details..." />

  if (!space) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-600 mb-4">Space not found</p>
        <Button onClick={() => navigate('/spaces')}>Back to Spaces</Button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate('/spaces')}
        className="text-primary hover:underline mb-6 flex items-center gap-2"
      >
        ← Back to Spaces
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Images */}
          <div className="mb-8">
            <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden mb-4">
              <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl">
                Space Image
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">{space.name}</h1>
                  <p className="text-gray-600 mt-2">{space.location}</p>
                </div>
                <div className="text-right">
                  {space.isAvailable && (
                    <span className="inline-block bg-success text-white px-4 py-2 rounded-lg text-sm font-semibold">
                      Available
                    </span>
                  )}
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 mt-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.round(space.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-gray-600">
                  {space.rating} ({space.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this space</h2>
              <p className="text-gray-700 leading-relaxed">{space.description}</p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {space.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">House Rules</h2>
              <p className="text-gray-700">{space.rules}</p>
            </div>

            {/* Specs */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Specifications</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-light p-4 rounded-lg">
                  <p className="text-gray-600 text-sm">Capacity</p>
                  <p className="text-2xl font-bold text-gray-900">{space.capacity}</p>
                  <p className="text-gray-600 text-sm">people</p>
                </div>
                <div className="bg-light p-4 rounded-lg">
                  <p className="text-gray-600 text-sm">Price per Hour</p>
                  <p className="text-2xl font-bold text-primary">{formatCurrency(space.pricePerHour)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-20">
            {/* Price */}
            <div className="mb-6">
              <p className="text-gray-600 text-sm mb-2">Price</p>
              <p className="text-4xl font-bold text-primary mb-1">{formatCurrency(space.pricePerHour)}</p>
              <p className="text-gray-600 text-sm">per hour</p>
            </div>

            {/* Booking */}
            {!showBookingForm ? (
              <Button
                onClick={() => setShowBookingForm(true)}
                className="w-full mb-4"
              >
                Book Now
              </Button>
            ) : (
              <div>
                <Button
                  variant="outline"
                  onClick={() => setShowBookingForm(false)}
                  className="w-full mb-4"
                >
                  ← Back
                </Button>
              </div>
            )}

            {showBookingForm && (
              <div className="mt-6">
                <BookingForm
                  spaceId={space.id}
                  spacePrice={space.pricePerHour}
                  onSubmit={handleBooking}
                />
              </div>
            )}

            {/* Contact */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-4">Questions about this space?</p>
              <Button variant="outline" className="w-full">
                Contact Host
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpaceDetails
