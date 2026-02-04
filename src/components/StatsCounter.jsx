import { useState, useEffect } from 'react';

const StatsCounter = ({ end, label, duration = 2000, className = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration]);

  return (
    <div className={`text-center ${className}`}>
      <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">{count}</div>
      <div className="text-sm md:text-base text-white/90 uppercase tracking-wide">{label}</div>
    </div>
  );
};

export default StatsCounter;