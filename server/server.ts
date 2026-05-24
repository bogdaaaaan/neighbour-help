import '@/configs/env';

import express from 'express';
import cors from 'cors';

import connectDB from '@/configs/db';

import authRoutes from '@/routes/authRoutes';
import requestsRoutes from '@/routes/requestsRoutes';

const app = express();

app.use(
	cors({
		origin: '*',
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization']
	})
);

connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/requests/', requestsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));