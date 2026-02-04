import React from 'react'
import { useSelector } from 'react-redux'
import * as adminService from '../features/admin/adminService'

export const Admin = () => {
  const { user } = useSelector(state => state.auth)

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Spacer Admin Dashboard</h1>
      <p className="text-gray-600 mb-8">The <strong>Spacer Admin Dashboard</strong> is the control center of the Spacer platform. It allows administrators to manage spaces, users, bookings, and system operations efficiently. This module is restricted to users with the <strong>Admin role</strong> only.</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Purpose of the Admin Dashboard</h2>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Manage all spaces listed on the platform</li>
          <li>Manage users and their roles</li>
          <li>Monitor bookings and availability</li>
          import React, { useEffect, useState } from 'react'
          import { useSelector } from 'react-redux'
          import adminService from '../features/admin/adminService'

          const STORAGE_KEY = 'spacer_admin_spaces_v1'
          const LOCATIONS_KEY = 'spacer_admin_locations_v1'

          const emptyForm = {
            id: null,
            name: '',
            location: '',
            pricePerHour: '',
            pricePerDay: '',
            capacity: '',
            description: '',
            status: 'available'
          }

          export const Admin = () => {
            const { user } = useSelector(state => state.auth)
            const [spaces, setSpaces] = useState([])
            const [locations, setLocations] = useState([])
            const [form, setForm] = useState(emptyForm)
            const [editing, setEditing] = useState(false)
            const [loading, setLoading] = useState(false)

            useEffect(() => {
              loadLocations()
              loadSpaces()
            }, [])

            const loadSpaces = async () => {
              setLoading(true)
              try {
                const data = await adminService.getAllSpaces()
                if (Array.isArray(data)) {
                  setSpaces(data)
                  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
                  setLoading(false)
                  return
                }
              } catch (e) {
                // ignore
              }

              // fallback to localStorage
              const saved = localStorage.getItem(STORAGE_KEY)
              setSpaces(saved ? JSON.parse(saved) : [])
              setLoading(false)
            }

            const saveSpacesLocal = (next) => {
              setSpaces(next)
              localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
            }

            const loadLocations = () => {
              try {
                const saved = localStorage.getItem(LOCATIONS_KEY)
                setLocations(saved ? JSON.parse(saved) : ['Nairobi'])
              } catch (e) {
                setLocations(['Nairobi'])
              }
            }

            const saveLocations = (next) => {
              setLocations(next)
              localStorage.setItem(LOCATIONS_KEY, JSON.stringify(next))
            }

            const handleChange = (e) => {
              const { name, value } = e.target
              setForm(prev => ({ ...prev, [name]: value }))
            }

            const handleSubmit = async (e) => {
              e.preventDefault()
              const payload = {
                name: form.name.trim(),
                location: form.location,
                pricePerHour: parseFloat(form.pricePerHour) || 0,
                pricePerDay: parseFloat(form.pricePerDay) || 0,
                capacity: parseInt(form.capacity, 10) || 0,
                description: form.description,
                status: form.status
              }

              try {
                if (editing && form.id) {
                  // try remote update
                  try {
                    await adminService.updateSpace(form.id, payload)
                  } catch (e) {
                    // ignore
                  }

                  const next = spaces.map(s => s.id === form.id ? { ...s, ...payload } : s)
                  saveSpacesLocal(next)
                } else {
                  // create
                  const newSpace = { ...payload, id: Date.now() }
                  try {
                    await adminService.createSpace(newSpace)
                  } catch (e) {
                    // ignore
                  }
                  saveSpacesLocal([newSpace, ...spaces])
                }

                setForm(emptyForm)
                setEditing(false)
              } catch (err) {
                alert('Error saving space')
              }
            }

            const handleEdit = (space) => {
              setForm({ ...space })
              setEditing(true)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }

            const handleDelete = async (id) => {
              if (!confirm('Delete this space?')) return
              try {
                try {
                  await adminService.disableSpace(id)
                } catch (e) {}
                const next = spaces.filter(s => s.id !== id)
                saveSpacesLocal(next)
              } catch (e) {
                alert('Unable to delete')
              }
            }

            const toggleStatus = async (space) => {
              const updated = { ...space, status: space.status === 'available' ? 'inactive' : 'available' }
              try {
                try {
                  await adminService.updateSpace(space.id, { status: updated.status })
                } catch (e) {}
                const next = spaces.map(s => s.id === space.id ? updated : s)
                saveSpacesLocal(next)
              } catch (e) {
                alert('Unable to update status')
              }
            }

            const handleAddLocation = () => {
              const name = prompt('New location name')
              if (!name) return
              if (locations.includes(name)) return alert('Location exists')
              const next = [...locations, name]
              saveLocations(next)
            }

            const handleRemoveLocation = (name) => {
              if (!confirm(`Remove location ${name}?`)) return
              const next = locations.filter(l => l !== name)
              saveLocations(next)
              // remove location from spaces
              const updated = spaces.map(s => s.location === name ? { ...s, location: '' } : s)
              saveSpacesLocal(updated)
            }

            return (
              <div className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">Spacer Admin — Spaces Management</h1>

                {/* Form */}
                <div className="bg-white p-6 rounded shadow mb-6">
                  <h2 className="text-xl font-semibold mb-4">{editing ? 'Edit Space' : 'Add New Space'}</h2>
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Space name" className="p-2 border rounded" required />
                    <select name="location" value={form.location} onChange={handleChange} className="p-2 border rounded" required>
                      <option value="">Select location</option>
                      {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                    </select>
                    <input name="pricePerHour" value={form.pricePerHour} onChange={handleChange} placeholder="Price per hour" className="p-2 border rounded" />
                    <input name="pricePerDay" value={form.pricePerDay} onChange={handleChange} placeholder="Price per day" className="p-2 border rounded" />
                    <input name="capacity" value={form.capacity} onChange={handleChange} placeholder="Capacity" className="p-2 border rounded" />
                    <select name="status" value={form.status} onChange={handleChange} className="p-2 border rounded">
                      <option value="available">Available</option>
                      <option value="inactive">Inactive</option>
                    </select>
                    <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="p-2 border rounded md:col-span-2" />

                    <div className="md:col-span-2 flex gap-2">
                      <button type="submit" className="px-4 py-2 bg-primary text-white rounded">{editing ? 'Update Space' : 'Create Space'}</button>
                      <button type="button" onClick={() => { setForm(emptyForm); setEditing(false) }} className="px-4 py-2 border rounded">Cancel</button>
                    </div>
                  </form>
                </div>

                {/* Locations management */}
                <div className="bg-white p-4 rounded shadow mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold">Locations</h3>
                    <div className="flex gap-2">
                      <button onClick={handleAddLocation} className="px-3 py-1 bg-primary text-white rounded">Add Location</button>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {locations.map(loc => (
                      <span key={loc} className="px-3 py-1 bg-gray-100 rounded flex items-center gap-2">
                        {loc}
                        <button onClick={() => handleRemoveLocation(loc)} className="text-red-500">×</button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Spaces list */}
                <div className="bg-white rounded shadow overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Location</th>
                        <th className="px-4 py-2 text-left">Price/hr</th>
                        <th className="px-4 py-2 text-left">Price/day</th>
                        <th className="px-4 py-2 text-left">Capacity</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {spaces.length === 0 && (
                        <tr>
                          <td colSpan={7} className="p-6 text-center text-gray-600">No spaces yet</td>
                        </tr>
                      )}
                      {spaces.map(space => (
                        <tr key={space.id} className="border-t">
                          <td className="px-4 py-2">{space.name}</td>
                          <td className="px-4 py-2">{space.location || '-'}</td>
                          <td className="px-4 py-2">{space.pricePerHour || 0}</td>
                          <td className="px-4 py-2">{space.pricePerDay || 0}</td>
                          <td className="px-4 py-2">{space.capacity || '-'}</td>
                          <td className="px-4 py-2">{space.status}</td>
                          <td className="px-4 py-2">
                            <div className="flex gap-2">
                              <button onClick={() => handleEdit(space)} className="px-3 py-1 bg-white border rounded">Edit</button>
                              <button onClick={() => toggleStatus(space)} className="px-3 py-1 bg-white border rounded">{space.status === 'available' ? 'Disable' : 'Enable'}</button>
                              <button onClick={() => handleDelete(space.id)} className="px-3 py-1 bg-red-50 text-red-600 border rounded">Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )
          }

          export default Admin
