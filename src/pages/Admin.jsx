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
          <li>Oversee simulated payments and invoicing</li>
          <li>Maintain platform integrity and security</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Admin Roles & Access Control</h2>
        <p className="text-gray-700 mb-2">Only authenticated users with the role <code>admin</code> can access this dashboard. Admins have full permissions across the platform, unlike clients who only interact with booking features.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Core Features</h2>

        <h3 className="text-xl font-medium mt-4">1. Space Management</h3>
        <p className="text-gray-700">Admins can manage all spaces available on the platform.</p>
        <ul className="list-disc ml-6 text-gray-700 mb-2">
          <li>Add a new space</li>
          <li>View all spaces</li>
          <li>Edit space details</li>
          <li>Enable or disable a space</li>
        </ul>
        <p className="text-gray-600 mb-4">Space information includes name, location, pricing, capacity, description, images, and status (`available`, `inactive`). Disabling a space prevents booking without deleting data.</p>

        <h3 className="text-xl font-medium mt-4">2. User Management</h3>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>View all users</li>
          <li>Create new users</li>
          <li>Assign roles (`admin`, `client`)</li>
          <li>Enable or disable user accounts</li>
        </ul>

        <h3 className="text-xl font-medium mt-4">3. Booking Management</h3>
        <p className="text-gray-700 mb-2">Admins have visibility into all bookings and can monitor statuses: <code>pending</code>, <code>confirmed</code>, <code>cancelled</code>.</p>

        <h3 className="text-xl font-medium mt-4">4. Availability Control Logic</h3>
        <p className="text-gray-700 mb-4">Availability is managed per booking time range to prevent double bookings while allowing different-date bookings.</p>

        <h3 className="text-xl font-medium mt-4">5. Payment & Invoicing (Simulated)</h3>
        <p className="text-gray-700 mb-2">Admins can view payment records and invoices generated per booking. Invoice data includes invoice ID, client details, space, duration, amount, and payment status. No real gateway is integrated for MVP.</p>

        <h3 className="text-xl font-medium mt-4">6. Agreement Acceptance Tracking</h3>
        <p className="text-gray-700">Admins can verify whether clients accepted the booking agreement before confirmation; acceptance is stored with a timestamp.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Dashboard Pages Structure</h2>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Admin Login</li>
          <li>Dashboard Overview (Stats summary)</li>
          <li>Spaces Management</li>
          <li>Users Management</li>
          <li>Bookings Management</li>
          <li>Payments & Invoices</li>
          <li>Settings / Profile</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Non-Functional Requirements</h2>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>Secure authentication using JWT</li>
          <li>Role-based authorization</li>
          <li>Responsive UI</li>
          <li>Data persistence via database</li>
          <li>Error handling and validation</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Tech Stack (Recommended)</h2>
        <p className="text-gray-700">Frontend: React, Vite, Tailwind CSS, React Router. Backend: Node.js, Express, JWT, PostgreSQL or MongoDB.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Future Enhancements</h2>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Real payment gateway integration (M-Pesa, Stripe)</li>
          <li>Analytics and reports</li>
          <li>Admin activity logs</li>
          <li>Space owner role (separate from admin)</li>
          <li>Downloadable PDF invoices</li>
        </ul>
      </section>
      
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Quick Actions (Admin)</h2>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={async () => {
              try {
                const stats = await adminService.getDashboardStats()
                // simple alert for now
                alert(JSON.stringify(stats))
              } catch (e) {
                alert('Unable to fetch stats')
              }
            }}
            className="px-4 py-2 bg-primary text-white rounded"
          >
            Load Stats
          </button>

          <button
            onClick={async () => {
              try {
                const spaces = await adminService.getAllSpaces()
                alert(`Spaces: ${Array.isArray(spaces) ? spaces.length : 'n/a'}`)
              } catch (e) {
                alert('Unable to load spaces')
              }
            }}
            className="px-4 py-2 bg-white border rounded"
          >
            Load Spaces
          </button>
        </div>
      </section>
    </div>
  )
}

export default Admin
