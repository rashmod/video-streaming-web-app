import { Request, Response } from 'express';
import fs from 'fs';
import asyncFs from 'fs/promises';
import { UploadPartCommand } from '@aws-sdk/client-s3';

import envConfig from '../config/env.config';
import s3Client from '../config/s3.config';

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

	const result = await s3Client.send(command);
	await asyncFs.access(filePath);
	await asyncFs.unlink(filePath);

	res.status(200).json({
		message: 'Video successfully uploaded',
		eTag: result.ETag,
	});
}
