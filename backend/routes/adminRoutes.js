import express from 'express';
import {
  getAllUsers,
  updateUser,
  approveHomemaker,
  getAnalytics,
  getAllOrders,
} from '../controllers/adminController.js';
import { protect, role } from '../middleware/auth.js';

const router = express.Router();

router.use(protect, role('admin'));

router.get('/users', getAllUsers);
router.put('/users/:id', updateUser);
router.post('/users/:id/approve-homemaker', approveHomemaker);
router.get('/analytics', getAnalytics);
router.get('/orders', getAllOrders);

export default router;
