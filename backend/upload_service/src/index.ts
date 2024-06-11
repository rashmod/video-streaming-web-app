import express from 'express';
import { PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { readFileSync } from 'fs';
import path from 'path';
import { ok } from 'assert';
import 'dotenv/config';

import client from './config/s3.config';

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
ok(AWS_BUCKET_NAME, 'AWS_BUCKET_NAME is not in the .env file');

const app = express();

app.post('/upload', async (req, res) => {
	const fileContent = readFileSync(path.join(__dirname, 'test.png'));

	const params: PutObjectCommandInput = {
		Bucket: AWS_BUCKET_NAME,
		Key: 'my_test_file.png',
		Body: fileContent,
	};

	const command = new PutObjectCommand(params);
	await client.send(command);

	res.send('Hello World!');
});

app.listen(3001, () => {
	console.log('Server started on port 3001');
});
