import Order from '../models/Order.js';
import Meal from '../models/Meal.js';

export const createOrder = async (req, res) => {
  try {
    const { meal_id, delivery_date, subscription_id } = req.body;
    if (!meal_id) return res.status(400).json({ success: false, message: 'meal_id required' });
    const order = await Order.create({
      user_id: req.user.id,
      meal_id,
      ...(delivery_date && { delivery_date: new Date(delivery_date) }),
      ...(subscription_id && { subscription_id }),
    });
    const populated = await Order.findById(order._id)
      .populate('meal_id')
      .populate('user_id', 'name email');
    res.status(201).json({ success: true, order: populated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.user.id })
      .populate('meal_id')
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getOrdersByHomemaker = async (req, res) => {
  try {
    const mealIds = await Meal.find({ homemaker_id: req.user.id }).distinct('_id');
    const orders = await Order.find({ meal_id: { $in: mealIds } })
      .populate('meal_id')
      .populate('user_id', 'name email')
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateOrderDeliveryStatus = async (req, res) => {
  try {
    const { delivery_status } = req.body;
    const order = await Order.findById(req.params.id).populate('meal_id');
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    if (order.meal_id.homemaker_id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not allowed to update this order' });
    }
    order.delivery_status = delivery_status || order.delivery_status;
    await order.save();
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
