import express from 'express';

const app = express();

app.post('/upload', (req, res) => {
	res.send('Hello World!');
});

app.listen(3001, () => {
	console.log('Server started on port 3001');
});
