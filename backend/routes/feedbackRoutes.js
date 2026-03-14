import express from 'express';
import {
  createFeedback,
  getFeedbackByMeal,
  getMyFeedback,
} from '../controllers/feedbackController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/meal/:mealId', getFeedbackByMeal);

router.use(protect);
router.post('/', createFeedback);
router.get('/my', getMyFeedback);

export default router;
