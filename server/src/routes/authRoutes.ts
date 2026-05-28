import express from 'express';

import { registerUser, loginUser, getUserProfile } from '../controllers/authController.js';

import { protect } from '../middleware/authMiddleware.js';
import { upload, uploadToCloudinary } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Private routes (require authentication)
router.get('/profile', protect, getUserProfile);

// Middleware


router.post('/upload-image', upload.single('image'), async (req, res) => {
	try {
		if (!req.file) {
			res.status(400).json({ message: 'No file uploaded', });
			return;
		}

		const imageUrl = await uploadToCloudinary(req.file.buffer);
		res.status(200).json({ imageUrl });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Image upload failed' });
	}
});

export default router;