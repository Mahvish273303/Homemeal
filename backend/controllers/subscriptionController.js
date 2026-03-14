import Subscription from '../models/Subscription.js';
import Order from '../models/Order.js';

export const createSubscription = async (req, res) => {
  try {
    const { meal_id, end_date } = req.body;
    if (!meal_id) return res.status(400).json({ success: false, message: 'meal_id required' });
    const existing = await Subscription.findOne({
      user_id: req.user.id,
      meal_id,
      status: 'active',
    });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Already subscribed to this meal' });
    }
    const sub = await Subscription.create({
      user_id: req.user.id,
      meal_id,
      ...(end_date && { end_date: new Date(end_date) }),
    });
    const populated = await Subscription.findById(sub._id)
      .populate('meal_id')
      .populate('user_id', 'name email');
    res.status(201).json({ success: true, subscription: populated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getMySubscriptions = async (req, res) => {
  try {
    const subs = await Subscription.find({ user_id: req.user.id })
      .populate('meal_id')
      .populate('user_id', 'name email')
      .sort({ createdAt: -1 });
    res.json({ success: true, subscriptions: subs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateSubscriptionStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const sub = await Subscription.findOne({
      _id: req.params.id,
      user_id: req.user.id,
    });
    if (!sub) return res.status(404).json({ success: false, message: 'Subscription not found' });
    sub.status = status || sub.status;
    await sub.save();
    res.json({ success: true, subscription: sub });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getSubscribersByMeal = async (req, res) => {
  try {
    const mealId = req.params.mealId;
    const subs = await Subscription.find({ meal_id: mealId, status: 'active' })
      .populate('user_id', 'name email')
      .populate('meal_id', 'meal_name');
    res.json({ success: true, subscriptions: subs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
