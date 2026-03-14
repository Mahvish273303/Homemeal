import express from 'express';
import {
  createOrder,
  getMyOrders,
  getOrdersByHomemaker,
  updateOrderDeliveryStatus,
} from '../controllers/orderController.js';
import { protect, role } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.post('/', createOrder);
router.get('/my', getMyOrders);
router.get('/homemaker', role('homemaker', 'admin'), getOrdersByHomemaker);
router.put('/:id/status', role('homemaker', 'admin'), updateOrderDeliveryStatus);

export default router;
