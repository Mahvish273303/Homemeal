import Feedback from '../models/Feedback.js';

export const createFeedback = async (req, res) => {
  try {
    const { meal_id, rating, comment, vote_for_menu } = req.body;
    if (!meal_id || rating == null) {
      return res.status(400).json({ success: false, message: 'meal_id and rating required' });
    }
    const feedback = await Feedback.findOneAndUpdate(
      { user_id: req.user.id, meal_id },
      { rating, comment, vote_for_menu: !!vote_for_menu },
      { new: true, upsert: true }
    );
    const populated = await Feedback.findById(feedback._id)
      .populate('meal_id', 'meal_name')
      .populate('user_id', 'name');
    res.json({ success: true, feedback: populated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getFeedbackByMeal = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ meal_id: req.params.mealId })
      .populate('user_id', 'name')
      .sort({ createdAt: -1 });
    const avgRating =
      feedbacks.length > 0
        ? feedbacks.reduce((s, f) => s + f.rating, 0) / feedbacks.length
        : 0;
    res.json({ success: true, feedbacks, averageRating: Math.round(avgRating * 10) / 10 });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getMyFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ user_id: req.user.id })
      .populate('meal_id', 'meal_name')
      .sort({ createdAt: -1 });
    res.json({ success: true, feedbacks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
