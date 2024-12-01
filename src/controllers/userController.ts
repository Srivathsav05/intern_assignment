import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import Assignment from '../models/Assignment';

// User registration
export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, role: 'user' });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
};

// User login
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, role: 'user' });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'User logged in successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};

// Upload assignment
export const uploadAssignment = async (req: Request, res: Response) => {
    const { task, adminId } = req.body;
    const userId = req.body.userId;  // assuming userId is sent in the request body
    try {
        const assignment = new Assignment({ task, adminId, userId });
        await assignment.save();
        res.status(201).json({ message: 'Assignment uploaded successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Assignment upload failed' });
    }
};

// Get all admins
export const getAdmins = async (_req: Request, res: Response) => {
    try {
        const admins = await User.find({ role: 'admin' }).select('name email');
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch admins' });
    }
};
