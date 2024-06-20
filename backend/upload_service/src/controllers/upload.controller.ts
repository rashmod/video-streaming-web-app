import { Request, Response } from 'express';
import fs from 'fs';
import asyncFs from 'fs/promises';
import path from 'path';
import { UploadPartCommand } from '@aws-sdk/client-s3';

import envConfig from '../config/env.config';
import client from '../config/s3.config';
import KafkaProducer from '../kafka/Kafka';

const kafkaProducer = new KafkaProducer(envConfig.clientId);

export default async function uploadController(req: Request, res: Response) {
	if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

	const {
		videoId,
		uploadId,
		partNumber,
	}: { videoId: string; uploadId: string; partNumber: number } = req.body;

	const filePath = req.file.path;
	const fileContent = fs.readFileSync(filePath);

	const command = new UploadPartCommand({
		Bucket: envConfig.AWS_BUCKET_NAME,
		Key: videoId,
		UploadId: uploadId,
		PartNumber: partNumber,
		Body: fileContent,
	});

	const result = await client.send(command);
	await asyncFs.access(filePath);
	await asyncFs.unlink(filePath);

	// await kafkaProducer.connect();
	// await kafkaProducer.produce('transcode', {
	// 	bucket: envConfig.AWS_BUCKET_NAME,
	// 	filename: req.file.filename,
	// });
	// await kafkaProducer.disconnect();

	res.status(200).json({
		message: 'Video successfully uploaded',
		eTag: result.ETag,
	});
}
