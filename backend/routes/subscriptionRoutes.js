import express from 'express';
import {
  createSubscription,
  getMySubscriptions,
  updateSubscriptionStatus,
  getSubscribersByMeal,
} from '../controllers/subscriptionController.js';
import { protect, role } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.post('/', role('student'), createSubscription);
router.get('/my', getMySubscriptions);
router.put('/:id/status', updateSubscriptionStatus);
router.get('/meal/:mealId/subscribers', role('homemaker', 'admin'), getSubscribersByMeal);

export default router;
