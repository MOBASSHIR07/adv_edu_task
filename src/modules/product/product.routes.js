import express from 'express';
import { productController } from './product.controller.js';
import authMiddleware from '../../middleware/authMiddleware.js';

const router = express.Router();


router.get('/', productController.getAllProducts);

router.post('/', authMiddleware('admin'), productController.createProduct);

export default router;