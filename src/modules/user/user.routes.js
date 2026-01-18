import express from 'express';
import { userController } from './user.controller.js';
import authMiddleware from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get(
    '/profile', 
    authMiddleware('user', 'admin'), 
    userController.getMyProfile
);

export default router;