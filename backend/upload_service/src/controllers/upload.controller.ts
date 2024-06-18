import { Request, Response } from 'express';
import fs from 'fs';
import asyncFs from 'fs/promises';
import path from 'path';
import { PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';

import envConfig from '../config/env.config';
import client from '../config/s3.config';
import KafkaProducer from '../kafka/Kafka';

const kafkaProducer = new KafkaProducer(envConfig.clientId);

export default async function uploadController(req: Request, res: Response) {
	if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

	const filePath = path.join(
		__dirname,
		'..',
		'..',
		'uploads',
		req.file.filename
	);
	const fileContent = fs.readFileSync(filePath);

	const params: PutObjectCommandInput = {
		Bucket: envConfig.AWS_BUCKET_NAME,
		Key: req.file.filename,
		Body: fileContent,
	};

	const command = new PutObjectCommand(params);
	await client.send(command);
	await asyncFs.access(filePath);
	await asyncFs.unlink(filePath);

	await kafkaProducer.connect();
	await kafkaProducer.produce('transcode', {
		bucket: envConfig.AWS_BUCKET_NAME,
		filename: req.file.filename,
	});
	await kafkaProducer.disconnect();

	res.status(200).json({ message: 'Hello World!' });
}
