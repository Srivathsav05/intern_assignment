import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import Assignment from '../models/Assignment';

// Admin registration
export const registerAdmin = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new User({ name, email, password: hashedPassword, role: 'admin' });
        await admin.save();
        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
};

// Admin login
export const loginAdmin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const admin = await User.findOne({ email, role: 'admin' });
        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Admin logged in successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};

// View assignments
export const getAssignments = async (req: Request, res: Response) => {
    const adminId = req.body.adminId;  // Assuming the adminId is passed in the request body
    try {
        const assignments = await Assignment.find({ adminId }).populate('userId', 'name email');
        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch assignments' });
    }
};

// Accept or reject assignment
export const updateAssignmentStatus = async (req: Request, res: Response) => {
    const { id } = req.params;  // Extract assignment ID from URL
    const { status } = req.body; // 'accepted' or 'rejected' status from the request body

    if (!status || (status !== 'accepted' && status !== 'rejected')) {
        return res.status(400).json({ error: 'Invalid status, must be either "accepted" or "rejected"' });
    }

    try {
        // Find the assignment and update the status
        const assignment = await Assignment.findByIdAndUpdate(
            id,
            { status },
            { new: true } // Return the updated document
        );

        if (!assignment) {
            return res.status(404).json({ error: 'Assignment not found' });
        }

        res.status(200).json({ message: `Assignment ${status} successfully` });
    } catch (error) {
        console.error('Error updating assignment:', error);
        res.status(500).json({ error: 'Failed to update assignment' });
    }
};


export const acceptAssignment = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const assignment = await Assignment.findByIdAndUpdate(
            id,
            { status: 'accepted' },
            { new: true }
        );
        if (!assignment) {
            return res.status(404).json({ error: 'Assignment not found' });
        }
        res.status(200).json({ message: 'Assignment accepted successfully', assignment });
    } catch (error) {
        res.status(500).json({ error: 'Failed to accept assignment' });
    }
};

// Reject assignment
export const rejectAssignment = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const assignment = await Assignment.findByIdAndUpdate(
            id,
            { status: 'rejected' },
            { new: true }
        );
        if (!assignment) {
            return res.status(404).json({ error: 'Assignment not found' });
        }
        res.status(200).json({ message: 'Assignment rejected successfully', assignment });
    } catch (error) {
        res.status(500).json({ error: 'Failed to reject assignment' });
    }
};