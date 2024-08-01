import { Request, Response } from 'express';

import UploadService from '../services/upload.service';
import { BadRequestError } from '../errors';
import ServiceResponse from '../http/ServiceResponse';
import handleServiceResponse from '../http/handleServiceResponse';

export default async function uploadController(req: Request, res: Response) {
	if (!req.file) throw new BadRequestError('No file uploaded');

	const { videoId, partNumber }: { videoId: string; partNumber: number } =
		req.body;

	console.log('uploading...', partNumber);

	const filePath = req.file.path;

	const eTag = await UploadService.upload({
		partNumber,
		videoId,
		partPath: filePath,
	});

	const response = ServiceResponse.success({
		data: eTag,
		message: 'Successfully uploaded video part',
		statusCode: 200,
	});
	handleServiceResponse(res, response);
}
