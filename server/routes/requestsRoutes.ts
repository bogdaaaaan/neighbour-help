import express from 'express';

import { createRequest, getAllRequests, getRequestById, updateRequest, deleteRequest, getUserRequests, getMyRequests, acceptRequest, cancelRequest, completeRequest } from '@/controllers/requestsController';

import { protect } from '@/middleware/authMiddleware';

const router = express.Router();


// Private routes (require authentication)
router.post('/create', protect, createRequest);
router.get('/my-requests', protect, getMyRequests);

// Public routes
router.get('/', getAllRequests);
router.get('/user/:userId', getUserRequests);
router.get('/:id', getRequestById);

// Helper routes
router.put('/:id/accept', protect, acceptRequest);
router.put('/:id/cancel', protect, cancelRequest);
router.put('/:id/complete', protect, completeRequest);

// Private routes (require authentication)
router.put('/:id', protect, updateRequest);
router.delete('/:id', protect, deleteRequest);

export default router;