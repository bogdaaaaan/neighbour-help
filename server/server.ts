import express from 'express';
import '@/configs/env';

import connectDB from '@/configs/db';

import { TestModel } from '@/models/Test';

const app = express();

connectDB();

app.get('/', (req, res) => {
	res.send('Hello World');
	console.log('User is on "/"');
});

app.get('/test', async (req, res) => {
	try {
		const data = await TestModel.find({});
		console.log(data);
		res.json(data);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to fetch data' });
	}
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));