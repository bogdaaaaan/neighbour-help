import express from 'express';

const app = express();

app.get('/', (req, res) => {
	res.send('Hello World');
	console.log('User is on "/"');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));