import { FiMapPin, FiUsers, FiWifi } from 'react-icons/fi';
import placeholderImage from '../assets/images/placeholder.svg';

const SpaceCard = ({ space, onBookClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow relative">
      <div className="h-56 lg:h-64 bg-gray-300 flex items-center justify-center overflow-hidden relative">
        <img 
          src={space.image || placeholderImage} 
          alt={space.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = placeholderImage;
          }}
        />
        <div className="absolute right-3 top-3 bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-medium flex items-center shadow">
          <svg className="w-4 h-4 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.96c.3.921-.755 1.688-1.538 1.118l-3.37-2.448a1 1 0 00-1.176 0L5.28 18.46c-.783.57-1.838-.197-1.539-1.118l1.287-3.96a1 1 0 00-.364-1.118L1.295 9.515C.512 8.945.914 7.705 1.883 7.705h4.162a1 1 0 00.95-.69l1.286-3.96z"/></svg>
          <span>{space.rating}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 truncate">{space.name}</h3>
        <div className="flex items-center text-gray-600 mb-2">
          <FiMapPin className="mr-1" />
          <span className="text-sm truncate">{space.location}</span>
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{space.description}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-gray-600">
            <FiUsers className="mr-1" />
            <span className="text-sm">{space.capacity} people</span>
          </div>
          <div className="flex items-center text-green-600">
            <FiWifi className="mr-1" />
            <span className="text-sm">WiFi</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-blue-600">KSh {Number(space.price).toLocaleString('en-KE')}</span>
            <span className="text-gray-600">{`/${space.priceUnit || 'hour'}`}</span>
          </div>
          <button
            onClick={() => onBookClick(space)}
            className="bg-gradient-to-r from-cta-500 to-yellow-400 text-gray-900 px-4 py-2 rounded-full font-semibold hover:opacity-95 shadow"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpaceCard;