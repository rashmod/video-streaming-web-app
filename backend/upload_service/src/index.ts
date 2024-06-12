import express from 'express';
import { PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import fs from 'fs';
import asyncFs from 'fs/promises';
import path from 'path';
import cors from 'cors';
import multer from 'multer';

import client from './config/s3.config';
import env from './config/env.config';

const app = express();

const upload = multer({ dest: './uploads/' });

app.use(cors());
app.use(express.json());

app.post('/upload', upload.single('video'), async (req, res) => {
	if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

	const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);
	const fileContent = fs.readFileSync(filePath);

	const params: PutObjectCommandInput = {
		Bucket: env.AWS_BUCKET_NAME,
		Key: req.file.filename,
		Body: fileContent,
	};

	const command = new PutObjectCommand(params);
	await client.send(command);
	await asyncFs.access(filePath);
	await asyncFs.unlink(filePath);

	res.status(200).json({ message: 'Hello World!' });
});

app.listen(env.PORT, () => {
	console.log(
		`Server running in ${env.NODE_ENV} mode on host ${env.HOST} on port ${env.PORT}`
	);
});
