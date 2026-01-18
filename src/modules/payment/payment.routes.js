import express from 'express';
import { paymentController } from './payment.controller.js';

const router = express.Router();

router.post('/webhook', paymentController.handleWebhook);

export default router;