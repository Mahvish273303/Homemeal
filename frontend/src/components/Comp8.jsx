import React, { useState } from "react";
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, Legend } from "recharts";
import { FaUtensils, FaUsers, FaChartBar, FaCog, FaChartPie, FaTruck, FaShoppingCart } from "react-icons/fa";

const data = [
  { name: "Jan", orders: 1000, revenue: 4000, chefs: 50, activeUsers: 300 },
  { name: "Feb", orders: 2000, revenue: 5000, chefs: 55, activeUsers: 350 },
  { name: "Mar", orders: 1500, revenue: 4500, chefs: 60, activeUsers: 400 },
  { name: "Apr", orders: 2200, revenue: 6000, chefs: 65, activeUsers: 420 },
  { name: "May", orders: 2500, revenue: 7000, chefs: 70, activeUsers: 450 },
];

const orders = [
  { id: 101, name: "Amit Sharma", date: "2025-03-30", status: "Completed", total: "₹1500", items: ["Paneer Tikka", "Naan", "Lassi"], dropPoint: "Sector 15, Gurgaon", chef: "Chef Rajesh", deliveryStatus: "Delivered" },
  { id: 102, name: "Priya Verma", date: "2025-03-29", status: "Pending", total: "₹800", items: ["Biryani", "Raita"], dropPoint: "Rohini, Delhi", chef: "Chef Kavita", deliveryStatus: "Being Prepared" },
  { id: 103, name: "Rohit Patel", date: "2025-03-28", status: "Canceled", total: "₹600", items: ["Masala Dosa", "Filter Coffee"], dropPoint: "Vasant Kunj, Delhi", chef: "Chef Ramesh", deliveryStatus: "Canceled" },
  { id: 104, name: "Sunita Joshi", date: "2025-03-27", status: "Completed", total: "₹1200", items: ["Rajma Chawal", "Papad"], dropPoint: "Dwarka, Delhi", chef: "Chef Manju", deliveryStatus: "Delivered" },
  { id: 105, name: "Ankit Mehta", date: "2025-03-26", status: "In Transit", total: "₹950", items: ["Pav Bhaji", "Cold Coffee"], dropPoint: "Connaught Place, Delhi", chef: "Chef Alok", deliveryStatus: "Out for Delivery" },
];

const Comp8 = () => {
  const [activeTab, setActiveTab] = useState("overview" ,"settings");  // Set default to "settings" for testing
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeDetails, setActiveDetails] = React.useState(null);//delievry partner wala
  const [isModalOpen, setIsModalOpen] = useState(false); // Add your modal state here
  const [activeSection, setActiveSection] = useState('Profile'); 
  const [timeframe, setTimeframe] = useState("daily");   //new  ----------------------
  
  

  // Toggle function for modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const [activeUserId, setActiveUserId] = React.useState(null);
  
  const toggleDetails = (id) => {
    setActiveUserId((prevId) => (prevId === id ? null : id));
  };
  const handleTimeframeChange = (newTimeframe) => {//new  ----------------------
    setTimeframe(newTimeframe);
  };
  

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-800 p-5 flex flex-col">
  <h1 className="text-2xl font-bold mb-5">HomeMeal</h1>
  <nav>
    <ul className="space-y-4">
      {[
        { name: "overview", icon: <FaChartPie />, label: "Overview" },
        { name: "orders", icon: <FaShoppingCart />, label: "Orders" },
        { name: "users", icon: <FaUsers />, label: "Users" },
        { name: "analytics", icon: <FaChartBar />, label: "Analytics" },
        { name: "Delivery Partners", icon: <FaTruck />, label: "Delivery Partners" },
        { name: "settings", icon: <FaCog />, label: "Settings" },
      ].map((tab) => (
        <li
          key={tab.name}
          className={`flex items-center space-x-3 cursor-pointer p-2 rounded-md ${
            activeTab === tab.name ? "text-orange-400 bg-gray-900" : "hover:text-green-400"
          }`}
          onClick={() => setActiveTab(tab.name)}
        >
          {tab.icon} <span>{tab.label}</span>
        </li>
      ))}
    </ul>
  </nav>
