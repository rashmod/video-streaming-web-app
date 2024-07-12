import { Request, Response } from 'express';

import UploadService from '../services/upload.service';

export default async function uploadController(req: Request, res: Response) {
	if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

	const { videoId, partNumber }: { videoId: string; partNumber: number } =
		req.body;

	const filePath = req.file.path;

	const eTag = await UploadService.upload({
		partNumber,
		videoId,
		partPath: filePath,
	});

	res.status(200).json({
		success: true,
		data: eTag,
	});
}
