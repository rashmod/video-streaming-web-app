import { Request, Response } from 'express';

import UploadService from '../services/upload.service';

type InitializeUploadRequest = {
	title: string;
	totalParts: number;
	duration: number;
	extension: string;
	userId: string;
};

export default async function initializeUploadController(
	req: Request,
	res: Response
) {
	if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

	const {
		title,
		totalParts,
		duration,
		extension,
		userId,
	}: InitializeUploadRequest = req.body;

	const thumbnailPath = req.file.path;

	const upload = await UploadService.initializeUpload({
		thumbnailPath,
		title,
		duration,
		extension,
		userId,
		totalParts,
	});

	res.status(200).json({ success: true, data: upload });
}
