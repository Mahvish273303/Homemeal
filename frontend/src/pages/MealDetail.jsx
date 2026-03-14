import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mealsApi, subscriptionsApi, feedbackApi } from '../api';

export default function MealDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [meal, setMeal] = useState(null);
  const [feedback, setFeedback] = useState({ feedbacks: [], averageRating: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [voteForMenu, setVoteForMenu] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);

  useEffect(() => {
    if (!id) return;
    Promise.all([
      mealsApi.getById(id).then((r) => r.meal),
      feedbackApi.getByMeal(id),
    ])
      .then(([mealData, feedbackData]) => {
        setMeal(mealData);
        setFeedback(feedbackData);
      })
      .catch((err) => setError(err.message || 'Failed to load'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubscribe = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.role !== 'student') {
      setError('Only students can subscribe to meal plans.');
      return;
    }
    setSubscribing(true);
    setError('');
    try {
      await subscriptionsApi.create({ meal_id: id });
      navigate('/dashboard/subscriptions');
    } catch (err) {
      setError(err.message || 'Subscribe failed');
    } finally {
      setSubscribing(false);
    }
  };

  const handleFeedback = async (e) => {
    e.preventDefault();
    if (!user || !rating) return;
    setError('');
    try {
      await feedbackApi.create({ meal_id: id, rating, comment, vote_for_menu: voteForMenu });
      setFeedbackSent(true);
      const res = await feedbackApi.getByMeal(id);
      setFeedback(res);
    } catch (err) {
      setError(err.message || 'Failed to submit feedback');
    }
  };

  if (loading || !meal) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-[#dfd218]">Loading...</p>
      </div>
    );
  }

  const maker = meal.homemaker_id;
  const makerName = typeof maker === 'object' ? maker?.name : 'Homemaker';

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 md:px-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-[#dfd218] mb-6"
        >
          ← Back
        </button>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-6 mb-6">
          <h1 className="text-3xl font-bold text-[#dfd218] mb-2">{meal.meal_name}</h1>
          <p className="text-gray-400 mb-4">by {makerName}</p>
          {feedback.averageRating > 0 && (
            <p className="text-[#dfd218] mb-4">★ {feedback.averageRating} average rating</p>
          )}
          <p className="text-gray-300 mb-4">{meal.description || 'No description.'}</p>
          <p className="text-[#dfd218] font-bold text-2xl mb-6">₹{meal.price}</p>
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-900/50 text-red-200 text-sm">{error}</div>
          )}
          {user?.role === 'student' && (
            <button
              onClick={handleSubscribe}
              disabled={subscribing}
              className="px-6 py-3 rounded-lg bg-[#dfd218] text-black font-semibold hover:bg-[#c4b417] disabled:opacity-50"
            >
              {subscribing ? 'Subscribing...' : 'Subscribe to this plan'}
            </button>
          )}
        </div>

        {/* Feedback section */}
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-[#dfd218] mb-4">Reviews</h2>
          {feedback.feedbacks?.length > 0 ? (
            <ul className="space-y-3 mb-6">
              {feedback.feedbacks.map((f) => (
                <li key={f._id} className="text-gray-300 text-sm border-b border-gray-700 pb-2">
                  <span className="text-[#dfd218]">★ {f.rating}</span> — {f.comment || '(no comment)'} — {typeof f.user_id === 'object' ? f.user_id?.name : 'User'}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mb-6">No reviews yet.</p>
          )}
          {user && (
            <form onSubmit={handleFeedback} className="space-y-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Your rating (1-5)</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-600 text-white"
                >
                  <option value={0}>Select</option>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n} ★</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-600 text-white"
                  rows={2}
                />
              </div>
              <label className="flex items-center gap-2 text-gray-400">
                <input
                  type="checkbox"
                  checked={voteForMenu}
                  onChange={(e) => setVoteForMenu(e.target.checked)}
                />
                Vote for this on next week's menu
              </label>
              <button
                type="submit"
                disabled={!rating || feedbackSent}
                className="px-4 py-2 rounded bg-[#dfd218] text-black font-medium disabled:opacity-50"
              >
                {feedbackSent ? 'Submitted' : 'Submit feedback'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
