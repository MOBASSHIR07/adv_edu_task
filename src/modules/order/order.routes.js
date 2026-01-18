import express from 'express';
import { orderController } from './order.controller.js';
import authMiddleware from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware('user', 'admin'), orderController.createOrder);
router.get('/my-orders', authMiddleware('user', 'admin'), orderController.getMyOrders);

export default router;