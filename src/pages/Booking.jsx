import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addBooking } from '../features/bookings/bookingsSlice'
import { BookingSummary } from '../features/bookings/BookingSummary'
import { PaymentSimulation } from '../features/bookings/PaymentSimulation'
import { Button } from '../components/ui'

export const Booking = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [step, setStep] = useState('summary') // summary, payment, confirmation
  const [isLoading, setIsLoading] = useState(false)
  const [bookingData, setBookingData] = useState(null)

  const { space, bookingData: initialBookingData } = location.state || {}

  const mockBooking = {
    id: Math.random().toString(36).substr(2, 9),
    spaceName: space?.name || 'Space',
    spaceLocation: space?.location || 'Location',
    spacePrice: space?.pricePerHour || 0,
    spaceImage: space?.image,
    startDate: new Date(initialBookingData?.startDate || Date.now()).toISOString(),
    endDate: new Date(initialBookingData?.endDate || Date.now() + 3600000).toISOString(),
    numberOfGuests: initialBookingData?.numberOfGuests || 1,
    specialRequests: initialBookingData?.specialRequests || '',
    status: 'pending'
  }

  const handleConfirmBooking = () => {
    setIsLoading(true)
    // Simulate booking confirmation
    setTimeout(() => {
      setIsLoading(false)
      setStep('payment')
    }, 1000)
  }

  const handlePaymentSuccess = (paymentData) => {
    setIsLoading(true)
    setTimeout(() => {
      const newBooking = {
        ...mockBooking,
        status: 'confirmed',
        paymentData
      }
      dispatch(addBooking(newBooking))
      setBookingData(newBooking)
      setIsLoading(false)
      setStep('confirmation')
    }, 1000)
  }

  const handlePaymentError = (error) => {
    console.error('Payment error:', error)
    setStep('payment')
  }

  return (
    <div className="min-h-screen bg-light py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <div className={`flex-1 text-center ${step === 'summary' ? 'text-primary' : 'text-gray-600'}`}>
              <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center font-bold mb-2 ${
                step === 'summary' ? 'bg-primary text-white' : 'bg-gray-300 text-white'
              }`}>
                1
              </div>
              <p className="text-sm">Booking Summary</p>
            </div>
            <div className={`flex-1 h-1 mx-4 ${step !== 'summary' ? 'bg-primary' : 'bg-gray-300'}`} />
            <div className={`flex-1 text-center ${step === 'payment' ? 'text-primary' : 'text-gray-600'}`}>
              <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center font-bold mb-2 ${
                ['payment', 'confirmation'].includes(step) ? 'bg-primary text-white' : 'bg-gray-300 text-white'
              }`}>
                2
              </div>
              <p className="text-sm">Payment</p>
            </div>
            <div className={`flex-1 h-1 mx-4 ${step === 'confirmation' ? 'bg-primary' : 'bg-gray-300'}`} />
            <div className={`flex-1 text-center ${step === 'confirmation' ? 'text-primary' : 'text-gray-600'}`}>
              <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center font-bold mb-2 ${
                step === 'confirmation' ? 'bg-primary text-white' : 'bg-gray-300 text-white'
              }`}>
                3
              </div>
              <p className="text-sm">Confirmation</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto">
          {step === 'summary' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Confirm Your Booking</h1>
              <div className="flex justify-center">
                <BookingSummary
                  booking={mockBooking}
                  onConfirm={handleConfirmBooking}
                  onCancel={() => navigate(-1)}
                  isLoading={isLoading}
                />
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Complete Payment</h1>
              <div className="flex justify-center">
                <PaymentSimulation
                  bookingId={mockBooking.id}
                  amount={mockBooking.spacePrice * 1.1 * 1} // Simple calculation
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                  isLoading={isLoading}
                />
              </div>
            </div>
          )}

          {step === 'confirmation' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Booking Confirmed!</h1>
              <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto text-center">
                <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your booking is confirmed!</h2>
                <p className="text-gray-600 mb-6">
                  Confirmation details have been sent to your email.
                </p>

                <div className="mb-6 p-4 bg-light rounded-lg text-left">
                  <p className="font-semibold text-gray-900 mb-2">Booking ID: {bookingData?.id || mockBooking.id}</p>
                  <p className="text-sm text-gray-600">{bookingData?.spaceName || mockBooking.spaceName}</p>
                </div>

                <div className="space-y-3">
                  <Button onClick={() => navigate('/dashboard')} className="w-full">
                    View in Dashboard
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/spaces')} className="w-full">
                    Browse More Spaces
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Booking
