import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { mealsApi, ordersApi } from '../api';

export default function HomemakerDashboard() {
  const { user } = useAuth();
  const [meals, setMeals] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('meals');
  const [editingMeal, setEditingMeal] = useState(null);
  const [form, setForm] = useState({ meal_name: '', description: '', price: '', availability: true });

  useEffect(() => {
    Promise.all([mealsApi.getAll({ homemaker_id: user?.id }), ordersApi.getHomemaker()])
      .then(([mealRes, ordRes]) => {
        setMeals(mealRes.meals || []);
        setOrders(ordRes.orders || []);
      })
      .catch((err) => setError(err.message || 'Failed to load'))
      .finally(() => setLoading(false));
  }, [user?.id]);

  const loadMeals = () => {
    mealsApi.getAll({ homemaker_id: user?.id }).then((r) => setMeals(r.meals || []));
  };

  const handleSaveMeal = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editingMeal) {
        await mealsApi.update(editingMeal._id, {
          meal_name: form.meal_name,
          description: form.description,
          price: Number(form.price),
          availability: form.availability,
        });
        setEditingMeal(null);
      } else {
        await mealsApi.create({
          meal_name: form.meal_name,
          description: form.description,
          price: Number(form.price),
          availability: form.availability,
        });
      }
      setForm({ meal_name: '', description: '', price: '', availability: true });
      loadMeals();
    } catch (err) {
      setError(err.message || 'Failed to save');
    }
  };

  const handleUpdateOrderStatus = async (orderId, delivery_status) => {
    try {
      await ordersApi.updateStatus(orderId, delivery_status);
      ordersApi.getHomemaker().then((r) => setOrders(r.orders || []));
    } catch (err) {
      setError(err.message || 'Failed to update');
    }
  };

  if (!user?.approvedAsHomemaker && user?.role === 'homemaker') {
    return (
      <div className="p-8 text-center">
        <p className="text-[#dfd218] text-lg">Your homemaker account is pending approval. You can log in but cannot add meals yet.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <p className="text-[#dfd218]">Loading...</p>
      </div>
    );
  }

  const tabs = [
    { id: 'meals', label: 'My meals' },
    { id: 'orders', label: 'Orders' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#dfd218] mb-6">Homemaker Dashboard</h1>
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

      {activeTab === 'meals' && (
        <>
          <form onSubmit={handleSaveMeal} className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-3">
              {editingMeal ? 'Edit meal' : 'Add new meal'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Meal name"
                value={form.meal_name}
                onChange={(e) => setForm((f) => ({ ...f, meal_name: e.target.value }))}
                required
                className="px-3 py-2 rounded bg-gray-900 border border-gray-600 text-white"
              />
              <input
                type="number"
                placeholder="Price (₹)"
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                required
                min={0}
                className="px-3 py-2 rounded bg-gray-900 border border-gray-600 text-white"
              />
            </div>
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="mt-3 w-full px-3 py-2 rounded bg-gray-900 border border-gray-600 text-white"
              rows={2}
            />
            <label className="mt-3 flex items-center gap-2 text-gray-300">
              <input
                type="checkbox"
                checked={form.availability}
                onChange={(e) => setForm((f) => ({ ...f, availability: e.target.checked }))}
              />
              Available
            </label>
            <div className="mt-3 flex gap-2">
              <button type="submit" className="px-4 py-2 rounded bg-[#dfd218] text-black font-medium">
                {editingMeal ? 'Update' : 'Add meal'}
              </button>
              {editingMeal && (
                <button
                  type="button"
                  onClick={() => { setEditingMeal(null); setForm({ meal_name: '', description: '', price: '', availability: true }); }}
                  className="px-4 py-2 rounded bg-gray-600 text-white"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
          <ul className="space-y-3">
            {meals.map((m) => (
              <li
                key={m._id}
                className="bg-gray-800 rounded-lg p-4 border border-gray-700 flex flex-wrap justify-between items-center"
              >
                <div>
                  <h4 className="font-semibold text-white">{m.meal_name}</h4>
                  <p className="text-gray-400 text-sm">₹{m.price} · {m.availability ? 'Available' : 'Unavailable'}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingMeal(m);
                      setForm({
                        meal_name: m.meal_name,
                        description: m.description || '',
                        price: m.price,
                        availability: m.availability,
                      });
                    }}
                    className="text-[#dfd218] hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Delete this meal?')) {
                        mealsApi.delete(m._id).then(loadMeals).catch((err) => setError(err.message));
                      }
                    }}
                    className="text-red-400 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {activeTab === 'orders' && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-gray-700">
                <th className="py-2 pr-4">Customer</th>
                <th className="py-2 pr-4">Meal</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2">Actions</th>
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
                  <td className="py-3">
                    <select
                      value={ord.delivery_status}
                      onChange={(e) => handleUpdateOrderStatus(ord._id, e.target.value)}
                      className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white text-xs"
                    >
                      <option value="pending">Pending</option>
                      <option value="preparing">Preparing</option>
                      <option value="out_for_delivery">Out for delivery</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && <p className="text-gray-400 py-4">No orders yet.</p>}
        </div>
      )}
    </div>
  );
}
