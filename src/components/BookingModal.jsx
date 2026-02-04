import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBooking } from '../redux/bookingsSlice';
import { FiX, FiCalendar, FiClock } from 'react-icons/fi';
import { toast } from 'react-toastify';

const BookingModal = ({ isOpen, onClose, space }) => {
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    purpose: ''
  });
  
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { loading } = useSelector(state => state.bookings);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please login to make a booking');
      return;
    }

    const bookingData = {
      spaceId: space.id,
      userId: user.id,
      spaceName: space.name,
      userName: user.name,
      userEmail: user.email,
      ...formData,
      totalPrice: calculatePrice()
    };

    try {
      const result = await dispatch(createBooking(bookingData)).unwrap();
      toast.success('Booking created successfully!');
      onClose();
      setFormData({ date: '', startTime: '', endTime: '', purpose: '' });
    } catch (error) {
      toast.error(error || 'Failed to create booking');
    }
  };

  const calculatePrice = () => {
    if (!formData.startTime || !formData.endTime) return 0;
    const start = new Date(`2000-01-01 ${formData.startTime}`);
    const end = new Date(`2000-01-01 ${formData.endTime}`);
    const hours = (end - start) / (1000 * 60 * 60);
    return hours * space?.price || 0;
  };

  if (!isOpen || !space) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Book {space.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">Date</label>
            <div className="relative">
              <FiCalendar className="absolute left-3 top-3 text-gray-400" />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="form-input pl-10"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Start Time</label>
              <div className="relative">
                <FiClock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                  className="form-input pl-10"
                  required
                />
              </div>
            </div>
            <div>
              <label className="form-label">End Time</label>
              <div className="relative">
                <FiClock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                  className="form-input pl-10"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="form-label">Purpose</label>
            <textarea
              value={formData.purpose}
              onChange={(e) => setFormData({...formData, purpose: e.target.value})}
              className="form-input h-24"
              rows="3"
              placeholder="Meeting, workshop, etc."
            />
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-white p-3 rounded-lg border border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-gray-500">Total Price</div>
                <div className="text-lg font-semibold">KSh {Number(calculatePrice()).toLocaleString('en-KE')}</div>
              </div>
              <div className="text-sm text-gray-400">Price calculated based on duration</div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary"
            >
              {loading ? 'Booking...' : 'Book Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;