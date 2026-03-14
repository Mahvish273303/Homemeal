import React from 'react';

const ChartComponent = ({ timeRange }) => {
  const getChartData = () => {
    switch (timeRange) {
      case 'Daily':
        return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
      case 'Weekly':
        return ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
      case 'Monthly':
      default:
        return ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
    }
  };

  return (
    <div className="chart">
      <h3>{timeRange} Data</h3>
      <div className="chart-content">
        {getChartData().map((label, index) => (
          <div key={index} className="bar">
            <div className="bar-value" style={{ height: `${Math.random() * 100}%` }}></div>
            <p>{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartComponent;
