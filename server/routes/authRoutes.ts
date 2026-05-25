import express from 'express';

import { registerUser, loginUser, getUserProfile } from '@/controllers/authController';

import { protect } from '@/middleware/authMiddleware';
import upload from '@/middleware/uploadMiddleware';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Private routes (require authentication)
router.get('/profile', protect, getUserProfile);

// Middleware
router.post('/upload-image', upload.single('image'), (req, res) => {
	if (!req.file) {
		res.status(400).json({ message: 'No file uploaded' });
		return;
	}

	const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
	res.status(200).json({ imageUrl });
});

export default router;