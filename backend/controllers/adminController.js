import User from '../models/User.js';
import Meal from '../models/Meal.js';
import Order from '../models/Order.js';
import Subscription from '../models/Subscription.js';
import Feedback from '../models/Feedback.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { role, isActive, approvedAsHomemaker } = req.body;
    const update = {};
    if (role !== undefined) update.role = role;
    if (isActive !== undefined) update.isActive = isActive;
    if (approvedAsHomemaker !== undefined) update.approvedAsHomemaker = approvedAsHomemaker;
    const user = await User.findByIdAndUpdate(req.params.id, update, { new: true }).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const approveHomemaker = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: 'homemaker', approvedAsHomemaker: true },
      { new: true }
    ).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalMeals = await Meal.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalSubscriptions = await Subscription.countDocuments({ status: 'active' });
    const homemakers = await User.countDocuments({ role: 'homemaker', approvedAsHomemaker: true });
    const ordersByStatus = await Order.aggregate([
      { $group: { _id: '$delivery_status', count: { $sum: 1 } } },
    ]);
    const recentOrders = await Order.find()
      .populate('meal_id', 'meal_name price')
      .populate('user_id', 'name email')
      .sort({ createdAt: -1 })
      .limit(20);
    res.json({
      success: true,
      analytics: {
        totalUsers,
        totalMeals,
        totalOrders,
        totalSubscriptions,
        homemakers,
        ordersByStatus,
        recentOrders,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('meal_id')
      .populate('user_id', 'name email')
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
