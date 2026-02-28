import React, { useState } from "react";
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from "recharts";
import { FaUtensils, FaUsers, FaChartBar, FaCog, FaChartPie, FaTruck, FaShoppingCart } from "react-icons/fa";

// Mock data for daily, weekly, and monthly periods
const dailyData = [
  { name: "Today", orders: 100, revenue: 400, chefs: 5, activeUsers: 30 },
  { name: "Yesterday", orders: 90, revenue: 350, chefs: 4, activeUsers: 28 },
];

const weeklyData = [
  { name: "Week 1", orders: 700, revenue: 2800, chefs: 35, activeUsers: 210 },
  { name: "Week 2", orders: 800, revenue: 3200, chefs: 40, activeUsers: 250 },
  { name: "Week 3", orders: 750, revenue: 3000, chefs: 37, activeUsers: 230 },
  { name: "Week 4", orders: 900, revenue: 3600, chefs: 45, activeUsers: 270 },
];

const monthlyData = [
  { name: "Jan", orders: 1000, revenue: 4000, chefs: 50, activeUsers: 300 },
  { name: "Feb", orders: 2000, revenue: 5000, chefs: 55, activeUsers: 350 },
  { name: "Mar", orders: 1500, revenue: 4500, chefs: 60, activeUsers: 400 },
  { name: "Apr", orders: 2200, revenue: 6000, chefs: 65, activeUsers: 420 },
  { name: "May", orders: 2500, revenue: 7000, chefs: 70, activeUsers: 450 },
];

const Comp8 = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [period, setPeriod] = useState("monthly");  // Default to monthly

  // Function to get the data based on the selected period
  const getData = () => {
    if (period === "daily") return dailyData;
    if (period === "weekly") return weeklyData;
    return monthlyData; // Default to monthly
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-800 p-5 flex flex-col">
        <h1 className="text-2xl font-bold mb-5">HomeMeal</h1>
        <nav>
          <ul className="space-y-4">
            <li className="flex items-center space-x-3 hover:text-orange-400 cursor-pointer" onClick={() => setActiveTab("overview")}><FaChartPie /> <span>Overview</span></li>
            <li className="flex items-center space-x-3 hover:text-orange-400 cursor-pointer" onClick={() => setActiveTab("orders")}><FaShoppingCart /> <span>Orders</span></li>
            <li className="flex items-center space-x-3 hover:text-orange-400 cursor-pointer" onClick={() => setActiveTab("users")}><FaUsers /> <span>Users</span></li>
            <li className="flex items-center space-x-3 hover:text-orange-400 cursor-pointer" onClick={() => setActiveTab("analytics")}><FaChartBar /> <span>Analytics</span></li>
            <li className="flex items-center space-x-3 hover:text-orange-400 cursor-pointer" onClick={() => setActiveTab("logistics")}><FaTruck /> <span>Logistics</span></li>
            <li className="flex items-center space-x-3 hover:text-orange-400 cursor-pointer" onClick={() => setActiveTab("settings")}><FaCog /> <span>Settings</span></li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-5 overflow-auto">
        {/* Top Navigation Menu */}
        <div className="flex justify-between items-center mb-5 bg-gray-800 p-3 rounded-lg">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <div className="space-x-4">
            <button className="bg-orange-500 px-4 py-2 rounded-lg" onClick={() => { setPeriod("daily"); setActiveTab("overview"); }}>Daily</button>
            <button className="bg-orange-500 px-4 py-2 rounded-lg" onClick={() => { setPeriod("weekly"); setActiveTab("overview"); }}>Weekly</button>
            <button className="bg-orange-500 px-4 py-2 rounded-lg" onClick={() => { setPeriod("monthly"); setActiveTab("overview"); }}>Monthly</button>
          </div>
        </div>

        {/* Dynamic Content Based on Active Tab */}
        {activeTab === "overview" && (
          <div>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gray-700 p-5 rounded-lg text-center"><h3>Total Orders</h3><p className="text-2xl">372</p></div>
              <div className="bg-gray-700 p-5 rounded-lg text-center"><h3>Users</h3><p className="text-2xl">220</p></div>
              <div className="bg-gray-700 p-5 rounded-lg text-center"><h3>Revenue</h3><p className="text-2xl">$7,000</p></div>
              <div className="bg-gray-700 p-5 rounded-lg text-center"><h3>Pending Orders</h3><p className="text-2xl">45</p></div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-2 gap-4 mt-5">
              {/* Order Trends */}
              <div className="bg-gray-700 p-5 rounded-lg">
                <h3 className="text-xl mb-3">Order Trends</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={getData()}>
                    <XAxis dataKey="name" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip />
                    <Line type="monotone" dataKey="orders" stroke="#ffa500" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Revenue Growth */}
              <div className="bg-gray-700 p-5 rounded-lg">
                <h3 className="text-xl mb-3">Revenue Growth</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={getData()}>
                    <XAxis dataKey="name" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#ffa500" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Active Chefs */}
              <div className="bg-gray-700 p-5 rounded-lg">
                <h3 className="text-xl mb-3">Active Chefs</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={getData()}>
                    <XAxis dataKey="name" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip />
                    <Bar dataKey="chefs" fill="#32CD32" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Active Users */}
              <div className="bg-gray-700 p-5 rounded-lg">
                <h3 className="text-xl mb-3">Active Users</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={getData()} dataKey="activeUsers" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                      {getData().map((entry, index) => (
                        <Cell key={cell-${index}} fill={["#1E90FF", "#32CD32", "#FFA500", "#FF6347", "#9370DB"][index % 5]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comp8;