/* eslint-disable no-unused-vars */
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import User, { UserDocument } from '../models/User.js';

declare global {
    namespace Express {
        interface Request {
            user?: UserDocument | null;
        }
    }
}

interface JwtPayload {
    id: string;
}

const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			res.status(401).json({ message: 'Not authorized, no token' });
			return;
		}

		const token = authHeader.split(' ')[1];

		const secret = process.env.JWT_SECRET;
		if (!secret) {
			res.status(500).json({ message: 'JWT secret is not configured' });
			return;
		}

		const decoded = jwt.verify(token, secret) as JwtPayload;

		if (!decoded || !decoded.id) {
			res.status(401).json({ message: 'Token is invalid' });
			return;
		}

		const user = await User.findById(decoded.id).select('-password');
		if (!user) {
			res.status(401).json({ message: 'User not found' });
			return;
		}

		req.user = user;
		next();
	} catch (error) {
		console.error('Error registering a user: ', error);
	}
};

export { protect };