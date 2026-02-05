import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import { addSpace, updateSpace, deleteSpace } from '../redux/spacesSlice';
import { updateBookingStatus, deleteBooking } from '../redux/bookingsSlice';
import { addUser, updateUser, deleteUser, updateUserRole } from '../redux/usersSlice';
import { FiPlus, FiEdit, FiTrash, FiUsers, FiMapPin, FiDollarSign, FiCalendar, FiBarChart, FiExternalLink, FiLogOut } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Sparkline from '../components/Sparkline';

const AdminDashboard = () => {
  const [showSpaceModal, setShowSpaceModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingSpace, setEditingSpace] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [viewAllSpaces, setViewAllSpaces] = useState(false);
  const [viewAllUsers, setViewAllUsers] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { spaces } = useSelector(state => state.spaces);
  const { bookings } = useSelector(state => state.bookings);
  const { users } = useSelector(state => state.users);
  const { user: currentUser } = useSelector(state => state.auth);

  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
  const totalSpaces = spaces.length;
  const activeSpaces = spaces.filter(s => s.status !== 'inactive').length;
  const featuredSpaces = spaces.filter(s => s.featured).length;
  const activeBookings = bookings.filter(b => b.status === 'confirmed').length;
  const totalUsers = users.filter(u => u.role === 'client').length;
  const activeUsers = users.filter(u => u.role === 'client' && u.isActive !== false).length;
  
  // Calculate new spaces this month
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const newSpacesThisMonth = spaces.filter(space => {
    if (!space.createdAt) return false;
    const createdDate = new Date(space.createdAt);
    return createdDate.getMonth() === currentMonth && createdDate.getFullYear() === currentYear;
  }).length;

  // Calculate new users this month
  const newUsersThisMonth = users.filter(user => {
    if (!user.createdAt || user.role !== 'client') return false;
    const createdDate = new Date(user.createdAt);
    return createdDate.getMonth() === currentMonth && createdDate.getFullYear() === currentYear;
  }).length;

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/');
  };

  const SpaceModal = () => {
    const [formData, setFormData] = useState(editingSpace || {
      name: '', location: '', category: 'coworking', capacity: '', price: '', description: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (editingSpace) {
        dispatch(updateSpace({ id: editingSpace.id, ...formData }));
        toast.success('Space updated successfully');
      } else {
        dispatch(addSpace(formData));
        toast.success('Space added successfully');
      }
      setShowSpaceModal(false);
      setEditingSpace(null);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <h2 className="text-xl font-semibold mb-4">
            {editingSpace ? 'Edit Space' : 'Add New Space'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Space Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="coworking">Coworking</option>
              <option value="meeting-room">Meeting Room</option>
              <option value="event-space">Event Space</option>
              <option value="private-office">Private Office</option>
              <option value="studio">Studio</option>
            </select>
            <input
              type="number"
              placeholder="Capacity"
              value={formData.capacity}
              onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
            <input
              type="number"
              placeholder="Price per hour"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg"
              rows="3"
            />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowSpaceModal(false);
                  setEditingSpace(null);
                }}
                className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editingSpace ? 'Update' : 'Add'} Space
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const UserModal = () => {
    const [formData, setFormData] = useState(editingUser || {
      name: '', email: '', password: '', role: 'client', phone: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (editingUser) {
        dispatch(updateUser({ id: editingUser.id, ...formData }));
        toast.success('User updated successfully');
      } else {
        dispatch(addUser(formData));
        toast.success('User added successfully');
      }
      setShowUserModal(false);
      setEditingUser(null);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <h2 className="text-xl font-semibold mb-4">
            {editingUser ? 'Edit User' : 'Add New User'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
            {!editingUser && (
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            )}
            <input
              type="tel"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg"
            />
            <select
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="client">Client</option>
              <option value="admin">Admin</option>
            </select>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowUserModal(false);
                  setEditingUser(null);
                }}
                className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editingUser ? 'Update' : 'Add'} User
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const AllSpacesModal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-2xl font-bold">All Spaces</h2>
            <button
              onClick={() => setViewAllSpaces(false)}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
          <div className="p-6 overflow-auto flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {spaces.map((space) => (
                    <tr key={space.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium">{space.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{space.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600 capitalize">
                        {space.category.replace('-', ' ')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">KES {space.price}/{space.priceUnit || 'hr'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          space.status === 'inactive' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {space.status === 'inactive' ? 'Inactive' : 'Active'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingSpace(space);
                            setViewAllSpaces(false);
                            setShowSpaceModal(true);
                          }}
                          className="p-2 rounded hover:bg-gray-100"
                          aria-label={`Edit ${space.name}`}
                        >
                          <FiEdit className="text-blue-600" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete ${space.name}?`)) {
                              dispatch(deleteSpace(space.id));
                              toast.success('Space deleted successfully');
                            }
                          }}
                          className="p-2 rounded hover:bg-red-50"
                          aria-label={`Delete ${space.name}`}
                        >
                          <FiTrash className="text-red-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AllUsersModal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-2xl font-bold">All Users</h2>
            <button
              onClick={() => setViewAllUsers(false)}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
          <div className="p-6 overflow-auto flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Bookings</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Spent</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={user.role}
                          onChange={(e) => {
                            dispatch(updateUserRole({ id: user.id, role: e.target.value }));
                            toast.success('User role updated');
                          }}
                          className="px-2 py-1 border rounded text-sm capitalize"
                        >
                          <option value="client">Client</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.totalBookings || 0}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">KES {user.totalSpent || 0}</td>
                      <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingUser(user);
                            setViewAllUsers(false);
                            setShowUserModal(true);
                          }}
                          className="p-2 rounded hover:bg-gray-100"
                          aria-label={`Edit ${user.name}`}
                        >
                          <FiEdit className="text-blue-600" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete ${user.name}?`)) {
                              dispatch(deleteUser(user.id));
                              toast.success('User deleted successfully');
                            }
                          }}
                          className="p-2 rounded hover:bg-red-50"
                          aria-label={`Delete ${user.name}`}
                        >
                          <FiTrash className="text-red-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Spacer Admin</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition"
              >
                <FiExternalLink className="w-4 h-4" />
                <span>View Site</span>
              </button>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                <span className="text-sm text-gray-600">Admin:</span>
                <span className="text-sm font-medium text-gray-900">{currentUser?.name || 'Admin User'}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 transition"
              >
                <FiLogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h2>
          <p className="text-gray-600">Manage spaces, users, and bookings across the platform</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm font-medium text-gray-600">Total Spaces</h3>
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-2">{totalSpaces}</p>
            <div className="text-sm text-gray-600">
              <p>{activeSpaces} active</p>
              <p>+{newSpacesThisMonth} this month</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm font-medium text-gray-600">Total Users</h3>
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-2">{totalUsers}</p>
            <div className="text-sm text-gray-600">
              <p>{totalUsers} total</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm font-medium text-gray-600">Active Bookings</h3>
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-2">{activeBookings}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm font-medium text-gray-600">Total Revenue</h3>
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-2">KES {totalRevenue}</p>
            <div className="text-sm text-gray-600">
              <p>All-time</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <button
              onClick={() => setShowSpaceModal(true)}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 transition text-left"
            >
              <FiPlus className="w-8 h-8 text-blue-600 mb-3" />
              <h4 className="font-semibold text-gray-900 mb-1">Add Space</h4>
              <p className="text-sm text-gray-600">Create new listing</p>
            </button>

            <button
              onClick={() => setViewAllSpaces(true)}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 transition text-left"
            >
              <FiMapPin className="w-8 h-8 text-blue-600 mb-3" />
              <h4 className="font-semibold text-gray-900 mb-1">Manage Spaces</h4>
              <p className="text-sm text-gray-600">Edit & view spaces</p>
            </button>

            <button
              onClick={() => setShowUserModal(true)}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 transition text-left"
            >
              <FiUsers className="w-8 h-8 text-blue-600 mb-3" />
              <h4 className="font-semibold text-gray-900 mb-1">Add User</h4>
              <p className="text-sm text-gray-600">Create user account</p>
            </button>

            <button
              onClick={() => setViewAllUsers(true)}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 transition text-left"
            >
              <FiUsers className="w-8 h-8 text-blue-600 mb-3" />
              <h4 className="font-semibold text-gray-900 mb-1">Manage Users</h4>
              <p className="text-sm text-gray-600">View all users</p>
            </button>
          </div>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Space Management */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Space Management</h3>
            <p className="text-sm text-gray-600 mb-6">Overview of all spaces on the platform</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{activeSpaces}</p>
                <p className="text-sm text-gray-600">Active Spaces</p>
                <p className="text-xs text-gray-500 mt-1">Ready for booking</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{featuredSpaces}</p>
                <p className="text-sm text-gray-600">Featured Spaces</p>
                <p className="text-xs text-gray-500 mt-1">Highlighted listings</p>
              </div>
            </div>

            <button
              onClick={() => setViewAllSpaces(true)}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              View All Spaces
            </button>
          </div>

          {/* User Management */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-2">User Management</h3>
            <p className="text-sm text-gray-600 mb-6">Platform user statistics</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{activeUsers}</p>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-xs text-gray-500 mt-1">Currently active</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{newUsersThisMonth}</p>
                <p className="text-sm text-gray-600">New This Month</p>
                <p className="text-xs text-gray-500 mt-1">Recent signups</p>
              </div>
            </div>

            <button
              onClick={() => setViewAllUsers(true)}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              View All Users
            </button>
          </div>
        </div>

        {/* Booking Management */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Booking Management</h3>
          <p className="text-sm text-gray-600 mb-6">Recent and active bookings</p>
          
          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <FiCalendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No bookings yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {bookings.slice(0, 5).map((booking) => {
                const space = spaces.find(s => s.id === booking.spaceId);
                const user = users.find(u => u.id === booking.userId);
                return (
                  <div key={booking.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{space?.name}</p>
                      <p className="text-sm text-gray-600">{user?.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">KES {booking.totalPrice}</p>
                      <p className="text-sm text-gray-600">{new Date(booking.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showSpaceModal && <SpaceModal />}
      {showUserModal && <UserModal />}
      {viewAllSpaces && <AllSpacesModal />}
      {viewAllUsers && <AllUsersModal />}
    </div>
  );
};

export default AdminDashboard;