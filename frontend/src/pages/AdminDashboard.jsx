import { useState, useEffect } from 'react';
import { adminApi } from '../api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    Promise.all([adminApi.getAnalytics(), adminApi.getUsers(), adminApi.getOrders()])
      .then(([a, u, o]) => {
        setAnalytics(a.analytics);
        setUsers(u.users || []);
        setOrders(o.orders || []);
      })
      .catch((err) => setError(err.message || 'Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  const handleApproveHomemaker = async (id) => {
    try {
      await adminApi.approveHomemaker(id);
      adminApi.getUsers().then((r) => setUsers(r.users || []));
    } catch (err) {
      setError(err.message || 'Failed to approve');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <p className="text-[#dfd218]">Loading...</p>
      </div>
    );
  }

  const a = analytics || {};
  const chartData = a.ordersByStatus
    ? a.ordersByStatus.map((s) => ({ name: s._id, count: s.count }))
    : [];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'users', label: 'Users' },
    { id: 'orders', label: 'Orders' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#dfd218] mb-6">Admin Dashboard</h1>
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-900/50 text-red-200 text-sm">{error}</div>
      )}
      <div className="flex gap-4 mb-6">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === t.id ? 'bg-[#dfd218] text-black' : 'bg-gray-700 text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700">
              <h3 className="text-gray-400 text-sm">Total Users</h3>
              <p className="text-2xl font-bold text-[#dfd218]">{a.totalUsers ?? 0}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700">
              <h3 className="text-gray-400 text-sm">Homemakers</h3>
              <p className="text-2xl font-bold text-[#dfd218]">{a.homemakers ?? 0}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700">
              <h3 className="text-gray-400 text-sm">Total Orders</h3>
              <p className="text-2xl font-bold text-[#dfd218]">{a.totalOrders ?? 0}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700">
              <h3 className="text-gray-400 text-sm">Active Subscriptions</h3>
              <p className="text-2xl font-bold text-[#dfd218]">{a.totalSubscriptions ?? 0}</p>
            </div>
          </div>
          {chartData.length > 0 && (
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Orders by status</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#dfd218" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
          {a.recentOrders?.length > 0 && (
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-3">Recent orders</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                {a.recentOrders.slice(0, 10).map((ord) => (
                  <li key={ord._id}>
                    {typeof ord.user_id === 'object' ? ord.user_id?.name : '-'} —{' '}
                    {typeof ord.meal_id === 'object' ? ord.meal_id?.meal_name : '-'} —{' '}
                    <span className="text-[#dfd218]">{ord.delivery_status}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      {activeTab === 'users' && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-gray-700">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4">Role</th>
                <th className="py-2 pr-4">Approved (HM)</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b border-gray-700">
                  <td className="py-3 pr-4 text-white">{u.name}</td>
                  <td className="py-3 pr-4 text-gray-300">{u.email}</td>
                  <td className="py-3 pr-4 text-[#dfd218]">{u.role}</td>
                  <td className="py-3 pr-4">{u.approvedAsHomemaker ? 'Yes' : 'No'}</td>
                  <td className="py-3">
                    {u.role === 'homemaker' && !u.approvedAsHomemaker && (
                      <button
                        onClick={() => handleApproveHomemaker(u._id)}
                        className="text-[#dfd218] hover:underline text-sm"
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-gray-700">
                <th className="py-2 pr-4">Customer</th>
                <th className="py-2 pr-4">Meal</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((ord) => (
                <tr key={ord._id} className="border-b border-gray-700">
                  <td className="py-3 pr-4 text-white">
                    {typeof ord.user_id === 'object' ? ord.user_id?.name : '-'}
                  </td>
                  <td className="py-3 pr-4 text-gray-300">
                    {typeof ord.meal_id === 'object' ? ord.meal_id?.meal_name : '-'}
                  </td>
                  <td className="py-3 pr-4 text-[#dfd218]">{ord.delivery_status}</td>
                  <td className="py-3 text-gray-400">
                    {ord.createdAt ? new Date(ord.createdAt).toLocaleDateString() : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
