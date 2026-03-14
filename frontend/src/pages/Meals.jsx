import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mealsApi, feedbackApi } from '../api';

export default function Meals() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    mealsApi
      .getAll({ availability: 'true', ...(search && { search }) })
      .then((res) => { if (!cancelled) setMeals(res.meals || []); })
      .catch((err) => { if (!cancelled) setError(err.message || 'Failed to load meals'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [search]);

  if (loading && !meals.length) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-[#dfd218]">Loading meals...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#dfd218] mb-6">Browse Meal Plans</h1>
        <input
          type="text"
          placeholder="Search meals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md mb-6 px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-[#dfd218]"
        />
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-900/50 text-red-200">{error}</div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals.map((meal) => (
            <MealCard key={meal._id} meal={meal} />
          ))}
        </div>
        {!loading && !error && meals.length === 0 && (
          <p className="text-gray-400 text-center py-12">No meals found. Check back later.</p>
        )}
      </div>
    </div>
  );
}

function MealCard({ meal }) {
  const [rating, setRating] = useState(null);
  useEffect(() => {
    feedbackApi.getByMeal(meal._id).then((r) => setRating(r.averageRating)).catch(() => {});
  }, [meal._id]);

  const maker = meal.homemaker_id;
  const makerName = typeof maker === 'object' ? maker?.name : 'Homemaker';

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden hover:border-[#dfd218]/50 transition">
      <div className="p-5">
        <h2 className="text-xl font-semibold text-white mb-1">{meal.meal_name}</h2>
        <p className="text-gray-400 text-sm mb-2">by {makerName}</p>
        {rating != null && (
          <p className="text-[#dfd218] text-sm mb-2">★ {rating} rating</p>
        )}
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{meal.description || 'No description'}</p>
        <p className="text-[#dfd218] font-bold text-lg mb-4">₹{meal.price}</p>
        <Link
          to={`/meals/${meal._id}`}
          className="inline-block px-4 py-2 rounded-lg bg-[#dfd218] text-black font-medium hover:bg-[#c4b417] transition"
        >
          View & Subscribe
        </Link>
      </div>
    </div>
  );
}
