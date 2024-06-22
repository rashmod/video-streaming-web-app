import { CompleteMultipartUploadCommand } from '@aws-sdk/client-s3';
import { Request, Response } from 'express';
import envConfig from '../config/env.config';
import s3Client from '../config/s3.config';

export default async function completeUploadController(
	req: Request,
	res: Response
) {
	const {
		uploadId,
		videoId,
		parts,
	}: {
		uploadId: string;
		videoId: string;
		parts: { ETag: string; PartNumber: number }[];
	} = req.body;

	const command = new CompleteMultipartUploadCommand({
		Bucket: envConfig.AWS_BUCKET_NAME,
		Key: videoId,
		UploadId: uploadId,
		MultipartUpload: {
			Parts: parts,
		},
	});

	await s3Client.send(command);

	res.status(200).json({ message: 'Video successfully uploaded' });
}