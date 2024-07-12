import { Request, Response } from 'express';
import fs from 'fs';
import asyncFs from 'fs/promises';

import S3Service from '../services/s3.service';

export default async function uploadController(req: Request, res: Response) {
	if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

	const {
		videoId,
		uploadId,
		partNumber,
	}: { videoId: string; uploadId: string; partNumber: number } = req.body;

	const filePath = req.file.path;
	const fileContent = fs.readFileSync(filePath);

	const eTag = await S3Service.uploadPart({
		fileKey: videoId,
		part: fileContent,
		uploadId,
		partNumber,
	});

	await asyncFs.access(filePath);
	await asyncFs.unlink(filePath);

	res.status(200).json({
		message: 'Video successfully uploaded',
		eTag,
	});
}