</div>

      {/* Main Content */}
      <div className="w-4/5 p-5 overflow-auto">
       {/* Top Navigation Menu */}
       <div className="flex justify-between items-center mb-5 bg-gray-800 p-3 rounded-lg">    {/*new---------------*/}
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <div className="space-x-4">
            {["daily", "weekly", "monthly"].map((period) => (
              <button
                key={period}
                className={`px-4 py-2 rounded-lg ${
                  timeframe === period ? "bg-orange-600" : "bg-orange-500"
                }`}
                onClick={() => handleTimeframeChange(period)}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
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
                  <LineChart data={data}>
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
                  <BarChart data={data}>
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
                  <BarChart data={data}>
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
                               <Pie 
                                 data={data} 
                                 dataKey="activeUsers" 
                                 nameKey="name" 
                                 cx="50%" 
                                 cy="50%" 
                                 outerRadius={80} 
                                 label>
                                 {data.map((entry, index) => (
                                   <Cell key={`cell-${index}`} fill={["#1E90FF", "#32CD32", "#FFA500", "#FF6347", "#9370DB"][index % 5]} />
                                      ))}
                               </Pie>
                               <Tooltip />
                             </PieChart>
                           </ResponsiveContainer>
                    </div>
             {/* Active Users */}


            </div>
          </div>
        )}

        {activeTab === "orders" && (
  <div>
    <h2 className="text-3xl font-bold mb-5">Orders</h2>
    {/* Orders Table */}
    <div className="bg-gray-800 bg-opacity-50 shadow-lg rounded-xl p-5 text-white">
      <table className="min-w-full bg-gray-900 bg-opacity-50 rounded-md text-white shadow-md">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="py-3 px-4 text-left">Order ID</th>
            <th className="py-3 px-4 text-left">Customer Name</th>
            <th className="py-3 px-4 text-left">Order Date</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Total Amount</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="hover:bg-gray-700 transition duration-200 ease-in-out"
            >
              <td className="py-2 px-4 border-t border-gray-700 text-left">{order.id}</td>
              <td className="py-2 px-4 border-t border-gray-700 text-left">{order.name}</td>
              <td className="py-2 px-4 border-t border-gray-700 text-left">{order.date}</td>
              <td
                className={`py-2 px-4 border-t border-gray-700 text-left ${
                  order.status === "Completed"
                    ? "text-green-400"
                    : order.status === "Pending"
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                {order.status}
              </td>
              <td className="py-2 px-4 border-t border-gray-700 text-left">{order.total}</td>
              <td className="py-2 px-4 border-t border-gray-700 text-center">
                <button
                  className="text-blue-400 hover:text-blue-600"
                  onClick={() => setSelectedOrder(order)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Viewing Order Details */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-md flex justify-center items-center">
          <div className="bg-gray-900 bg-opacity-80 text-white p-8 rounded-xl shadow-2xl w-1/3">
            <h3 className="text-3xl font-extrabold mb-4 text-gradient from-purple-400 to-blue-500 text-center">
              Order Details
            </h3>
            <div className="text-center space-y-2">
              <p className="text-lg"><strong>Order ID:</strong> {selectedOrder.id}</p>
              <p className="text-lg"><strong>Customer Name:</strong> {selectedOrder.name}</p>
              <p className="text-lg"><strong>Order Date:</strong> {selectedOrder.date}</p>
              <p className={`text-lg ${selectedOrder.status === "Completed" ? "text-green-400" : selectedOrder.status === "Pending" ? "text-yellow-400" : "text-red-400"}`}>
                <strong>Status:</strong> {selectedOrder.status}
              </p>
              <p className="text-lg"><strong>Total Amount:</strong> {selectedOrder.total}</p>
              <p className="text-lg"><strong>Ordered Items:</strong> {selectedOrder.items.join(", ")}</p>
              <p className="text-lg"><strong>Dropping Point:</strong> {selectedOrder.dropPoint}</p>
              <p className="text-lg"><strong>Assigned Chef:</strong> {selectedOrder.chef}</p>
              <p className="text-lg"><strong>Delivery Status:</strong> {selectedOrder.deliveryStatus}</p>
              <button
                className="mt-5 bg-red-500 px-6 py-2 rounded-md hover:bg-red-600 transition-all duration-200 ease-in-out"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
        )}
{/* Users Section */}
{activeTab === "users" && (
    <div>
      <h2 className="text-3xl font-bold mb-5">Users</h2>
      {/* Users Table */}
      <div className="bg-black bg-opacity-20 backdrop-blur-md shadow-lg rounded-xl p-5 text-white">
        <table className="min-w-full bg-black bg-opacity-10 rounded-md text-white shadow-md">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-3 px-4 text-left">User ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 1, name: "Amit Sharma", email: "amit@gmail.com", role: "Chef", status: "Active", enrollmentDate: "2023-05-15", frequentOrder: "lunch", orderFrequency: "Weekly", specialization: "Indian Cuisine", rating: "4.8" },
              { id: 2, name: "Neha Singh", email: "neha@gmail.com", role: "User", status: "Inactive", enrollmentDate: "2024-01-20", frequentOrder: "Aalu Parantha", orderFrequency: "Monthly" },
              { id: 3, name: "Ravi Verma", email: "ravi@gmail.com", role: "User", status: "Active", enrollmentDate: "2023-09-10", frequentOrder: "Ghobhi Aalu", orderFrequency: "Bi-Weekly" },
              { id: 1, name: "Surbhi Sharma", email: "surbhi@gmail.com", role: "Chef", status: "Active", enrollmentDate: "2023-05-15", frequentOrder: "lunch", orderFrequency: "Weekly", specialization: "Indian Cuisine", rating: "4.8" },
              { id: 2, name: "Nitin Singh", email: "nitin@gmail.com", role: "User", status: "Inactive", enrollmentDate: "2024-01-20", frequentOrder: "Aalu Parantha", orderFrequency: "Monthly" },
              { id: 3, name: "Ravikant Verma", email: "ravik@gmail.com", role: "User", status: "Active", enrollmentDate: "2023-09-10", frequentOrder: "Ghobhi Aalu", orderFrequency: "Bi-Weekly" },
            ].map((user) => (
              <React.Fragment key={user.id}>
                <tr
                  className="hover:bg-red-900 hover:bg-opacity-30 transition duration-200 ease-in-out"
                >
                  <td className="py-2 px-4 border-t border-gray-700 text-left">{user.id}</td>
                  <td className="py-2 px-4 border-t border-gray-700 text-left">{user.name}</td>
                  <td className="py-2 px-4 border-t border-gray-700 text-left">{user.email}</td>
                  <td className="py-2 px-4 border-t border-gray-700 text-left">{user.role}</td>
                  <td
                    className={`py-2 px-4 border-t border-gray-700 text-left ${
                      user.status === "Active" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {user.status}
                  </td>
                  <td className="py-2 px-4 border-t border-gray-700 text-center space-x-2">
                    <button
                      className="text-blue-400 hover:text-blue-600"
                      onClick={() => toggleDetails(user.id)}
                    >
                      {activeUserId === user.id ? "Hide" : "View"}
                    </button>
                    <button
                      className="text-red-400 hover:text-red-600"
                      onClick={() => alert(`Deleting user ${user.name}`)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                {activeUserId === user.id && (
                  <tr className="bg-gray-800 bg-opacity-50">
                    <td colSpan="6" className="py-4 px-6 border-t border-gray-700 text-left">
                      <div className="text-gray-300">
                        <p><strong>Enrollment Date:</strong> {user.enrollmentDate}</p>
                        {user.role === "User" ? (
                          <>
                            <p><strong>Most Frequent Order:</strong> {user.frequentOrder}</p>
                            <p><strong>Order Frequency:</strong> {user.orderFrequency}</p>
                          </>
                        ) : (
                          <>
                            <p><strong>Specialization:</strong> {user.specialization}</p>
                            <p><strong>Average Order Rating:</strong> {user.rating}</p>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )}
{/* Analytics Section */}
{activeTab === "analytics" && (
  <div>
    <h2 className="text-3xl font-bold mb-5">Analytics</h2>
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-gray-700 p-5 rounded-lg">
        <h3 className="text-xl mb-3">Monthly Revenue</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Bar dataKey="revenue" fill="#ffa500" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-gray-700 p-5 rounded-lg">
        <h3 className="text-xl mb-3">Chef Distribution</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              dataKey="chefs"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#82ca9d"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][index % 4]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
)}

{/* Delivery Partners Section */}
{activeTab === "Delivery Partners" && (
  <div>
    <h2 className="text-3xl font-bold mb-5">Delivery Partners</h2>
    {/* Delivery Partners Table */}
    <div className="bg-black bg-opacity-20 backdrop-blur-md shadow-lg rounded-xl p-5 text-white">
      <table className="min-w-full bg-black bg-opacity-10 rounded-md text-white shadow-md">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="py-3 px-4 text-left">Partner ID</th>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Contact</th>
            <th className="py-3 px-4 text-left">Delivery Area</th>
            <th className="py-3 px-4 text-left">Pickup Point</th>
            <th className="py-3 px-4 text-left">Working Hours</th>
            <th className="py-3 px-4 text-left">Deliveries Made</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {[
            { id: 101, name: "Rakesh Kumar", contact: "9876543210", area: "Paramount", pickup: "Ajnara", hours: "9 AM - 6 PM", deliveries: 120, status: "Active" },
            { id: 102, name: "Neha Gupta", contact: "9876543220", area: "Supertech", pickup: "Supertech", hours: "10 AM - 8 PM", deliveries: 80, status: "Inactive" },
            { id: 103, name: "Vikram Singh", contact: "9876543230", area: "Ajnara", pickup: "Paramount", hours: "8 AM - 5 PM", deliveries: 150, status: "Active" },
            { id: 104, name: "Amit Rana", contact: "9876543240", area: "Crossing Republic", pickup: "Supertech", hours: "11 AM - 7 PM", deliveries: 95, status: "Active" },
          ].map((partner) => (
            <React.Fragment key={partner.id}>
              <tr className="hover:bg-red-900 hover:bg-opacity-30 transition duration-200 ease-in-out">
                <td className="py-2 px-4 border-t border-gray-700 text-left">{partner.id}</td>
                <td className="py-2 px-4 border-t border-gray-700 text-left">{partner.name}</td>
                <td className="py-2 px-4 border-t border-gray-700 text-left">{partner.contact}</td>
                <td className="py-2 px-4 border-t border-gray-700 text-left">{partner.area}</td>
                <td className="py-2 px-4 border-t border-gray-700 text-left">{partner.pickup}</td>
                <td className="py-2 px-4 border-t border-gray-700 text-left">{partner.hours}</td>
                <td className="py-2 px-4 border-t border-gray-700 text-left">{partner.deliveries}</td>
                <td className={`py-2 px-4 border-t border-gray-700 text-left ${partner.status === "Active" ? "text-green-400" : "text-red-400"}`}>
                  {partner.status}
                </td>
                <td className="py-2 px-4 border-t border-gray-700 text-center space-x-2">
                  <button
                    className="text-blue-400 hover:text-blue-600"
                    onClick={() => setActiveDetails(partner)}
                  >
                    View
                  </button>
                  <button
                    className="text-red-400 hover:text-red-600"
                    onClick={() => alert(`Deleting partner ${partner.name}`)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>

    {/* Pop-up for Delivery Partner Details */}
    {activeDetails && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-1/3">
          <h3 className="text-xl font-bold mb-4">Details of {activeDetails.name}</h3>
          <p><strong>Partner ID:</strong> {activeDetails.id}</p>
          <p><strong>Contact:</strong> {activeDetails.contact}</p>
          <p><strong>Delivery Area:</strong> {activeDetails.area}</p>
          <p><strong>Pickup Point:</strong> {activeDetails.pickup}</p>
          <p><strong>Working Hours:</strong> {activeDetails.hours}</p>
          <p><strong>Deliveries Made:</strong> {activeDetails.deliveries}</p>
          <p><strong>Status:</strong> {activeDetails.status}</p>
          <p><strong>Efficiency:</strong> {Math.floor((activeDetails.deliveries / 150) * 100)}%</p>
          <p><strong>Pending Deliveries:</strong> {Math.floor(Math.random() * 5)}</p>
          <p><strong>Rating:</strong> {Math.floor(Math.random() * 5) + 1} / 5</p>
          <button
            className="mt-4 text-red-400 hover:text-red-600"
            onClick={() => setActiveDetails(null)}
          >
            Close
          </button>
        </div>
      </div>
    )}
  </div>
)}

{/* Settings Section */}
{activeTab === "settings" && (
  <div>
    <h2 className="text-3xl font-bold mb-5">Settings</h2>
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white p-4 rounded-lg w-1/4">
        <ul className="space-y-2">
          {[
            'General Settings', 
            'User Management', 
            'Profile Settings', 
            'Security Settings', 
            'API & Integration', 
            'Backup & Restore', 
            'System Logs', 
            'Content Management', 
            'Notification Settings', 
            'Financial Settings', 
            'Analytics & Reports', 
            'Theme & UI Customization', 
            'Developer Settings', 
            'Data Import/Export', 
            'Privacy & GDPR', 
            'Help & Support', 
            'Maintenance Mode'
          ].map((section) => (
            <li
              key={section}
              className={`p-2 rounded-md cursor-pointer hover:bg-gray-600 ${
                activeSection === section ? 'bg-gray-600' : ''
              }`}
              onClick={() => setActiveSection(section)}
            >
              {section}
            </li>
          ))}
        </ul>
      </div>

      {/* Content */}
      <div className="bg-gray-700 text-white p-6 rounded-lg w-3/4 ml-4">
        {activeSection === 'General Settings' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">General Settings</h3>
            <p>Update site name, logo, timezone, and other basic settings.</p>
          </div>
        )}
        {activeSection === 'User Management' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">User Management</h3>
            <p>Manage user accounts, roles, and permissions.</p>
          </div>
        )}
        {activeSection === 'Profile Settings' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Profile Settings</h3>
            <p>Update profile information, password, and enable 2FA.</p>
          </div>
        )}
        {activeSection === 'Security Settings' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Security Settings</h3>
            <p>Configure IP whitelisting, CAPTCHA, and password policies.</p>
          </div>
        )}
        {activeSection === 'API & Integration' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">API & Integration</h3>
            <p>Manage API keys and third-party integrations.</p>
          </div>
        )}
        {activeSection === 'Backup & Restore' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Backup & Restore</h3>
            <p>Manage data backups and restore settings.</p>
          </div>
        )}
        {activeSection === 'System Logs' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">System Logs</h3>
            <p>View login history, error logs, and activity tracking.</p>
          </div>
        )}
        {activeSection === 'Content Management' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Content Management</h3>
            <p>Add, edit, and delete content, manage media library.</p>
          </div>
        )}
        {activeSection === 'Notification Settings' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Notification Settings</h3>
            <p>Configure email, push notifications, and system alerts.</p>
          </div>
        )}
        {activeSection === 'Financial Settings' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Financial Settings</h3>
            <p>Configure payment gateways, taxes, and financial reports.</p>
          </div>
        )}
        {activeSection === 'Analytics & Reports' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Analytics & Reports</h3>
            <p>View traffic, financial, and user engagement reports.</p>
          </div>
        )}
        {activeSection === 'Theme & UI Customization' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Theme & UI Customization</h3>
            <p>Customize the UI, theme colors, and layout.</p>
          </div>
        )}
        {activeSection === 'Developer Settings' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Developer Settings</h3>
            <p>Enable debug mode, error reporting, and custom scripts.</p>
          </div>
        )}
        {activeSection === 'Data Import/Export' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Data Import/Export</h3>
            <p>Import or export data in various formats (CSV, JSON).</p>
          </div>
        )}
        {activeSection === 'Privacy & GDPR' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Privacy & GDPR</h3>
            <p>Manage data privacy settings and compliance requirements.</p>
          </div>
        )}
        {activeSection === 'Help & Support' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Help & Support</h3>
            <p>Access FAQs, support tickets, and documentation.</p>
          </div>
        )}
        {activeSection === 'Maintenance Mode' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Maintenance Mode</h3>
            <p>Enable maintenance mode and customize the message.</p>
          </div>
        )}
      </div>
    </div>
  </div>
)}



      </div>
    </div>
  );
};

export default Comp8;
