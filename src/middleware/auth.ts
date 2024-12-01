import { Request, Response, NextFunction } from 'express';

// This middleware will check the role directly (no token-based authentication).
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.body.role;  // assuming the role is sent in the request body (can be adjusted)

    if (!userRole) {
        return res.status(401).json({ error: 'Access denied, no role provided' });
    }

    if (userRole === 'admin') {
        // Admin can proceed
        next();
    } else if (userRole === 'user') {
        // User can proceed
        next();
    } else {
        return res.status(403).json({ error: 'Access denied, invalid role' });
    }
};
