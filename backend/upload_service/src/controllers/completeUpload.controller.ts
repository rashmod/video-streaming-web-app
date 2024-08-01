import { Request, Response } from 'express';

import UploadService from '../services/upload.service';
import handleServiceResponse from '../http/handleServiceResponse';
import ServiceResponse from '../http/ServiceResponse';

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

	const response = ServiceResponse.success({
		data: videoId,
		message: 'Successfully uploaded video',
		statusCode: 200,
	});
	handleServiceResponse(res, response);
}
