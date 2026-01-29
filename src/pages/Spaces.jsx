import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input, Button, Loader, Pagination } from '../components/ui'
import { SpaceCard } from '../features/spaces/SpaceCard'

export const Spaces = () => {
  const navigate = useNavigate()
  const [spaces, setSpaces] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    search: '',
    minPrice: 0,
    maxPrice: 10000,
    capacity: '',
    sortBy: 'popular'
  })

  const itemsPerPage = 12
  const totalPages = Math.ceil(spaces.length / itemsPerPage)

  useEffect(() => {
    // Fetch spaces
    const mockSpaces = Array.from({ length: 24 }, (_, i) => ({
      id: i + 1,
      name: `Space ${i + 1}`,
      location: `Location ${i % 5 + 1}`,
      description: 'Beautiful and modern space perfect for your events',
      capacity: 10 + (i % 5) * 10,
      pricePerHour: 30 + (i % 10) * 5,
      rating: 4 + Math.random(),
      reviewCount: 10 + Math.floor(Math.random() * 100),
      isAvailable: Math.random() > 0.2,
      image: null
    }))
    setSpaces(mockSpaces)
    setIsLoading(false)
  }, [])

  const filteredSpaces = spaces.filter(space => {
    const matchesSearch = space.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         space.location.toLowerCase().includes(filters.search.toLowerCase())
    const matchesPrice = space.pricePerHour >= filters.minPrice && space.pricePerHour <= filters.maxPrice
    const matchesCapacity = !filters.capacity || space.capacity >= parseInt(filters.capacity)
    
    return matchesSearch && matchesPrice && matchesCapacity
  })

  const sortedSpaces = [...filteredSpaces].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low':
        return a.pricePerHour - b.pricePerHour
      case 'price-high':
        return b.pricePerHour - a.pricePerHour
      case 'rating':
        return b.rating - a.rating
      default:
        return 0
    }
  })

  const paginatedSpaces = sortedSpaces.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
    setCurrentPage(1)
  }

  const handleViewDetails = (spaceId) => {
    navigate(`/spaces/${spaceId}`)
  }

  const handleBook = (space) => {
    navigate(`/spaces/${space.id}`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Browse Spaces</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Filters</h2>

            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search spaces..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <div className="space-y-2">
                <input
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  placeholder="Min"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  placeholder="Max"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>

            {/* Capacity */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Capacity</label>
              <input
                type="number"
                name="capacity"
                value={filters.capacity}
                onChange={handleFilterChange}
                placeholder="Number of people"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>

            {/* Sort */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            <Button onClick={() => setFilters({
              search: '',
              minPrice: 0,
              maxPrice: 10000,
              capacity: '',
              sortBy: 'popular'
            })} variant="outline" className="w-full">
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Spaces Grid */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <Loader message="Loading spaces..." />
          ) : paginatedSpaces.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No spaces found matching your criteria.</p>
              <Button variant="outline" onClick={() => setFilters({
                search: '',
                minPrice: 0,
                maxPrice: 10000,
                capacity: '',
                sortBy: 'popular'
              })} className="mt-4">
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {paginatedSpaces.map(space => (
                  <SpaceCard
                    key={space.id}
                    space={space}
                    onViewDetails={() => handleViewDetails(space.id)}
                    onBook={() => handleBook(space)}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Spaces
