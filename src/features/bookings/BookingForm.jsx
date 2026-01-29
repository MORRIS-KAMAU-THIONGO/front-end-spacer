import React, { useState } from 'react'
import { Input, Button } from '../../components/ui'
import { calculateTotalPrice } from '../../utils/formatters'

export const BookingForm = ({ spaceId, spacePrice, onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    numberOfGuests: '',
    specialRequests: ''
  })

  const [errors, setErrors] = useState({})
  const [priceBreakdown, setPriceBreakdown] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    const newFormData = { ...formData, [name]: value }
    setFormData(newFormData)

    // Calculate price if both dates are set
    if (newFormData.startDate && newFormData.endDate) {
      const start = new Date(newFormData.startDate)
      const end = new Date(newFormData.endDate)
      const hours = Math.ceil((end - start) / (1000 * 60 * 60))
      
      if (hours > 0) {
        const breakdown = calculateTotalPrice(spacePrice, hours)
        setPriceBreakdown(breakdown)
      }
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.startDate) newErrors.startDate = 'Start date is required'
    if (!formData.endDate) newErrors.endDate = 'End date is required'
    if (!formData.numberOfGuests) newErrors.numberOfGuests = 'Number of guests is required'

    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate)
      const end = new Date(formData.endDate)
      if (end <= start) {
        newErrors.endDate = 'End date must be after start date'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit({
        spaceId,
        ...formData
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
      <Input
        label="Start Date & Time"
        name="startDate"
        type="datetime-local"
        value={formData.startDate}
        onChange={handleChange}
        error={errors.startDate}
      />

      <Input
        label="End Date & Time"
        name="endDate"
        type="datetime-local"
        value={formData.endDate}
        onChange={handleChange}
        error={errors.endDate}
      />

      <Input
        label="Number of Guests"
        name="numberOfGuests"
        type="number"
        value={formData.numberOfGuests}
        onChange={handleChange}
        error={errors.numberOfGuests}
        placeholder="Number of guests"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Special Requests
        </label>
        <textarea
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleChange}
          rows="3"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Any special requests?"
        />
      </div>

      {/* Price Breakdown */}
      {priceBreakdown && (
        <div className="bg-light p-4 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-3">Price Breakdown</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">${priceBreakdown.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax (10%):</span>
              <span className="font-medium">${priceBreakdown.tax.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-300 pt-2 flex justify-between">
              <span className="text-gray-900 font-semibold">Total:</span>
              <span className="text-primary font-bold">${priceBreakdown.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? 'Processing...' : 'Proceed to Payment'}
      </Button>
    </form>
  )
}

export default BookingForm
