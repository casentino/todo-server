import express from 'express';
import { authController } from '../controller';
const router = express.Router();

router.post('/signin', authController.authSignIn);
router.post('/register', authController.authRegister);
router.post('/logout', authController.logout);

export default router;
