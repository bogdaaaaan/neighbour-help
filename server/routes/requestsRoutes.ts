import express from 'express';

import {
	createRequest,
	getAllRequests,
	deleteRequest,
	getUserRequests,
	acceptRequest,
	completeRequest
} from '@/controllers/requestsController';

import { protect } from '@/middleware/authMiddleware';

const router = express.Router();


// Private routes (require authentication)
router.post('/create', protect, createRequest);

// Public routes
router.get('/', getAllRequests);
router.get('/user/:userId', getUserRequests);

// Helper routes
router.put('/:id/accept', protect, acceptRequest);
router.put('/:id/complete', protect, completeRequest);

// Private routes (require authentication)
router.delete('/:id', protect, deleteRequest);

export default router;