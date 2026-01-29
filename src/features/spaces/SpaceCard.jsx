import React from 'react'
import { formatCurrency } from '../../utils/formatters'

export const SpaceCard = ({ space, onViewDetails, onBook }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
        {space.image ? (
          <img src={space.image} alt={space.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600">
            No Image
          </div>
        )}
        {space.isAvailable && (
          <div className="absolute top-4 right-4 bg-success text-white px-3 py-1 rounded-full text-sm font-semibold">
            Available
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
          {space.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {space.description}
        </p>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Capacity:</span>
            <span className="font-medium">{space.capacity} people</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Location:</span>
            <span className="font-medium truncate">{space.location}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Price:</span>
            <span className="font-semibold text-primary">{formatCurrency(space.pricePerHour)}/hr</span>
          </div>
        </div>

        {/* Rating */}
        {space.rating && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.round(space.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-600">({space.reviewCount || 0} reviews)</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={onViewDetails}
            className="flex-1 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-blue-50 transition text-sm font-medium"
          >
            Details
          </button>
          <button
            onClick={onBook}
            disabled={!space.isAvailable}
            className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm font-medium"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default SpaceCard
