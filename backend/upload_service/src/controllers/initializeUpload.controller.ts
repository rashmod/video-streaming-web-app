import { Request, Response } from 'express';

import randomName from '../utilities/randomName';
import S3Service from '../services/s3.service';

export default async function initializeUploadController(
	req: Request,
	res: Response
) {
	const { extension }: { extension: string } = req.body;
	// todo change this to videoName
	// todo create a video entry in db and get videoId
	const videoId = randomName() + '.' + extension;

	const uploadId = await S3Service.initializeMultipartUpload(videoId);

	res.status(200).json({ uploadId, videoId });
}
