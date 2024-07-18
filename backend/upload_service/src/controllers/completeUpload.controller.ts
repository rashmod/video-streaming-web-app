import { Request, Response } from 'express';

import UploadService from '../services/upload.service';

export default async function completeUploadController(
	req: Request,
	res: Response
) {
	console.log('upload complete...');

	const {
		videoId,
		parts,
		resolution,
	}: {
		videoId: string;
		parts: { ETag: string; PartNumber: number }[];
		resolution: { height: number; width: number };
	} = req.body;

	await UploadService.completeUpload({ parts, videoId, resolution });

	res.status(200).json({ success: true, data: videoId });
}
