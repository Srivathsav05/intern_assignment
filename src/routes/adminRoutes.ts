import express from 'express';
import { registerAdmin, loginAdmin, getAssignments, updateAssignmentStatus } from '../controllers/adminController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Admin routes
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/assignments', authenticate, getAssignments);
router.post('/assignments/:id/accept', authenticate, updateAssignmentStatus);  // For accepting
router.post('/assignments/:id/reject', authenticate, updateAssignmentStatus);  // For rejecting

export default router;
