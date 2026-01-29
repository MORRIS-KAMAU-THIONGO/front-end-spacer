import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button, Loader } from '../components/ui'
import { SpaceForm } from '../features/spaces/SpaceForm'
import { ProtectedRoute } from '../features/auth/ProtectedRoute'

export const Admin = () => {
  const { user } = useSelector(state => state.auth)
  const [activeTab, setActiveTab] = useState('spaces')
  const [isLoading, setIsLoading] = useState(false)
  const [spaces, setSpaces] = useState([])
  const [users, setUsers] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    // Fetch admin data
    setSpaces([])
    setUsers([])
  }, [])

  const handleAddSpace = (formData) => {
    setIsLoading(true)
    setTimeout(() => {
      const newSpace = { ...formData, id: Date.now() }
      setSpaces([...spaces, newSpace])
      setShowAddForm(false)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 mb-8">Manage your spaces and users</p>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('spaces')}
            className={`px-4 py-3 font-medium border-b-2 transition ${
              activeTab === 'spaces'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Spaces
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-3 font-medium border-b-2 transition ${
              activeTab === 'users'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Users
          </button>
        </div>

        {/* Content */}
        {activeTab === 'spaces' && (
          <div>
            {!showAddForm ? (
              <>
                <Button onClick={() => setShowAddForm(true)} className="mb-8">
                  + Add New Space
                </Button>

                {spaces.length === 0 ? (
                  <div className="bg-light rounded-lg p-12 text-center">
                    <p className="text-gray-600 mb-4">No spaces added yet</p>
                    <Button onClick={() => setShowAddForm(true)}>
                      Add Your First Space
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {spaces.map(space => (
                      <div key={space.id} className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{space.name}</h3>
                        <p className="text-gray-600 mb-4">{space.location}</p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="danger" size="sm">Delete</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Space</h2>
                <SpaceForm
                  onSubmit={handleAddSpace}
                  isLoading={isLoading}
                />
                <button
                  onClick={() => setShowAddForm(false)}
                  className="mt-4 text-primary hover:underline"
                >
                  ← Back
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {users.length === 0 ? (
                <div className="p-12 text-center text-gray-600">
                  No users yet
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-light">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Name</th>
                      <th className="px-6 py-4 text-left font-semibold">Email</th>
                      <th className="px-6 py-4 text-left font-semibold">Role</th>
                      <th className="px-6 py-4 text-left font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id} className="border-t border-gray-200">
                        <td className="px-6 py-4">{user.name}</td>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-light rounded-full text-sm">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-primary hover:underline text-sm">
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}

export default Admin
