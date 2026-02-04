const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
      <div className="w-16 h-16 rounded-full bg-cta-50 flex items-center justify-center text-2xl text-cta-600 mb-4">
        {icon}
      </div>
      <h3 className="text-lg md:text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm md:text-base">{description}</p>
    </div>
  );
};

export default FeatureCard;