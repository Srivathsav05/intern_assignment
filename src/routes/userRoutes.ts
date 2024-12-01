import express from 'express';
import { registerUser, loginUser, uploadAssignment, getAdmins } from '../controllers/userController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// User routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/upload', authenticate, uploadAssignment);
router.get('/admins', authenticate, getAdmins);

export default router;
