import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>HomeMeal</h2>
      <nav>
        <Link to="/overview">Overview</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/users">Users</Link>
        <Link to="/analytics">Analytics</Link>
        <Link to="/logistics">Logistics</Link>
        <Link to="/settings">Settings</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
