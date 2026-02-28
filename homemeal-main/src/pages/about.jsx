import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

const Dashboard = () => {
  // State for selected time period
  const [timePeriod, setTimePeriod] = useState('Daily');

  // Mock data for different time periods
  const data = {
    Daily: {
      labels: ['8 AM', '12 PM', '4 PM', '8 PM'],
      datasets: [
        {
          label: 'Carbon Emission (tons)',
          data: [120, 150, 130, 110],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
        },
      ],
    },
    Weekly: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Carbon Emission (tons)',
          data: [800, 750, 900, 820, 870, 910, 880],
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 2,
        },
      ],
    },
    Monthly: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Carbon Emission (tons)',
          data: [3200, 3100, 3000, 3400],
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 2,
        },
      ],
    },
  };

  // Handle time period change
  const handleTimePeriodChange = (period) => {
    setTimePeriod(period);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Carbon Emission Dashboard</h2>

      <div style={{ margin: '20px 0' }}>
        <button onClick={() => handleTimePeriodChange('Daily')} style={timePeriod === 'Daily' ? { fontWeight: 'bold' } : {}}>Daily</button>
        <button onClick={() => handleTimePeriodChange('Weekly')} style={timePeriod === 'Weekly' ? { fontWeight: 'bold' } : {}}>Weekly</button>
        <button onClick={() => handleTimePeriodChange('Monthly')} style={timePeriod === 'Monthly' ? { fontWeight: 'bold' } : {}}>Monthly</button>
      </div>

      <Line data={data[timePeriod]} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

export default Dashboard;
