import React from 'react';

// Simple sparkline/bar chart component using divs (no external deps)
const Sparkline = ({ data = [], color = 'bg-blue-500', height = 36 }) => {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data);

  return (
    <div className="flex items-end gap-1 h-10">
      {data.map((value, idx) => {
        const pct = max > 0 ? (value / max) * 100 : 0;
        return (
          <div
            key={idx}
            className={`${color} rounded-sm`} 
            style={{ width: `${Math.max(6, 100 / data.length - 2)}%`, height: `${(pct / 100) * height}px` }}
          />
        );
      })}
    </div>
  );
};

export default Sparkline;
