import express from 'express';
import {
  getMeals,
  getMealById,
  createMeal,
  updateMeal,
  deleteMeal,
} from '../controllers/mealController.js';
import { protect, role } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getMeals);
router.get('/:id', getMealById);

router.use(protect);
router.post('/', role('homemaker', 'admin'), createMeal);
router.put('/:id', role('homemaker', 'admin'), updateMeal);
router.delete('/:id', role('homemaker', 'admin'), deleteMeal);

export default router;
