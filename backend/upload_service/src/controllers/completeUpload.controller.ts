import { CompleteMultipartUploadCommand } from '@aws-sdk/client-s3';
import { Request, Response } from 'express';

import envConfig from '../config/env.config';
import s3Client from '../config/s3.config';
import KafkaProducer from '../kafka/Kafka';

const kafkaProducer = new KafkaProducer(envConfig.clientId);

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

	await kafkaProducer.connect();
	await kafkaProducer.produce('transcode', {
		bucket: envConfig.AWS_BUCKET_NAME,
		videoId,
	});
	await kafkaProducer.disconnect();

	res.status(200).json({ message: 'Video successfully uploaded' });
}
