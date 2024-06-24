import { Request, Response } from 'express';
import { CreateMultipartUploadCommand } from '@aws-sdk/client-s3';

import randomName from '../utilities/randomName';
import s3Client from '../config/s3.config';
import envConfig from '../config/env.config';

export default async function initializeUploadController(
	req: Request,
	res: Response
) {
	const { extension }: { extension: string } = req.body;
	// todo change this to videoName
	// todo create a video entry in db and get videoId
	const videoId = randomName() + '.' + extension;

	const command = new CreateMultipartUploadCommand({
		Bucket: envConfig.AWS_BUCKET_NAME,
		Key: videoId,
	});

	const multipartUpload = await s3Client.send(command);

	const uploadId = multipartUpload.UploadId;

	res.status(200).json({ uploadId, videoId });
}
