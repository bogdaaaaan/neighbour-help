import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from '@/models/User';
import { UserDocument } from '@/models/User';

import { Types } from 'mongoose';

// Generate JWT token
const generateToken = (userId: Types.ObjectId) => {
	const jwtSecret = process.env.JWT_SECRET as string;
	if (!jwtSecret) {
		throw new Error('JWT_SECRET is not defined in environment variables');
	}
	return jwt.sign({ id: userId }, jwtSecret, { expiresIn: '7d' });
};


// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
import { Request, Response } from 'express';

const registerUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const { name, email, password, profileImageUrl } = req.body;

		// Check if user already exists
		const existingUser: UserDocument | null = await User.findOne({ email });
		if (existingUser) {
			res.status(400).json({ message: 'User already exists' });
			return;
		}

		// Hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Create new user
		const user = await User.create({
			name,
			email,
			password: hashedPassword,
			profileImageUrl,
		});

		// Return user data and with JWT token
		res.status(201).json({
			id: user._id,
			name: user.name,
			email: user.email,
			profileImageUrl: user.profileImageUrl,
			token: generateToken(user._id),
		});
	} catch (error) {
		console.error('Error registering a user: ', error);
	}
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const { email, password } = req.body;

		// Check if user exists
		const user: UserDocument | null = await User.findOne({ email });
		if (!user) {
			res.status(401).json({ message: 'Invalid credentials' });
			return;
		}

		// Compare password
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			res.status(401).json({ message: 'Invalid credentials' });
			return;
		}

		// Return user data and JWT token
		res.json({
			id: user._id,
			name: user.name,
			email: user.email,
			profileImageUrl: user.profileImageUrl,
			token: generateToken(user._id),
		});
	} catch (error) {
		console.error('Error registering a user: ', error);
	}
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private (Requires JWT)
const getUserProfile = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.user || !req.user._id) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		const user: UserDocument = await User.findById(req.user._id).select('-password');
		if (!user) {
			res.status(404).json({ message: 'User not found' });
			return;
		}

		res.json({
			id: user._id,
			name: user.name,
			email: user.email,
			profileImageUrl: user.profileImageUrl,
			token: generateToken(user._id),
		});
	} catch (error) {
		console.error('Error registering a user: ', error);
	}
};

export { registerUser, loginUser, getUserProfile };