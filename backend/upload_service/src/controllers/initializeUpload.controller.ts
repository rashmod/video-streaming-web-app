import { Request, Response } from 'express';

import UploadService from '../services/upload.service';
import { BadRequestError } from '../errors';
import ServiceResponse from '../http/ServiceResponse';
import handleServiceResponse from '../http/handleServiceResponse';

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
	if (!req.file) throw new BadRequestError('No file uploaded');

	const {
		title,
		totalParts,
		duration,
		extension,
		userId,
	}: InitializeUploadRequest = req.body;

	console.log('initializing upload...');

	const thumbnailPath = req.file.path;

	const upload = await UploadService.initializeUpload({
		thumbnailPath,
		title,
		duration,
		extension,
		userId,
		totalParts,
	});

	const response = ServiceResponse.success({
		data: upload,
		message: 'Successfully initialized upload',
		statusCode: 200,
	});
	handleServiceResponse(res, response);
}
