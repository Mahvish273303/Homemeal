import React, { useState } from "react";

const Order = () => {
    const [timeframe, setTimeframe] = useState("Daily");
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const orders = [
        { id: 101, name: "John Doe", date: "2025-03-30", status: "Completed", total: "$150" },
        { id: 102, name: "Jane Smith", date: "2025-03-29", status: "Pending", total: "$200" },
        { id: 103, name: "Mike Johnson", date: "2025-03-28", status: "Canceled", total: "$80" },
        { id: 104, name: "Alice Brown", date: "2025-03-27", status: "Completed", total: "$120" },
    ];

    const filteredOrders = orders.filter(order => 
        (statusFilter === "All" || order.status === statusFilter) &&
        (order.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
         order.id.toString().includes(searchTerm))
    );

    return (
        <div className="flex h-screen">
            {/* Left Vertical Menu */}
            <div className="w-1/6 bg-gray-800 text-white p-4">
                <ul>
                    <li className="py-2 px-4 hover:bg-gray-700 cursor-pointer">Overview</li>
                    <li className="py-2 px-4 bg-gray-700 cursor-pointer">Orders</li>
                    <li className="py-2 px-4 hover:bg-gray-700 cursor-pointer">Users</li>
                    <li className="py-2 px-4 hover:bg-gray-700 cursor-pointer">Analytics</li>
                    <li className="py-2 px-4 hover:bg-gray-700 cursor-pointer">Logistics</li>
                    <li className="py-2 px-4 hover:bg-gray-700 cursor-pointer">Settings</li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="w-5/6 p-6 bg-gray-100">
                {/* Top Horizontal Bar */}
                <div className="flex justify-between mb-4">
                    <div>
                        <button 
                            className={`px-4 py-2 mr-2 ${timeframe === "Daily" ? "bg-blue-600 text-white" : "bg-white text-blue-600"} rounded`} 
                            onClick={() => setTimeframe("Daily")}
                        >Daily</button>
                        <button 
                            className={`px-4 py-2 mr-2 ${timeframe === "Weekly" ? "bg-blue-600 text-white" : "bg-white text-blue-600"} rounded`} 
                            onClick={() => setTimeframe("Weekly")}
                        >Weekly</button>
                        <button 
                            className={`px-4 py-2 ${timeframe === "Monthly" ? "bg-blue-600 text-white" : "bg-white text-blue-600"} rounded`} 
                            onClick={() => setTimeframe("Monthly")}
                        >Monthly</button>
                    </div>
                    <button className="bg-green-600 text-white px-4 py-2 rounded">New Order</button>
                </div>

                {/* Search and Filter */}
                <div className="flex justify-between items-center mb-4">
                    <input 
                        type="text" 
                        placeholder="Search orders..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-2 border rounded w-1/3"
                    />
                    <select 
                        className="p-2 border rounded"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="Canceled">Canceled</option>
                    </select>
                </div>

                {/* Orders Table */}
                <div className="bg-white shadow-md rounded overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border">Order ID</th>
                                <th className="py-2 px-4 border">Customer Name</th>
                                <th className="py-2 px-4 border">Order Date</th>
                                <th className="py-2 px-4 border">Status</th>
                                <th className="py-2 px-4 border">Total Amount</th>
                                <th className="py-2 px-4 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border">{order.id}</td>
                                    <td className="py-2 px-4 border">{order.name}</td>
                                    <td className="py-2 px-4 border">{order.date}</td>
                                    <td className="py-2 px-4 border">{order.status}</td>
                                    <td className="py-2 px-4 border">{order.total}</td>
                                    <td className="py-2 px-4 border space-x-2">
                                        <button className="text-blue-500">View</button>
                                        <button className="text-green-500">Edit</button>
                                        <button className="text-red-500">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Order;
