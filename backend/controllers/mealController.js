import Meal from '../models/Meal.js';

export const getMeals = async (req, res) => {
  try {
    const { homemaker_id, availability, search } = req.query;
    const filter = {};
    if (homemaker_id) filter.homemaker_id = homemaker_id;
    if (availability !== undefined) filter.availability = availability === 'true';
    if (search) {
      filter.$or = [
        { meal_name: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
      ];
    }
    const meals = await Meal.find(filter).populate('homemaker_id', 'name email').sort({ createdAt: -1 });
    res.json({ success: true, meals });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getMealById = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id).populate('homemaker_id', 'name email');
    if (!meal) return res.status(404).json({ success: false, message: 'Meal not found' });
    res.json({ success: true, meal });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createMeal = async (req, res) => {
  try {
    if (req.user.role === 'homemaker' && !req.user.approvedAsHomemaker) {
      return res.status(403).json({ success: false, message: 'Your homemaker account is pending approval' });
    }
    const meal = await Meal.create({ ...req.body, homemaker_id: req.user.id });
    res.status(201).json({ success: true, meal });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateMeal = async (req, res) => {
  try {
    const meal = await Meal.findOneAndUpdate(
      { _id: req.params.id, homemaker_id: req.user.id },
      req.body,
      { new: true }
    );
    if (!meal) return res.status(404).json({ success: false, message: 'Meal not found' });
    res.json({ success: true, meal });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteMeal = async (req, res) => {
  try {
    const meal = await Meal.findOneAndDelete({ _id: req.params.id, homemaker_id: req.user.id });
    if (!meal) return res.status(404).json({ success: false, message: 'Meal not found' });
    res.json({ success: true, message: 'Meal deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
