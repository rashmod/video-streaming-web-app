import express from 'express';
import { PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { readFileSync } from 'fs';
import path from 'path';

import client from './config/s3.config';
import env from './config/env.config';

const app = express();

app.post('/upload', async (req, res) => {
	const fileContent = readFileSync(path.join(__dirname, 'test.png'));

	const params: PutObjectCommandInput = {
		Bucket: env.AWS_BUCKET_NAME,
		Key: 'my_test_file.png',
		Body: fileContent,
	};

	const command = new PutObjectCommand(params);
	await client.send(command);

	res.send('Hello World!');
});

app.listen(env.PORT, () => {
	console.log(
		`Server running in ${env.NODE_ENV} mode on host ${env.HOST} on port ${env.PORT}`
	);
});
