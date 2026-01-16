import { Router } from "express";
import { authController } from "./auth.controller.js";

const router = Router();

router.post('/signup', authController.registerUser);
router.post('/signin', authController.loginUser)

export default router;