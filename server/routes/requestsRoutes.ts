import express from 'express';

import { createRequest, getAllRequests, getRequestById, updateRequest, deleteRequest, getUserRequests, getMyRequests } from '@/controllers/requestsController';

import { protect } from '@/middleware/authMiddleware';

const router = express.Router();


// Private routes (require authentication)
router.post('/create', protect, createRequest);
router.get('/my-requests', protect, getMyRequests);

// Public routes
router.get('/', getAllRequests);
router.get('/user/:userId', getUserRequests);
router.get('/:id', getRequestById);


// Private routes (require authentication)
router.put('/:id', protect, updateRequest);
router.delete('/:id', protect, deleteRequest);

export default router;