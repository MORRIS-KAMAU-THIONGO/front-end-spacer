import { FiArrowRight } from 'react-icons/fi';

const CTASection = ({ onGetStartedClick }) => {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Find Your Space?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of businesses and individuals booking spaces on Spacer
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onGetStartedClick}
            className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 flex items-center justify-center"
          >
            Browse as Client <FiArrowRight className="ml-2" />
          </button>
          <button onClick={() => window.location='/list-space'} className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900">
            List Your Space
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;