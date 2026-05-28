import './configs/env.js';

import express from 'express';
import cors from 'cors';

import connectDB from './configs/db.js';

import authRoutes from './routes/authRoutes.js';
import requestsRoutes from './routes/requestsRoutes.js';


const app = express();

const allowedOrigins = [
	'http://localhost:5173',
	'http://localhost:4173',
	'https://neighbour-help.vercel.app',
];

app.use(
	cors({
		origin: allowedOrigins,
  		credentials: true,
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