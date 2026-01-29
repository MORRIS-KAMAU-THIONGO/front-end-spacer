import React from 'react'
import { formatCurrency, formatDateTime } from '../../utils/formatters'

export const BookingSummary = ({ booking, onConfirm, onCancel, isLoading = false }) => {
  const getTotalPrice = () => {
    const hours = Math.ceil(
      (new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60 * 60)
    )
    const subtotal = booking.spacePrice * hours
    const tax = subtotal * 0.1
    return {
      subtotal,
      tax,
      total: subtotal + tax,
      hours
    }
  }

  const pricing = getTotalPrice()

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Summary</h2>

      {/* Space Info */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-2">{booking.spaceName}</h3>
        <p className="text-sm text-gray-600 mb-4">{booking.spaceLocation}</p>
        {booking.spaceImage && (
          <img src={booking.spaceImage} alt={booking.spaceName} className="w-full h-32 object-cover rounded-lg" />
        )}
      </div>

      {/* Booking Details */}
      <div className="mb-6 pb-6 border-b border-gray-200 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Check-in:</span>
          <span className="font-medium">{formatDateTime(booking.startDate)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Check-out:</span>
          <span className="font-medium">{formatDateTime(booking.endDate)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Duration:</span>
          <span className="font-medium">{pricing.hours} hours</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Number of Guests:</span>
          <span className="font-medium">{booking.numberOfGuests}</span>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="mb-6 pb-6 border-b border-gray-200 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Price per hour:</span>
          <span className="font-medium">{formatCurrency(booking.spacePrice)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal ({pricing.hours}h):</span>
          <span className="font-medium">{formatCurrency(pricing.subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax (10%):</span>
          <span className="font-medium">{formatCurrency(pricing.tax)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-primary">
          <span>Total:</span>
          <span>{formatCurrency(pricing.total)}</span>
        </div>
      </div>

      {/* Special Requests */}
      {booking.specialRequests && (
        <div className="mb-6 pb-6 border-b border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Special Requests:</p>
          <p className="text-sm text-gray-900">{booking.specialRequests}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={isLoading}
          className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
        >
          {isLoading ? 'Processing...' : 'Confirm Booking'}
        </button>
      </div>
    </div>
  )
}

export default BookingSummary
