import '@/configs/env';
import path from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import cors from 'cors';

import connectDB from '@/configs/db';

import authRoutes from '@/routes/authRoutes';
import requestsRoutes from '@/routes/requestsRoutes';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));