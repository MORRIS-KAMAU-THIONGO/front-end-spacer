import React, { useState } from 'react'
import { Input, Button } from '../../components/ui'

export const SpaceForm = ({ initialData = {}, onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    location: initialData?.location || '',
    capacity: initialData?.capacity || '',
    pricePerHour: initialData?.pricePerHour || '',
    amenities: initialData?.amenities || [],
    image: initialData?.image || '',
    rules: initialData?.rules || ''
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name) newErrors.name = 'Space name is required'
    if (!formData.description) newErrors.description = 'Description is required'
    if (!formData.location) newErrors.location = 'Location is required'
    if (!formData.capacity) newErrors.capacity = 'Capacity is required'
    if (!formData.pricePerHour) newErrors.pricePerHour = 'Price per hour is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <Input
        label="Space Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        placeholder="Enter space name"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Describe the space..."
        />
        {errors.description && <p className="text-danger text-sm mt-1">{errors.description}</p>}
      </div>

      <Input
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        error={errors.location}
        placeholder="Enter location"
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Capacity (people)"
          name="capacity"
          type="number"
          value={formData.capacity}
          onChange={handleChange}
          error={errors.capacity}
          placeholder="Number of people"
        />

        <Input
          label="Price per Hour ($)"
          name="pricePerHour"
          type="number"
          step="0.01"
          value={formData.pricePerHour}
          onChange={handleChange}
          error={errors.pricePerHour}
          placeholder="Price"
        />
      </div>

      <Input
        label="Image URL"
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="https://example.com/image.jpg"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rules
        </label>
        <textarea
          name="rules"
          value={formData.rules}
          onChange={handleChange}
          rows="3"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter space rules..."
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? 'Submitting...' : initialData?.id ? 'Update Space' : 'Create Space'}
      </Button>
    </form>
  )
}

export default SpaceForm
