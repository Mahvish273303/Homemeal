import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { subscriptionsApi, ordersApi } from '../api';

export default function SubscriptionDashboard() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([subscriptionsApi.getMy(), ordersApi.getMy()])
      .then(([subRes, ordRes]) => {
        setSubscriptions(subRes.subscriptions || []);
        setOrders(ordRes.orders || []);
      })
      .catch((err) => setError(err.message || 'Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <p className="text-[#dfd218]">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#dfd218] mb-6">My Subscriptions</h1>
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-900/50 text-red-200 text-sm">{error}</div>
      )}
      <div className="space-y-4 mb-8">
        {subscriptions.length === 0 ? (
          <p className="text-gray-400">You have no subscriptions. <Link to="/meals" className="text-[#dfd218] underline">Browse meals</Link>.</p>
        ) : (
          subscriptions.map((sub) => {
            const meal = sub.meal_id;
            const name = typeof meal === 'object' ? meal?.meal_name : 'Meal';
            return (
              <div
                key={sub._id}
                className="bg-gray-800 rounded-lg p-4 border border-gray-700 flex flex-wrap justify-between items-center gap-4"
              >
                <div>
                  <h3 className="font-semibold text-white">{name}</h3>
                  <p className="text-gray-400 text-sm">
                    Status: <span className="text-[#dfd218]">{sub.status}</span> · Started {new Date(sub.start_date).toLocaleDateString()}
                  </p>
                </div>
                <Link
                  to={`/meals/${meal?._id || sub.meal_id}`}
                  className="text-[#dfd218] hover:underline text-sm"
                >
                  View meal
                </Link>
              </div>
            );
          })
        )}
      </div>

      <h2 className="text-xl font-bold text-[#dfd218] mb-4">Delivery history</h2>
      <div className="overflow-x-auto">
        {orders.length === 0 ? (
          <p className="text-gray-400">No orders yet.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-gray-700">
                <th className="py-2 pr-4">Meal</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((ord) => (
                <tr key={ord._id} className="border-b border-gray-700">
                  <td className="py-3 pr-4 text-white">
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
        )}
      </div>
    </div>
  );
}
